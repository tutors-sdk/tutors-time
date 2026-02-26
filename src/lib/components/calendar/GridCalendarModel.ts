import type { ColDef } from "ag-grid-community";
import type { CalendarModel, CalendarRow, CalendarMedianRow } from "$lib/tutors-time-service/types";
import {
  formatDateShort,
  formatTimeMinutesOnly,
  cellColorForMinutes,
  type ViewMode
} from "$lib/tutors-time-service/utils";

/** Grid-ready calendar table with ColDef-typed columns for ag-grid. */
export type GridCalendarTable = {
  rows: CalendarRow[];
  columnDefs: ColDef<CalendarRow>[];
};

/** Grid-ready median table with ColDef-typed columns for ag-grid. */
export type GridCalendarMedianTable = {
  row: CalendarMedianRow | null;
  columnDefs: ColDef<CalendarMedianRow>[];
};

/**
 * Calendar model with ColDef-typed columnDefs for use with ag-grid.
 * Wraps CalendarModel and builds column definitions at the grid boundary.
 */
export class GridCalendarModel {
  readonly day: GridCalendarTable;
  readonly week: GridCalendarTable;
  readonly medianByDay: GridCalendarMedianTable;
  readonly medianByWeek: GridCalendarMedianTable;
  readonly error: string | null;

  constructor(model: CalendarModel) {
    this.error = model.error;
    this.day = {
      rows: model.day.rows,
      columnDefs: this.buildDayColumnDefs(model)
    };
    this.week = {
      rows: model.week.rows,
      columnDefs: this.buildWeekColumnDefs(model)
    };
    this.medianByDay = {
      row: model.medianByDay.row,
      columnDefs: this.buildMedianByDayColumnDefs(model)
    };
    this.medianByWeek = {
      row: model.medianByWeek.row,
      columnDefs: this.buildMedianByWeekColumnDefs(model)
    };
  }

  private buildTotalSecondsColumn<T>(field: string = "totalSeconds", headerName = "Total"): ColDef<T> {
    return {
      field: field as never,
      headerName,
      headerClass: "ag-header-vertical",
      sort: "desc",
      valueFormatter: (p) =>
        p.value != null && Number(p.value) > 0 ? String(Math.round(Number(p.value))) : "",
      cellClass: "ag-right-aligned-cell",
      cellStyle: (p) => ({
        backgroundColor: cellColorForMinutes(p.value as number),
        paddingLeft: "4px"
      }),
      width: 60,
      maxWidth: 72
    };
  }

  private buildPerDateTimeColumns<T>(dates: string[], useMinutesOnly: boolean): ColDef<T>[] {
    return dates.map((d) => ({
      field: d as never,
      headerName: formatDateShort(d),
      headerClass: "ag-header-vertical",
      valueFormatter: (p) =>
        p.value != null
          ? useMinutesOnly
            ? formatTimeMinutesOnly(Number(p.value))
            : this.formatTimeNearestMinute(Number(p.value))
          : "",
      cellClass: "ag-right-aligned-cell",
      cellStyle: (p) => ({
        backgroundColor: cellColorForMinutes(p.value as number),
        textAlign: "center",
        paddingLeft: "4px"
      }),
      width: 48,
      maxWidth: 72
    })) as ColDef<T>[];
  }

  private buildPerWeekTimeColumns<T>(weeks: string[], useMinutesOnly: boolean): ColDef<T>[] {
    return weeks.map((weekMonday) => ({
      field: weekMonday as never,
      headerName: formatDateShort(weekMonday),
      headerClass: "ag-header-vertical",
      valueFormatter: (p) =>
        p.value != null
          ? useMinutesOnly
            ? formatTimeMinutesOnly(Number(p.value))
            : this.formatTimeNearestMinute(Number(p.value))
          : "",
      cellClass: "ag-right-aligned-cell",
      cellStyle: (p) => ({
        backgroundColor: cellColorForMinutes(p.value as number),
        textAlign: "center",
        paddingLeft: "4px"
      }),
      width: 48,
      maxWidth: 72
    })) as ColDef<T>[];
  }

  private formatTimeNearestMinute(minutes: number): string {
    const totalMinutes = Math.round(minutes);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${mins}` : `${mins}`;
  }

  private selectTimeColumns<T>(
    viewMode: ViewMode,
    weeks: string[],
    dates: string[],
    useMinutesOnly: boolean
  ): ColDef<T>[] {
    if (viewMode === "week") {
      return this.buildPerWeekTimeColumns<T>(weeks, useMinutesOnly);
    }
    return this.buildPerDateTimeColumns<T>(dates, useMinutesOnly);
  }

  private buildStudentColumns(): ColDef<CalendarRow>[] {
    return [
      {
        field: "full_name",
        headerName: "Name",
        minWidth: 160,
        flex: 1,
        pinned: "left",
        cellStyle: { paddingLeft: "4px" },
        cellRenderer: (params) => {
          const name = String(params.value ?? "");
          const studentId = String(params.data?.studentid ?? "");
          const courseId = String(params.data?.courseid ?? "");
          if (!studentId || !courseId) return name;
          return `<a href="/${courseId}/${studentId}" class="underline text-primary-600">${name}</a>`;
        }
      },
      {
        field: "studentid",
        headerName: "Github",
        minWidth: 120,
        pinned: "left",
        cellStyle: { paddingLeft: "4px" },
        cellRenderer: (params) => {
          const studentId = String(params.value ?? "");
          if (!studentId) return studentId;
          return `<a href="https://github.com/${studentId}" target="_blank" rel="noopener noreferrer" class="underline text-primary-600">${studentId}</a>`;
        }
      }
    ];
  }

  private buildDayColumnDefs(model: CalendarModel): ColDef<CalendarRow>[] {
    return [
      ...this.buildStudentColumns(),
      this.buildTotalSecondsColumn<CalendarRow>("totalSeconds", "Total"),
      ...this.selectTimeColumns<CalendarRow>("day", model.weeks, model.dates, true)
    ];
  }

  private buildWeekColumnDefs(model: CalendarModel): ColDef<CalendarRow>[] {
    return [
      ...this.buildStudentColumns(),
      this.buildTotalSecondsColumn<CalendarRow>("totalSeconds", "Total"),
      ...this.selectTimeColumns<CalendarRow>("week", model.weeks, model.dates, true)
    ];
  }

  private buildMedianByDayColumnDefs(model: CalendarModel): ColDef<CalendarMedianRow>[] {
    return [
      this.buildTotalSecondsColumn<CalendarMedianRow>("totalSeconds", "Total"),
      ...this.selectTimeColumns<CalendarMedianRow>("day", [], model.dates, true)
    ];
  }

  private buildMedianByWeekColumnDefs(model: CalendarModel): ColDef<CalendarMedianRow>[] {
    return [
      this.buildTotalSecondsColumn<CalendarMedianRow>("totalSeconds", "Total"),
      ...this.selectTimeColumns<CalendarMedianRow>("week", model.weeks, model.dates, true)
    ];
  }
}
