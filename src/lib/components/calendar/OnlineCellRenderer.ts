import type { ICellRendererComp, ICellRendererParams } from "ag-grid-community";
import type { CalendarRow } from "@tutors/tutors-time-lib";
import { mount, unmount } from "svelte";
import OnlineIcon from "$lib/components/OnlineIcon.svelte";

const GRID_ONLINE_ICON_SIZE = "size-6";

/**
 * AG Grid cell renderer that mounts {@link OnlineIcon} from `row.online_status`.
 */
export class OnlineCellRenderer implements ICellRendererComp<CalendarRow> {
  private eGui!: HTMLDivElement;
  private instance: Record<string, unknown> | null = null;

  init(params: ICellRendererParams<CalendarRow, string>): void {
    this.eGui = document.createElement("div");
    this.eGui.className = "flex items-center justify-center h-full min-h-[32px] py-0.5";
    this.render(params);
  }

  private render(params: ICellRendererParams<CalendarRow, string>): void {
    if (this.instance) {
      unmount(this.instance);
      this.instance = null;
    }
    this.eGui.replaceChildren();

    const raw = params.data?.online_status;

    this.instance = mount(OnlineIcon, {
      target: this.eGui,
      props: {
        status: raw,
        size: GRID_ONLINE_ICON_SIZE
      }
    }) as Record<string, unknown>;
  }

  getGui(): HTMLElement {
    return this.eGui;
  }

  refresh(params: ICellRendererParams<CalendarRow, string>): boolean {
    this.render(params);
    return true;
  }

  destroy(): void {
    if (this.instance) {
      unmount(this.instance);
      this.instance = null;
    }
  }
}
