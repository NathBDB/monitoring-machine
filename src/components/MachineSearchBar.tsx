import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';



type Props = {
 
  setSearchTerm: (term: string) => void;
};

export default function MachineSearchBar({  setSearchTerm }: Props) {
  return (
    <Box
      component="form"
      sx={{ 
        p: '2px 4px', 
        display: 'flex', 
        alignItems: 'center', 
        width: 400, 
        border: 1, 
        borderRadius: 1,
        height: '45px',
        boxSizing: 'border-box'
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Rechercher une machine"
        inputProps={{ 'aria-label': 'rechercher une machine' }}
        onChange={(e) => setSearchTerm(e.target.value)}
        
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>

    </Box>
  );
}