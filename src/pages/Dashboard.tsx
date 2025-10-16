import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import FilterListIcon from '@mui/icons-material/FilterList';
import sitesData from '../data/data.json';
import MachineTable from '../components/MachineTable';
import Button from '@mui/material/Button';
import { useState } from 'react';
import MachineSearchBar from '../components/MachineSearchBar';
import NavigationDrawer from '../components/NavigationDrawer';
import FilterDrawer from '../components/FilterDrawer';
import { DRAWER_WIDTH } from '../constants/drawerConstants';

const Main = styled('main')<{}>(() => ({
  marginLeft: DRAWER_WIDTH, // Décale le contenu après le drawer permanent
  minHeight: '100vh',
  //paddingRight: '20px', paddingLeft: '20px', // Espacement symétrique de chaque côté
  boxSizing: 'border-box', // Assure que le padding est inclus dans la largeur
  padding: '20px', // Supprime le padding top
  marginTop: '0', // Supprime le margin top
  //backgroundColor: "#ffffff"
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
 
  const [open, setOpen] = React.useState(false);
  
  const [selectedSites, setSelectedSites] = useState<string>("");
  const [selectedDepartments, setSelectedDepartments] = useState<string>("");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const handleDrawerOpen = () => {setOpen(true);};
  const handleDrawerClose = () => {setOpen(false);};

  // Options passé dans le filtre états
  const stateOptions = React.useMemo(() => {
    const filteredMachines = allMachines.filter(machine => {
      const siteMatch = selectedSites.length === 0 || selectedSites === machine.site;
      const departmentMatch = selectedDepartments.length === 0 || selectedDepartments === machine.department;
      return siteMatch && departmentMatch;
    });
    return [...new Set(filteredMachines.map(machine => machine.status))];
  }, [selectedSites, selectedDepartments]);


  const filteredMachines = allMachines.filter(machine => {
    const siteMatch = selectedSites.length === 0 || selectedSites === machine.site;
    const departmentMatch = selectedDepartments.length === 0 || selectedDepartments === machine.department;
    const stateMatch = selectedStates.length === 0 || selectedStates.includes(machine.status);
    const searchMatch = searchTerm === '' || machine.name.toLowerCase().includes(searchTerm.toLowerCase());
    return siteMatch && departmentMatch && stateMatch && searchMatch;
  });

  return (
    <Box sx={{ 
      backgroundColor: "#EFF7FE", 
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <CssBaseline />

      <NavigationDrawer
        selectedSites={selectedSites}
        setSelectedSites={setSelectedSites}
        selectedDepartments={selectedDepartments}
        setSelectedDepartments={setSelectedDepartments}
      />

      <FilterDrawer
        open={open}
        onClose={handleDrawerClose}
        stateOptions={stateOptions}
        selectedStates={selectedStates}
        setSelectedStates={setSelectedStates}
      />
      
      <Main>
        <Box sx={{ 
          backgroundColor: '#ffffff', 
          p: 3, 
        
          borderRadius: 5,
          width: "calc(75vw - 35px)",
          height: "calc(100vh - 40px)",
          position: "fixed",
          top: "20px",
          left: "calc(DRAWER_WIDTH + 10px)",
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3, 
            justifyContent: 'space-between'
          }}>  
            <Typography sx={{ textAlign: 'left'}} variant="h5">
              Liste des machines 
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 2 }}>
              <MachineSearchBar setSearchTerm={setSearchTerm} />  
              <Button 
              
                variant="outlined" 
                color="inherit" 
                startIcon={<FilterListIcon />} 
                onClick={handleDrawerOpen}
                sx={{ height: '45px', minWidth: '130px', backgroundColor: '#ffffff' }}
              > 
                Filtrer
              </Button>
            </Box>

          </Box>
        
          <Box sx={{ 
            width: '100%', 
            flex: 1, 
            overflow: "hidden",
            maxHeight: "calc(100% - 80px)"
          }}>
            <MachineTable machines={filteredMachines} />
          </Box>
        </Box>
      </Main>
      
      
    </Box>
  );
}