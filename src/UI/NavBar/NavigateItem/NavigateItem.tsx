import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import type INavigate from '../../../types/navigate/navigate';

interface INavigateItemProps {
  navigate: INavigate;
}

const NavigateItem: React.FC<INavigateItemProps> = ({ navigate }) => {
  const MotionNavLink = motion.create(NavLink);

  const animation = {
    initial: {
      scale: 1,
    },
    whileHover: {
      scale: 0.85,
    },
  };

  return (
    <Button
      component={MotionNavLink}
      to={navigate.to}
      sx={{
        color: 'var(--color-nav-link)',
        letterSpacing: 'var(--letter-spacing-sm)',
      }}
      startIcon={navigate.icon}
      {...animation}
    >
      {navigate.name}
    </Button>
  );
};

export default NavigateItem;
