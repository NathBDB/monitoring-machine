import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterComboBox from './FilterComboBox';
import { DRAWER_WIDTH } from '../constants/drawerConstants';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  stateOptions: string[];
  selectedStates: string[];
  setSelectedStates: (states: string[]) => void;
}

export default function FilterDrawer({
  open,
  onClose,
  stateOptions,
  selectedStates,
  setSelectedStates
}: FilterDrawerProps) {
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {width: DRAWER_WIDTH, boxSizing: 'border-box'},
      }}
      variant="temporary"
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <ChevronRightIcon /> 
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Filtres
        </Typography>
      </DrawerHeader>
      <Divider />
      
      <Box sx={{ 
        padding: 3, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box sx={{ width: '100%' }}>
          <FilterComboBox
            options={stateOptions}
            selectedValues={selectedStates}
            setSelectedValues={setSelectedStates}
            label="Sélectionner les états"
          />
        </Box>
      </Box>
    </Drawer>
  );
}