import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import sitesData from '../data/data.json';
import DrawerHeader from './DrawerHeader';
import { DRAWER_WIDTH } from '../constants/drawerConstants';

interface NavigationDrawerProps {
  selectedSites: string;
  setSelectedSites: (sites: string) => void;
  selectedDepartments: string;
  setSelectedDepartments: (departments: string) => void;
}

export default function NavigationDrawer({ 
  selectedSites, 
  setSelectedSites, 
  selectedDepartments, 
  setSelectedDepartments 
}: NavigationDrawerProps) {
  
  // Fonctions pour gérer l'ouverture/fermeture des sections
  const toggleSite = (siteName: string) => {
    if (selectedSites === siteName) {
      setSelectedSites(""); // Fermer si déjà ouvert
      setSelectedDepartments(""); // Fermer aussi les départements
    } else {
      setSelectedSites(siteName); // Ouvrir le nouveau site
      setSelectedDepartments(""); // Fermer les départements précédents
    }
  };

  const toggleDepartment = (departmentName: string) => {
    if (selectedDepartments === departmentName) {
      setSelectedDepartments(""); // Fermer si déjà ouvert
    } else {
      setSelectedDepartments(departmentName); // Ouvrir le nouveau département
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH, 
          boxSizing: 'border-box',
          backgroundColor: '#EFF7FE',
          borderRight: 'none',
        },
      }}
    >
      <DrawerHeader>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          ⚙️ Monitoring Application
        </Typography>
      </DrawerHeader>
    


      <List>
        <Divider sx={{ borderBottomWidth: 2 }} />
        {sitesData.map((site) => (
          <React.Fragment key={site.id}>
            <ListItemButton onClick={() => toggleSite(site.name)}>
              {selectedSites === site.name ? <ExpandLess sx={{ mr: 2 }} /> : <ExpandMore sx={{ mr: 2 }} />}
              <ListItemText primary={site.name} />
            </ListItemButton>
            <Divider sx={{ borderBottomWidth: 1.5 }} />

            <Collapse in={selectedSites === site.name} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {site.departments.map((dep) => (
                  <React.Fragment key={dep.id}>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => toggleDepartment(dep.name)}
                    >
                      {selectedDepartments === dep.name ? <ExpandLess sx={{ mr: 2 }} /> : <ExpandMore sx={{ mr: 2 }} />}
                      <ListItemText primary={dep.name} />
                    </ListItemButton>
                    <Divider sx={{ ml: 6, borderBottomWidth: 1.5 }} />

                    <Collapse in={selectedDepartments === dep.name} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {dep.machines.map((machine) => (
                          <React.Fragment key={machine.id}>
                            <ListItemButton sx={{ pl: 12 }}>
                              <ListItemText
                                primary={machine.name}
                              />
                            </ListItemButton>
                            <Divider sx={{ ml: 12, borderBottomWidth: 1.5 }} />
                          </React.Fragment>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}