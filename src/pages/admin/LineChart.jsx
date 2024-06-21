import { Line } from "react-chartjs-2";
import { purpleLight } from "../../constants/color";
import { purple } from "@mui/material/colors";
import { lineChartOptions } from "./Dashboard";

const LineChart = ({ value = [] }) => {
    console.log("LineChart value:", value); // Debugging log
    if (!Array.isArray(value) || value.some(isNaN)) {
        console.error("Invalid data for LineChart:", value);
        return <div>Invalid data</div>;
    }
    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Messages",
                fill: true,
                backgroundColor: purpleLight.toString(),
                borderColor: purple.toString(),
            },
        ],
    };

    return <Line data={data} options={lineChartOptions} />;
};
