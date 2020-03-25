import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';

function LinkTab(props) {
    return (
      <Tab
        component={ RouterLink }
        {...props}
      />
    );
  }

export default LinkTab;