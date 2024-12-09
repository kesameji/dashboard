import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";

interface city {
    name?: string;
    country?: string;
    timezone?: string;
    temperature?: string;
}

export function Cities({cities}: { cities: city[] }) {
    return (

        <TableContainer
            component={Paper}
            sx={{
                backgroundColor: '#141414   ',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
        >
            <Typography
                variant="h6"
                align="left"
                sx={{
                    color: '#ffffff',
                    marginBottom: '8px',
                }}
            >
                More cities
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        color: '#b3b3b3',
                    }}
                >
                    First 10 cities
                </Typography>
            </Box>

            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                color: '#ffffff',
                                borderBottom: '1px solid #333333',
                            }}
                        >
                            City
                        </TableCell>
                        <TableCell
                            sx={{
                                color: '#ffffff',
                                borderBottom: '1px solid #333333',
                            }}
                        >
                            Country
                        </TableCell>
                        <TableCell
                            sx={{
                                color: '#ffffff',
                                borderBottom: '1px solid #333333',
                            }}
                        >
                            Time Zone
                        </TableCell>
                        <TableCell
                            sx={{
                                color: '#ffffff',
                                borderBottom: '1px solid #333333',
                            }}
                        >
                            Temp
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cities.map((city, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                '&:hover': { backgroundColor: '#333333' },
                                '&:last-child td, &:last-child th': { border: 0 },
                            }}
                        >
                            <TableCell sx={{ color: '#ffffff' }}>{city.name}</TableCell>
                            <TableCell sx={{ color: '#b3b3b3' }}>{city.country}</TableCell>
                            <TableCell sx={{ color: '#b3b3b3' }}>{city.timezone}</TableCell>
                            <TableCell sx={{ color: '#b3b3b3' }}>
                                {(Number.parseFloat(city.temperature as string) - 273.15).toFixed(2)}°C
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}