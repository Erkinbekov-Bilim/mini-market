import { Box, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../api/axiosApi';
import type IProductApi from '../../types/products/productApi';
import type IProduct from '../../types/products/product';
import SideBar from '../../UI/SideBar/SideBar';
import type IProductTypeApi from '../../types/products/productTypeApi';
import type IAsideNav from '../../types/aside/asideNav';
import CardProduct from '../../components/Card/CardProduct';
import Loading from '../../UI/Loading/Loading';
import { Typography } from '@mui/material';

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [navigates, setNavigates] = useState<IAsideNav[]>([]);
  const [currentNav, setCurrentNav] = useState<string>('all');
  const [currentNavTitle, setCurrentNavTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getProductTypes = async (): Promise<void> => {
    const response = await axiosApi.get<IProductTypeApi | null>(
      'products-type.json'
    );
    const productTypesData = response.data;

    if (productTypesData) {
      const productTypeDataIDS: string[] = Object.keys(productTypesData);

      const rebuiltProductTypes: IAsideNav[] = productTypeDataIDS.map(
        (id: string) => {
          return {
            ...productTypesData[id],
          };
        }
      );

      setNavigates(rebuiltProductTypes);
    }
  };

  const getProducts = async (type: string): Promise<void> => {
    let response = await axiosApi.get<IProductApi | null>(
      type === 'all'
        ? '/products.json'
        : `/products.json?orderBy="type"&equalTo="${type}"`
    );
    const productsData = response.data;

    if (productsData) {
      const productDataIDS: string[] = Object.keys(productsData);

      const rebuiltProducts: IProduct[] = productDataIDS.map((id: string) => {
        return {
          ...productsData[id],
          id,
        };
      });

      setProducts(rebuiltProducts);
    }
  };

  const validateFetch = useCallback((type: string = 'all') => {
    try {
      setLoading(true);
      void getProducts(type);
      void getProductTypes();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void validateFetch(currentNav);
  }, [validateFetch, currentNav]);

  const getCurrentNav = (navigate: IAsideNav) => {
    setCurrentNav(navigate.id);
    setCurrentNavTitle(navigate.title);
  };

  let cardPage: React.ReactNode = (
    <>
      {products.length > 0 ? (
        products.map((product) => (
          <CardProduct product={product} key={product.id} />
        ))
      ) : (
        <Typography
          component={'p'}
          variant="h4"
          sx={{
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 'var(--letter-spacing-sm)',
          }}
        >
          No products found
        </Typography>
      )}
    </>
  );

  if (loading) {
    cardPage = <Loading />;
  }

  return (
    <Grid container spacing={3}>
      <Grid size={4}>
        <SideBar navigates={navigates} getCurrentNav={getCurrentNav}></SideBar>
      </Grid>
      <Grid size={8}>
        <Typography component={'p'} variant="body2">
          {currentNavTitle || 'All'}
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          {cardPage}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
