import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { FC } from 'react';

interface itemsTabs {
    name: string,
    onClick: () => void
}

interface AccessibleTabsProps {
    items: itemsTabs[]
}

const AccessibleTabs: FC<AccessibleTabsProps> = ({items}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const item = items.find((elem, index)=>{
        if(index == newValue) {
            return elem;
        }
    });

    if(item) {
        item.onClick();
    }
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginBottom: '10px' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        {items.map((item) => {
            return <Tab label={item.name} />
        })}
      </Tabs>
    </Box>
  );
}

export default AccessibleTabs;