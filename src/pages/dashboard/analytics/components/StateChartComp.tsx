import { Spinning4Squares } from "@/components/loading/Loading";
import { useToast } from "@/components/Toast";
import { defaultChartData } from "@/constants";
import { useChartStore } from "@/context/ChartContext";
import { supabase } from "@/lib/supabaseClient";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  // indexAxis: 'y' as const,
  elements: {
    bar: {
      // borderWidth: 2,
      borderRadius: 10,
    },
  },
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: "#ffffff", // x-axis labels color
        font: {
          family: "'Poppins', sans-serif",
        },
      },
      grid: {
        color: "#ffffff20", // x-axis grid lines color
      },
    },
    y: {
      ticks: {
        color: "#ffffff", // y-axis labels color
        font: {
          family: "'Poppins', sans-serif",
        },
      },
      grid: {
        color: "#ffffff20", // y-axis grid lines color
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: false,
      text: "Users per State",
      color: "#ffffff",
      align: "start" as const,
      padding: {
        bottom: 25,
        left: 50,
      },
      font: {
        size: 24,
        weight: 300 as const,
        family: "'Poppins', sans-serif",
      },
    },
  },
};

export function StateChartComp() {
  const { selectedCol } = useChartStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<BarChartData>(defaultChartData);
  const { addToast } = useToast();

  useEffect(() => {
    async function getPivotTable() {
      setIsLoading(true);
      const { data, error } = await supabase.rpc("get_grouped_col_users", {
        column_name: selectedCol?.value,
      });

      if (error) {
        addToast(`Error fetching grouped data:${error.message}`, "error");
        setIsLoading(false);
        console.error("Error fetching grouped data:", error);
        return;
      }

      if (!selectedCol) {
        addToast(`Error grouping data: No Column Selected`, "error");
        setIsLoading(false);
        console.error("Error grouping data: No Column Selected", error);
        return;
      }

      const newChartData = formatChartData(data, selectedCol);
      setChartData(newChartData);
      setIsLoading(false);
    }

    if (selectedCol) {
      getPivotTable();
    }
  }, [selectedCol]);

  if (chartData.labels.length === 0) {
    return (
      <div className="border-dashed bg-[#00000020] rounded-lg w-full h-[300px] border-2 border-accent-green/30 flex justify-center items-center text-white/50">
        <p className="w-[400px] text-center">
          Please select column you want on the X axis.<br/> The Y axis will alway be user count
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="border-dashed bg-[#00000020] rounded-lg w-full h-[300px] border-2 border-accent-green/30 flex justify-center items-center text-white/50">
       <Spinning4Squares/>
      </div>
    );
  }

  return (
    <Bar
      options={options}
      data={chartData}
      className=" bg-[#00000030] rounded-lg p-4 text-white"
    />
  );
}

function formatChartData(data: BarChartType[], selectedCol: SelectOptionType) {
  const labels = data.map((d) => d.unique_column);

  return {
    labels,
    datasets: [
      {
        label: selectedCol.name,
        data: data.map((d) => d.user_count),
        backgroundColor: "#D63E72",
      },
    ],
  };
}
