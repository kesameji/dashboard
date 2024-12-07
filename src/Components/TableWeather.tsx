import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Row {
    date?: string
    temperature?: string
    feel?: string
    humidity?: string
}

export default function BasicTable({filas}: { filas: Row[] }) {
    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell align="right">Temperature</TableCell>
                        <TableCell align="right">Feel</TableCell>
                        <TableCell align="right">Humidity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filas.map((row) => (
                        <TableRow
                            key={row.date}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.date?.toString().split("T")[0]}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.date?.toString().split("T")[1]}
                            </TableCell>
                            <TableCell align="right">{row.temperature} C*</TableCell>
                            <TableCell align="right">{row.feel} C*</TableCell>
                            <TableCell align="right">{row.humidity} m3</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}