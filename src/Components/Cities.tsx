import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

interface city {
    name?: string;
    country?: string;
    timezone?: string;
    temperature?: string;
}

export function Cities({cities}: { cities: city[] }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ padding: 2 }}>
                            <Typography variant="h6">
                                Top 10 Most Popular Cities
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>City</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Time Zone</TableCell>
                        <TableCell>Temp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cities.map((city) => (
                        <TableRow
                            key={0}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >

                            <TableCell>{city.name}</TableCell>
                            <TableCell component="th" scope="row">
                                {city.country}
                            </TableCell>
                            <TableCell align="right">{city.timezone}</TableCell>
                            <TableCell align="right">{(Number.parseFloat(city.temperature as string) - 273.15).toFixed(2) }°C</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}