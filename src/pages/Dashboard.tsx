import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterComboBox from '../components/FilterComboBox';
import sitesData from '../data/data.json';
import MachineTable from '../components/MachineTable';
import { useState } from 'react';
const drawerWidth = '25%';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
       // width: `calc(100% - ${drawerWidth})`,
       // marginLeft: `${drawerWidth}`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Main = styled('main')<{}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',

}));

const allMachines = sitesData.flatMap(site =>
  site.departments.flatMap(dep =>
    dep.machines.map(machine => ({
      ...machine,
      department: dep.name,
      site: site.name
    }))
  )
);

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  const [selectedSites, setSelectedSites] = useState<{id:number | string, name:string}[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<{id:number | string, name:string}[]>([]);
  const [selectedStates, setSelectedStates] = useState<{id:number | string, name:string}[]>([]);
  
  const handleDrawerOpen = () => {setOpen(true);};
  const handleDrawerClose = () => {setOpen(false);};

// Gestion des options qui sont passées dans les filtres afin qu ils puissent interagir entre eux
// ( exemple : si le site A est selectionné, montrer dans le filtre département uniquement les départements qui existent dans le site A )

  // Options passé dans le filtre sites 
  const siteOptions = React.useMemo(() => {
    const filteredMachines = allMachines.filter(machine => {
      const departmentMatch = selectedDepartments.length === 0 || selectedDepartments.some(dept => dept.name === machine.department);
      const stateMatch = selectedStates.length === 0 || selectedStates.some(state => state.name === machine.status);
      return departmentMatch && stateMatch; });
    
    const availableSites = [...new Set(filteredMachines.map(machine => machine.site))];
    return sitesData.filter(site => availableSites.includes(site.name)).map(site => ({ id: site.id, name: site.name }));
  }, [selectedDepartments, selectedStates]);

  // Options passé dans le filtre départements 
  const departmentOptions = React.useMemo(() => {
    const filteredMachines = allMachines.filter(machine => {
      const siteMatch = selectedSites.length === 0 || selectedSites.some(site => site.name === machine.site);
      const stateMatch = selectedStates.length === 0 || selectedStates.some(state => state.name === machine.status);
      return siteMatch && stateMatch;});
    
    const availableDepartments = [...new Set(filteredMachines.map(machine => machine.department))];
    return availableDepartments.map((dept) => ({ id: dept, name: dept }));
  }, [selectedSites, selectedStates]);

  // Options passé dans le filtre états
  const stateOptions = React.useMemo(() => {
    const filteredMachines = allMachines.filter(machine => {
      const siteMatch = selectedSites.length === 0 || selectedSites.some(site => site.name === machine.site);
      const departmentMatch = selectedDepartments.length === 0 || selectedDepartments.some(dept => dept.name === machine.department);
      return siteMatch && departmentMatch;});
    
    const availableStates = [...new Set(filteredMachines.map(machine => machine.status))];
    return availableStates.map((status) => ({ id: status, name: status }));
  }, [selectedSites, selectedDepartments]);

  const filteredMachines = allMachines.filter(machine => {
    const siteMatch = selectedSites.length === 0 || selectedSites.some(site => site.name === machine.site);
    const departmentMatch = selectedDepartments.length === 0 || selectedDepartments.some(dept => dept.name === machine.department);
    const stateMatch = selectedStates.length === 0 || selectedStates.some(state => state.name === machine.status);
    return siteMatch && departmentMatch && stateMatch; });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{mr: 2,},
              open && { display: 'none' },
            ]}
          >
            <FilterListIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Filtres
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Filtres
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        
        <FilterComboBox
          options={siteOptions}
          selectedValues={selectedSites}
          setSelectedValues={setSelectedSites}
          label="Sélectionner les sites"
        />
        
        <FilterComboBox
          options={departmentOptions}
          selectedValues={selectedDepartments}
          setSelectedValues={setSelectedDepartments}
          label="Sélectionner les départements"
        />
        
        <FilterComboBox
          options={stateOptions}
          selectedValues={selectedStates}
          setSelectedValues={setSelectedStates}
          label="Sélectionner les états"
        />

      </Drawer>
      
      <Main>
        <DrawerHeader />
        <Typography variant="h4" component="h1" sx={{ mb: 4, mt: 2, textAlign: 'center' }}>
          Liste des machines
        </Typography>
        <MachineTable machines={filteredMachines} />
      </Main>
      
    </Box>
  );
}