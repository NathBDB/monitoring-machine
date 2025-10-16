import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Chip
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
  const getStatusChipColor = (status: string) => {
    switch (status) {
      case 'En panne':
        return 'error';
      case 'En marche':
        return 'success';
      case 'En veille':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        maxHeight: "100%", 
        overflow: "auto",
 
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ffffff' }}>Nom machine</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ffffff' }}>Site</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ffffff' }}>Département</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ffffff' }}>Température (°C)</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ffffff' }}>Heures de fonctionnement</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ffffff' }}>Dernière maintenance</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ffffff' }}>État</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {machines.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell>{machine.name}</TableCell>
              <TableCell>{machine.site}</TableCell>
              <TableCell>{machine.department}</TableCell>
              <TableCell>{machine.temperature ?? 'N/A'}</TableCell>
              <TableCell>{machine.uptime_hours}</TableCell>
              <TableCell>{machine.last_maintenance}</TableCell>
              <TableCell>
                <Chip 
                  label={machine.status} 
                  color={getStatusChipColor(machine.status) as 'error' | 'success' | 'warning' | 'default'}
                  size="small"
                />
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
