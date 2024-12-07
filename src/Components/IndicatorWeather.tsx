import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'

interface Weather {
    city?: string;
    temperature?: string;
    cloud?: string;
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
            <Typography component="p" variant="h4">
                {config.city}
            </Typography>
            <Typography color="#5b21b6" sx={{flex: 1}}>
                {config.temperature} C*
            </Typography>
            <Typography sx={{flex: 1}}>
                {config.cloud} %
            </Typography>
            <Typography sx={{flex: 1}}>
                {config.precipitation}
            </Typography>
        </Paper>
    )
}