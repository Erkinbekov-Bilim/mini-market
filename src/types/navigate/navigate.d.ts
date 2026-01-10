import type { ReactNode } from 'react';

interface INavigate {
  to: string;
  name: string;
  icon?: ReactNode | string;
}

export default INavigate;
