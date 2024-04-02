<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const DEFAULT_X_STEP_SIZE = 0.33; // Split sensor position into even pieces
const DEFAULT_ROLL_WIDTH = 2.7; // Some default roll width if not specified
const DEFAULT_ORIENTATION = "vertical";

export interface HeatmapParameters {
  // Actual data is required, must be a list of items, containing position for both axis and value
  data: {
    current_length: number;
    position_bridge: number;
    current_diameter?: number;
    value: number;
  }[];
  // Proper min & max set values if available, default ones will be used by default
  setValues?: {
    allowed_min: number;
    allowed_max: number;
    preferred_min: number;
    preferred_max: number;
  };
  // Custom data splitting step is supported for X axis
  xStepSize?: number;
  // Roll width would be good to know for proper output
  rollWidth?: number;
  // Way of output the heatmap
  orientation?: "vertical" | "horizontal";
}

const props = defineProps<HeatmapParameters>();

const xStepSize = props.xStepSize ?? DEFAULT_X_STEP_SIZE;
const rollWidth = props.rollWidth ?? DEFAULT_ROLL_WIDTH;
const hmOrientation = props.orientation ?? DEFAULT_ORIENTATION;

// Fill-up the X axis possible positions and related labels for them
const hmXAxisData: number[] = [];
const hmXAxisLabels: string[] = [];
for (let curr = 0, i = 0; curr < rollWidth; curr += xStepSize, i++) {
  hmXAxisData.push(i);
  hmXAxisLabels.push(`${curr.toFixed(2)}..${(curr + xStepSize).toFixed(2)}`);
}
hmXAxisLabels[hmXAxisLabels.length - 1] = `..${rollWidth.toFixed(2)}`;

const hmData: number[][] = [];
const hmYAxisData: number[] = [];
props.data.forEach(item => {
  const yAxisEntry = item.current_length;
  if (hmYAxisData.indexOf(yAxisEntry) === -1) {
    hmYAxisData.push(yAxisEntry);
  }
  hmData.push([
    hmXAxisData.indexOf(Math.round(item.position_bridge / xStepSize)),
    hmYAxisData.indexOf(yAxisEntry),
    item.value,
  ]);
});

const heatmapContainer = ref<HTMLDivElement | null>(null);
let heatmapChart: echarts.ECharts | null = null;

onMounted(() => {
  initializeHeatmap(hmOrientation);
});

const gradientColors = [
  // Gradient colors by default (if set values not available)
  "#d2e2fc",
  "#4b6da6",
  "#031e4d",
];

async function initializeHeatmap(orientation) {
  heatmapChart = echarts.init(heatmapContainer.value!);
  if (orientation == "vertical") {
    let hmVisualMapStyle = {};
    if (
      props.setValues != undefined &&
      props.setValues.allowed_max != 0 &&
      props.setValues.allowed_min != 0
    ) {
      hmVisualMapStyle = {
        type: "continuous",
        min: props.setValues.allowed_min,
        max: props.setValues.allowed_max,
        calculable: true,
        orient: "horizontal",
        left: "20%",
        top: 0,
        itemWidth: 15, // Adjust the width of the VisualMap item
        itemHeight: 100, // Adjust the height of the VisualMap item
        precision: 2,
      };
    } else {
      hmVisualMapStyle = {
        type: "continuous",
        min: 10,
        max: 20,
        calculable: true,
        orient: "horizontal",
        left: "20%",
        top: 0,
        itemWidth: 15, // Adjust the width of the VisualMap item
        itemHeight: 100, // Adjust the height of the VisualMap item
        precision: 2,
        inRange: {
          color: gradientColors, // Apply the custom gradient colors here
        },
      };
    }

    heatmapChart.setOption({
      height: hmYAxisData.length * 30 + "px",
      grid: {
        left: "20%",
        width: "250px",
        top: "100px",
      },
      xAxis: {
        name: t("heatMap.xAxisDescription"),
        nameLocation: "center",
        type: "category",
        data: hmXAxisLabels,
        position: "top", // Display the X-axis at the top
        splitArea: {
          show: true,
        },
        nameGap: 30,
      },
      yAxis: {
        name: t("heatMap.yAxisDescription"),
        nameLocation: "start",
        type: "category",
        data: hmYAxisData,
        inverse: true,
        axisLabel: {
          interval: 0,
          rotate: 10,
        },
        splitArea: {
          show: true,
        },
        nameTextStyle: {
          align: "right",
        },
        nameRotate: 10,
        nameGap: 20,
      },
      visualMap: hmVisualMapStyle,
      series: [
        {
          type: "heatmap",
          data: hmData,
          label: {
            show: true,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  } else {
    let hmVisualMapStyle = {};
    if (
      props.setValues != undefined &&
      props.setValues.allowed_max != 0 &&
      props.setValues.allowed_min != 0
    ) {
      hmVisualMapStyle = {
        type: "continuous",
        min: props.setValues.allowed_min,
        max: props.setValues.allowed_max,
        calculable: true,
        orient: "horizontal",
        left: 600,
        top: 0,
        itemWidth: 15, // Adjust the width of the VisualMap item
        itemHeight: 100, // Adjust the height of the VisualMap item
        precision: 2,
      };
    } else {
      hmVisualMapStyle = {
        type: "continuous",
        min: 6,
        max: 8,
        calculable: true,
        orient: "horizontal",
        left: 280,
        top: 0,
        itemWidth: 15, // Adjust the width of the VisualMap item
        itemHeight: 100, // Adjust the height of the VisualMap item
        precision: 2,
        inRange: {
          color: gradientColors, // Apply the custom gradient colors here
        },
      };
    }

    heatmapChart.setOption({
      height: hmXAxisData.length * 25 + "px",
      width: hmYAxisData.length * 50 - 50 + "px",
      grid: {
        top: "50px",
        left: "125px",
      },
      yAxis: {
        name: t("heatMap.yAxisDescription"),
        nameLocation: "middle",
        type: "category",
        data: hmXAxisLabels,
        position: "top", // Display the X-axis at the top
        splitArea: {
          show: true,
        },
        nameRotate: 90,
        nameTextStyle: {
          fontWeight: "bold",
        },
        nameGap: 75,
      },
      xAxis: {
        name: t("heatMap.xAxisDescription"),
        type: "category",
        nameLocation: "middle",
        inverse: true,
        data: hmYAxisData,
        axisLabel: {
          interval: 0,
          rotate: 5, //If the label names are too long you can manage this by rotating the label.
          align: "center",
          margin: 20,
          formatter: (value: number, index: number) => {
            // Try to show both, length and diameter (if available) in the axis label
            const diam = props.data[index].current_diameter || "N/A";
            return `${value}\n⌀ ${diam}`;
          },
        },
        splitArea: {
          show: true,
        },
        nameTextStyle: {
          fontWeight: "bold",
          align: "center",
        },
        nameGap: 40,
      },
      visualMap: hmVisualMapStyle,
      series: [
        {
          type: "heatmap",
          data: hmData.map(item => [item[1], item[0], item[2]]),
          label: {
            show: true,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  }

  // Resize the chart when the window resizes
  const resizeChart = () => {
    heatmapChart?.resize();
  };
  window.addEventListener("resize", resizeChart);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeChart);
    heatmapChart?.dispose();
  });
}

let hmSizingStyle;
if (hmOrientation == "vertical") {
  if (hmYAxisData.length < 10) {
    hmSizingStyle = {
      height: hmYAxisData.length * 80 + "px",
      width: "450px",
    };
  } else {
    hmSizingStyle = {
      height: hmYAxisData.length * 35 + "px",
      width: "450px",
    };
  }
} else {
  hmSizingStyle = {
    width: hmYAxisData.length * 55 + "px",
    height: "350px",
  };
}
</script>

<template>
  <div
    ref="heatmapContainer"
    :style="hmSizingStyle"
  ></div>
</template>
