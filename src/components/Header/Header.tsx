import type INavigate from '../../types/navigate/navigate';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ArticleIcon from '@mui/icons-material/Article';
import { AppBar } from '@mui/material';
import NavBar from '../../UI/NavBar/NavBar';

const Header = () => {
  const navigates: INavigate[] = [
    {
      to: '/',
      name: 'products',
      icon: <ShoppingBasketIcon />,
    },
    {
      to: '/products/add',
      name: 'add new products',
      icon: <ArticleIcon />,
    },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        maxWidth: 'var(--app-width)',
        width: 'var(--app-width)',
        bgcolor: 'var(--color-nav-bg)',
        textTransform: 'uppercase',
        boxShadow: 'none',
      }}
    >
      <NavBar navigates={navigates} />
    </AppBar>
  );
};

export default Header;
