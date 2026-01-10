import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import type IProduct from '../../types/products/product';
import CreateIcon from '@mui/icons-material/Create';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

interface ICardProduct {
  product: IProduct;
  deleteProduct?: (id: string) => void;
}

const CardProduct: React.FC<ICardProduct> = ({ product, deleteProduct }) => {
  const noneImage: string = '/src/assets/placeholders/no-image.png';

  return (
    <Card
      sx={{
        maxWidth: 250,
        width: 250,
        border: '1px solid var(--color-card-border)',
        boxShadow: 'none',
        borderRadius: '0',
      }}
    >
      <CardMedia
        sx={{ height: 140, objectFit: 'contain' }}
        image={product.image ? `${product.image}` : `${noneImage}`}
        title={product.name}
        component={'img'}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.price} KGS
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton component={NavLink} to={`products/${product.id}/edit`}>
          <CreateIcon />
        </IconButton>
        {deleteProduct && (
          <IconButton onClick={() => deleteProduct(product.id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default CardProduct;
