import React from 'react';
import type IAsideNav from '../../../types/aside/asideNav';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

interface ISideBarNavItemProps {
  navigate: IAsideNav;
  getCurrentNav: (navID: IAsideNav) => void;
}

const SideBarNavItem: React.FC<ISideBarNavItemProps> = ({
  navigate,
  getCurrentNav,
}) => {
  const MotionButton = motion.create(Button);

  const animation = {
    initial: {
      scale: 1,
    },
    whileHover: {
      scale: 0.85,
    },
  };

  return (
    <MotionButton
      onClick={() => getCurrentNav(navigate)}
      sx={{
        color: 'var(--color-nav-link)',
        letterSpacing: 'var(--letter-spacing-sm)',
        backgroundColor: 'var(--color-nav-bg)',
        height: '4rem',
      }}
      {...animation}
    >
      {navigate.title}
    </MotionButton>
  );
};

export default SideBarNavItem;
