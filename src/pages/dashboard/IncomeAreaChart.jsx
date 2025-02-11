import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { fetchPoolPerformanceData ,fetchUserPortfolioValue} from "../../contexts/api/index"; // Import API function

const areaChartOptions = {
  chart: {
    height: 450,
    type: "area",
    toolbar: { show: false },
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 2 },
  grid: { strokeDashArray: 0 },
};

export default function IncomeAreaChart({selectedPool, userAddress}) {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);
  const [points, setPoints] = useState([]); // Store timestamp data

  useEffect(() => {
    
    const loadChartData = async () => {
      try {
        if (selectedPool && !userAddress) {
          // Fetch Pool Performance Data when no pool is selected
          const { points, series } = await fetchPoolPerformanceData(selectedPool);
          
          console.log("✅ Data received in IncomeAreaChart in pool performance:", { points, series });

          if (!points || !Array.isArray(points) || points.length === 0) {
            console.warn("⚠️ Points array is empty or invalid:", points);
          }
          if (!series || !Array.isArray(series) || series.length === 0) {
            console.warn("⚠️ Series array is empty or invalid:", series);
          }

          setPoints(points);
          setSeries(series);
        }else if (selectedPool == null && userAddress !== ""){
          // Fetch Pool Performance Data when no pool is selected
          const { points, series } = await fetchUserPortfolioValue(userAddress);
          
          console.log("✅ Data received in IncomeAreaChart in user portfolio:", { points, series });

          if (!points || !Array.isArray(points) || points.length === 0) {
            console.warn("⚠️ Points array is empty or invalid:", points);
          }
          if (!series || !Array.isArray(series) || series.length === 0) {
            console.warn("⚠️ Series array is empty or invalid:", series);
          }
          
          setPoints(points);
          setSeries(series);
        }
      } catch (error) {
        console.error("❌ Error in loadChartData:", error);
      }
    };

    loadChartData();
  },[selectedPool, userAddress]);
  

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [
        theme.palette.primary.main,
        theme.palette.success.main,
        theme.palette.warning.main,
        theme.palette.error.main,
        theme.palette.info.main,
      ],
      xaxis: {
        categories: points.length > 0 ? points.map((p) => new Date(p).toLocaleString(undefined, { month: 'short', day: '2-digit' ,year:'numeric'})) : [],
        labels: { style: { colors: new Array(30).fill(secondary) } },
        axisBorder: { show: true, color: line },
        tickAmount: points.length > 0 ? points.length - 1 : 30,
      },
      yaxis: {
        min: Math.min(...series.flatMap((s) => s.data)) * 0.9, // 10% padding
        max: Math.max(...series.flatMap((s) => s.data)) * 1.1, // 10% padding
        labels: {
          formatter: (value) => value.toFixed(0), // Ensures readable numbers
        }
      },
      grid: { borderColor: line },
    }));
  }, [primary, secondary, line, theme, points, series]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
}

IncomeAreaChart.propTypes = { slot: PropTypes.string };