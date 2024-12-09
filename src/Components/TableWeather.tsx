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
export default function BasicTable({filas}: { filas: Row[] }) {
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
                Full Forecast
            </Typography>

            {/* Componente para un gráfico de líneas */}
            <LineChart
                width={900}
                height={300}
                series={[
                    {data: filas.map(f => Number.parseInt(f.temperature as string)), label: 'Temp', color: 'red',},
                    {data: filas.map(f => Number.parseInt(f.feel as string)), label: 'Real feel', color: 'orange'},
                    {data: filas.map(f => Number.parseInt(f.humidity as string)), label: 'Humidity', color: 'cyan'},
                    {data: filas.map(f => Number.parseFloat(f.precipitation as string) * 100), label: 'Precipitation', color: 'blue'},
                ]}
                xAxis={[{scaleType: 'point', data: filas.map(f => f.date)}]}

            />
        </Paper>
    );
}