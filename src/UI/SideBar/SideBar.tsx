import React from 'react';
import type IAsideNav from '../../types/aside/asideNav';
import { Toolbar, Box } from '@mui/material';
import SideBarNavItem from './SideBarNavItem/SideBarNavItem';

interface ISideBarProps {
  navigates: IAsideNav[];
  getCurrentNav: (navID: string) => void;
}

const SideBar: React.FC<ISideBarProps> = ({ navigates, getCurrentNav }) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Toolbar>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column-reverse',
              gap: 1,
            }}
          >
            {navigates.map((navigate) => (
              <SideBarNavItem
                navigate={navigate}
                key={navigate.id}
                getCurrentNav={getCurrentNav}
              />
            ))}
          </Box>
        </Toolbar>
      </Box>
    </>
  );
};

export default SideBar;
