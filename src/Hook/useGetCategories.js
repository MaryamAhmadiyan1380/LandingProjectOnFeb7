import { apiGetCategories } from '../Api/apiCategories';
import { useMutation } from 'react-query';

const useGetCategories = () => {
  return useMutation({
    mutationFn: apiGetCategories, 
  });
};

export default useGetCategories;
