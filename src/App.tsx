import { Box } from '@mui/material';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './containers/Home/Home';
import Add from './containers/Add/Add';
import NotFound from './containers/NotFound/NotFound';

const App = () => {
  return (
    <>
      <Box
        sx={{
          maxWidth: 'var(--app-width)',
          width: 'var(--app-width)',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/products"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/products/add"
            element={
              <Layout>
                <Add />
              </Layout>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
