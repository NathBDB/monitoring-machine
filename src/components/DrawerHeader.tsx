import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: 50,
  paddingBottom: 40,
  paddingLeft: 20,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  
}));

export default DrawerHeader;