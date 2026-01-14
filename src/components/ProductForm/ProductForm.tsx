import {
  Box,
  TextField,
  type CSSObject,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { motion, type MotionNodeOptions } from 'framer-motion';
import React, { useState } from 'react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import type IProductMutation from '../../types/products/productMutation';
import axiosApi from '../../api/axiosApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UseProductTypes from '../../hooks/UseProductTypes';
import type IAsideNav from '../../types/aside/asideNav';

interface IProductFormProps {
  id?: string;
  initialValueForm?: IProductMutation;
}

const ProductForm: React.FC<IProductFormProps> = ({
  id,
  initialValueForm = {
    name: '',
    description: '',
    type: '',
    image: '',
    price: 0,
  },
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<IProductMutation>(initialValueForm);
  const { typesProduct } = UseProductTypes();

  const MotionButton = motion.create(Button);
  const navigate = useNavigate();

  const inputStyle: CSSObject = {
    backgroundColor: 'var(--color-bg-input)',
    border: 'none',
    borderRadius: 'none',
  };

  let styleBox: CSSObject = {
    width: '100%',
    backgroundColor: 'inherit',
    border: '1px solid var(--color-card-border)',
    padding: '1.5rem',
    textTransform: 'uppercase',
  };

  const animationButton: MotionNodeOptions = {
    initial: {
      scale: 1,
      border: '1px solid var(--color-border-button)',
      color: 'var(--color-text-button)',
      backgroundColor: 'var(--color-bg-button)',
    },
    whileHover: {
      scale: 0.95,
    },
  };

  if (!id) {
    styleBox = {
      ...styleBox,
      width: '700px',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  const onChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ): void => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      setLoading(true);
      if (id) {
        await axiosApi.put(`/products/${id}.json`, form);
        toast.success('Product updated');
      } else {
        await axiosApi.post('/products.json', {
          ...form,
          price: Number(form.price),
        });
        toast.success('Product created');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    setForm({
      name: '',
      description: '',
      type: '',
      image: '',
      price: 0,
    });

    navigate('/');
  };

  return (
    <>
      <Box sx={{ ...styleBox }}>
        {!id && (
          <>
            <Typography
              textAlign={'center'}
              sx={{
                fontSize: '1rem',
                letterSpacing: 'var(--letter-spacing-sm)',
                border: '1px solid var(--color-border-text)',
                color: 'var(--color-text-600)',
                paddingY: '5px',
                marginBottom: '10px',
                textTransform: 'uppercase',
              }}
            >
              {!id && 'New Product!'}
            </Typography>
          </>
        )}
        <form onSubmit={onSubmit}>
          <Box
            width={'100%'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <TextField
              onChange={onChange}
              id="outlined-basic"
              label="Name"
              name="name"
              type="text"
              value={form.name}
              variant="outlined"
              color="success"
              sx={{ ...inputStyle }}
              disabled={loading}
              required
            />

            <TextField
              onChange={onChange}
              id="outlined-basic"
              label="Description"
              name="description"
              type="text"
              value={form.description}
              variant="outlined"
              color="success"
              sx={{ ...inputStyle }}
              disabled={loading}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Type"
                name="type"
                onChange={onChange}
                defaultValue={form.type}
                required
              >
                {typesProduct.map(
                  (type: IAsideNav) =>
                    type.id !== 'all' && (
                      <MenuItem key={type.id} value={type.id}>
                        {type.title}
                      </MenuItem>
                    )
                )}
              </Select>
            </FormControl>

            <TextField
              onChange={onChange}
              id="outlined-basic"
              label="Image"
              name="image"
              type="text"
              value={form.image}
              variant="outlined"
              color="success"
              sx={{ ...inputStyle }}
              disabled={loading}
            />

            <TextField
              onChange={onChange}
              id="outlined-basic"
              label="Price"
              name="price"
              type="number"
              value={form.price}
              variant="outlined"
              color="success"
              sx={{ ...inputStyle }}
              disabled={loading}
              required
            />

            <MotionButton
              fullWidth
              loading={loading}
              loadingPosition="start"
              sx={{
                padding: '10px',
                borderRadius: 0,
              }}
              type="submit"
              {...animationButton}
              endIcon={!loading && <EmojiEmotionsIcon />}
              disabled={loading}
            >
              {!loading ? (id ? 'Update' : 'New Product!') : ''}
            </MotionButton>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ProductForm;
