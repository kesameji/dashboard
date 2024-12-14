import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'
import CloudIcon from '@mui/icons-material/Cloud';

interface Weather {
    city?: string;
    temperature?: string;
    cloudTitle?: string;
    cloudValue?: string;
    precipitation?: string;
}

export default function IndicatorWeather(config: Weather) {
    return (
        <Paper sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            backgroundColor: '#141414',
            color: 'white',
            padding: 2,
        }}>
            <Typography component="h2" variant="h6" gutterBottom>
                Weather Today
            </Typography>
            <Typography component="p" variant="h5">
                {config.city}
            </Typography>
            <Typography component="h2" variant="h2" color="#5b21b6" sx={{ flex: 1 }}>
                {config.temperature} °C
            </Typography>
            <div>
                <CloudIcon sx={{ color: '#5b21b6', fontSize: 70 }} />
            </div>
            <Typography component="p" variant="h6" color="#5b21b6" sx={{ flex: 1 }}>
                {config.cloudTitle} {config.cloudValue} %
            </Typography>
            <Typography sx={{ flex: 1 }}>
                Precipitation {Number.parseFloat(config.precipitation as string) * 100}%
            </Typography>
        </Paper>
    )
}