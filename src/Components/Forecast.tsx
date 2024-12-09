import Paper from '@mui/material/Paper';
import {LineChart} from '@mui/x-charts/LineChart';
import Typography from "@mui/material/Typography";

interface Row {
    date?: string
    temperature?: string
    feel?: string
    humidity?: string,
    precipitation?: string,
}

export default function Forecast({filas}: { filas: Row[] }) {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                backgroundColor: '#141414',
                color: 'white',
                padding: 2,
            }}
        >
            <Typography>
                24h Temperature     Forecast
            </Typography>

            {/* Componente para un gráfico de líneas */}
            <LineChart
                width={300}
                height={250}
                series={[
                    {
                        data: filas.map(f => Number.parseInt(f.temperature as string)).slice(0, 8),
                        color: '#5b21b6'
                    },
                ]}
                xAxis={[{scaleType: 'point', data: filas.map(f => f.date).slice(0, 8)}]}
                sx={{
                    //change left yAxis label styles
                    "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                        strokeWidth: "0.4",
                        fill: "white"
                    },
                    // change bottom label styles
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                        strokeWidth: "0.5",
                        fill: "white"
                    },
                    // bottomAxis Line Styles
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                        stroke: "white",
                        strokeWidth: 1
                    },
                    // leftAxis Line Styles
                    "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                        stroke: "white",
                        strokeWidth: 1
                    }
                }}
            />
        </Paper>
    );
}