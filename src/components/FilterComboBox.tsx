import { Autocomplete, TextField, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



type Props = {
  options: string[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
  label: string;
};

export default function FilterComboBox({ options, selectedValues, setSelectedValues, label }: Props) {
  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      isOptionEqualToValue={(option, value) => option === value}
      value={selectedValues}
      onChange={(_, newValue) => setSelectedValues(newValue)}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
      sx={{ margin: 1 }}
    />
  );
}
