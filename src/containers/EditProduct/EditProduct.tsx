import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../../api/axiosApi';
import type IProductMutation from '../../types/products/productMutation';
import ProductForm from '../../components/ProductForm/ProductForm';
import Loading from '../../UI/Loading/Loading';

const EditProduct = () => {
  const params = useParams<{ idProduct: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<IProductMutation | null>(null);

  const getProduct = useCallback(async (id: string) => {
    try {
      setLoading(true);

      const response = await axiosApi.get<IProductMutation>(`/products/${id}.json`);
      const postData = response.data;
      if (postData) setPost(postData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (params.idProduct) {
      void getProduct(params.idProduct);
    }
  }, [params.idProduct, getProduct]);

  let page: React.ReactNode = post && (
    <ProductForm id={params.idProduct} initialValueForm={post} />
  );

  if (loading) {
    page = <Loading />;
  }

  return <>{page}</>;
};

export default EditProduct;
