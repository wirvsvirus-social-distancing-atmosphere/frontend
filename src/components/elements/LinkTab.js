import React from 'react';
import Tab from '@material-ui/core/Tab';

function LinkTab(props) {
    return (
      <Tab
        component="a"
        {...props}
      />
    );
  }

export default LinkTab;