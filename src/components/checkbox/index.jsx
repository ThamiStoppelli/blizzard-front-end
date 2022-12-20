import * as React from 'react';
import { FormControlLabel, Checkbox, Box } from '@mui/material';

export default function LocationsCheckbox({
  label, block, space
}) {

  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[0]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const handleChange4 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };


  const childrenS = (
    <Box 
    sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel

        label="Child 2 - 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Child 2 - 2"
        control={<Checkbox checked={checked[0]} onChange={handleChange4} />}
      />
    </Box>
  );

  const children = (
    <Box  
    style ={{
      marginLeft:0
    }} 
    sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      
      <FormControlLabel

        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange1} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox defaultChecked onChange={handleChange2}/>}
        />
        {childrenS}
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
          defaultChecked
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}
