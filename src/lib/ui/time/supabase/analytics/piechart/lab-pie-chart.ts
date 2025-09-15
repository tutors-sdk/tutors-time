import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent, GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import type { Course } from "@tutors/tutors-model-lib";
import { backgroundPattern, textureBackground } from "../../charts/tutors-charts-background-url";
import type { Session } from "@supabase/supabase-js";
import { filterByType } from "@tutors/tutors-model-lib";
import { piechart } from "../../charts/piechart";
import { BasePieChart } from "./base-pie-chart";
import type { DrilledDownData } from "$lib/services/metrics/metrics-types";
import { tutorsConnectService } from "$lib/services/connect";
echarts.use([TooltipComponent, LegendComponent, PieChart, BarChart, GridComponent, CanvasRenderer, LabelLayout]);

const bgTexture = textureBackground;
const bgPatternSrc = backgroundPattern;

const piePatternImg = new Image();
piePatternImg.src = bgTexture;
const bgPatternImg = new Image();
bgPatternImg.src = bgPatternSrc;

export class LabPieChart extends BasePieChart<number> {
  labs: string[];

  constructor(course: Course, session: Session) {
    super(course, session);
    this.labs = [];
  }

  renderChart() {
    super.renderChart(); // Initialise and set up click handlers

    this.titleTimesMap.clear();
    this.totalTimesMap.clear();

    let labs = filterByType(this.course.los, "lab");
    let steps = filterByType(this.course.los, "step");

    const allLabSteps = [...labs, ...steps];

    allLabSteps.forEach((lo) => {
      const timeActive = lo.learningRecords?.get(tutorsConnectService.tutorsId.value.login)?.timeActive || 0;
      this.updateMaps(lo, timeActive, (lo) => (lo.type === "lab" ? lo.title : lo.parentLo!.title));
    });

    const singleUserInnerData = Array.from(this.titleTimesMap.entries()).map(([title, timeActive]) => ({
      name: title,
      value: Math.round(timeActive / 2)
    }));

    const singleUserOuterData: DrilledDownData[] = [];
    this.totalTimesMap.forEach((steps, title) => {
      steps.forEach((step) => {
        if (step.type !== undefined) {
          singleUserOuterData.push({
            name: step.name,
            value: Math.round(step.value / 2),
            type: step.type
          });
        }
      });
    });

    const option = piechart(bgPatternImg, [], singleUserInnerData, singleUserOuterData);
    super.setOption(option);
  }
}
