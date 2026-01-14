import { useCallback, useEffect, useState } from 'react';
import type IAsideNav from '../types/aside/asideNav';
import axiosApi from '../api/axiosApi';
import type IProductTypeApi from '../types/products/productTypeApi';

const UseProductTypes = () => {
  const [types, setTypes] = useState<IAsideNav[]>([]);

  const getProductTypes = useCallback(async (): Promise<void> => {
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

      setTypes(rebuiltProductTypes);
    }
  }, []);

  useEffect(() => {
    void getProductTypes();
  }, [getProductTypes]);

  return {
    types,
  };
};

export default UseProductTypes;
