import { Gauge } from "@mui/x-charts";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

interface Datas {
  temperature?: string
  feel?: string
  humidity?: string
  precipitation?: string
}

export default function Data(now: Datas) {
  const [option, setOption] = useState<string>('temperature');

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
  };

  function getData(now: Datas, option: string) {
    switch (option) {
      case 'temperature':
        return Number.parseFloat(now.temperature as string);
      case 'feel':
        return Number.parseFloat(now.feel as string) - 273.15;
      case 'humidity':
        return Number.parseInt(now.humidity as string);
      case 'precipitation':
        return Number.parseFloat(now.precipitation as string) * 100;
    }
    return 0;
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
          Data
        </Typography>
        <FormControl>
          <InputLabel id="demo-simple-select-label" sx={{
            color: 'white',
          }}>Please select an option</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={option}
            label="Option"
            onChange={handleChange}
            autoWidth
            sx={{
              color: 'white',
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
      <Grid sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Gauge
          width={200}
          height={218}
          value={getData(now, option)}
          valueMin={0}
          valueMax={100}
          sx={{
            color: 'white',
            alignContent: 'center',
            justifyContent: 'center',
          }} />
      </Grid>
    </Paper>

  );
}
