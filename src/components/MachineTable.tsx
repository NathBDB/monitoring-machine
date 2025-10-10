import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer
} from '@mui/material';

type Machine = {
  id: number;
  name: string;
  status: string;
  temperature: number | null;
  uptime_hours: number;
  last_maintenance: string;
  department: string;
  site: string;
};

type Props = {
  machines: Machine[];
};

export default function MachineTable({ machines }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom machine</TableCell>
            <TableCell>Département</TableCell>
            <TableCell>Site</TableCell>
            <TableCell>État</TableCell>
            <TableCell>Température (°C)</TableCell>
            <TableCell>Heures de fonctionnement</TableCell>
            <TableCell>Dernière maintenance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {machines.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell>{machine.name}</TableCell>
              <TableCell>{machine.department}</TableCell>
              <TableCell>{machine.site}</TableCell>
              <TableCell>{machine.status}</TableCell>
              <TableCell>{machine.temperature ?? 'N/A'}</TableCell>
              <TableCell>{machine.uptime_hours}</TableCell>
              <TableCell>{machine.last_maintenance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
