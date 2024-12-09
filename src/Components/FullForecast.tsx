import Paper from '@mui/material/Paper';
import {LineChart} from '@mui/x-charts/LineChart';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useState} from "react";

interface Row {
    date?: string
    temperature?: string
    feel?: string
    humidity?: string,
    precipitation?: string,
}

export default function BasicTable({filas}: { filas: Row[] }) {
    const [option, setOption] = useState<string>('temperature');

    const handleChange = (event: SelectChangeEvent) => {
        setOption(event.target.value as string);
    };

    function getData(filas: Row[], option: string) {
        switch (option) {
            case 'temperature':
                return filas.map(f => Number.parseInt(f.temperature as string));
            case 'feel':
                return filas.map(f => Number.parseInt(f.feel as string));
            case 'humidity':
                return filas.map(f => Number.parseInt(f.humidity as string));
            case 'precipitation':
                return filas.map(f => Number.parseFloat(f.precipitation as string) * 100)
        }
        return [];
    }

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
            <Grid sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography variant={'h6'}>
                    Full Forecast
                </Typography>
                <FormControl>
                    <InputLabel id="demo-simple-select-label" sx ={{
                        color:'white',
                    }}>Please select an option</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={option}
                        label="Age"
                        onChange={handleChange}
                        autoWidth
                        sx ={{
                            color:'white',
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: '#141414', // Dropdown menu background
                                    color: 'white', // Dropdown menu text color
                                },
                            },
                        }}
                    >
                        <MenuItem value={"temperature"}>Temperature</MenuItem>
                        <MenuItem value={"feel"}>Feel like</MenuItem>
                        <MenuItem value={"humidity"}>Humidity</MenuItem>
                        <MenuItem value={"precipitation"}>Precipitation</MenuItem>
                    </Select>
                </FormControl>
            </Grid>


            {/* Componente para un gráfico de líneas */}
            <LineChart
                width={900}
                height={300}
                series={[
                    {data: getData(filas, option), color: '#5b21b6'},
                ]}
                xAxis={[
                    {
                        scaleType: 'point',
                        data: filas.map((f) => f.date),
                    },
                ]}
                sx={{
                    //change left yAxis label styles
                    "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                        strokeWidth:"0.4",
                        fill:"white"
                    },
                    // change bottom label styles
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                        strokeWidth:"0.5",
                        fill:"white"
                    },
                    // bottomAxis Line Styles
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                        stroke:"white",
                        strokeWidth:1
                    },
                    // leftAxis Line Styles
                    "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                        stroke:"white",
                        strokeWidth:1
                    }
                }}
            />
        </Paper>
    );
}