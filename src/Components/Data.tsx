import {Gauge} from "@mui/x-charts";
import Paper from "@mui/material/Paper";

interface data {
    date?: string
    time?: string
    temperature?: string
    feel?: string
    humidity?: string
    precipitation?: string

}

export default function Data(now: data) {
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

            <Gauge width={100} height={100} value={Number.parseFloat(now.temperature as string)} />
        </Paper>

    );
}