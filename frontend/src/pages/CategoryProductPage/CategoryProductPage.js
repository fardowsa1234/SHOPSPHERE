import React, { useEffect } from 'react';
import "./CategoryProductPage.scss";
import ProductList from "../../components/ProductList/ProductList";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProductsByCategory, fetchAsyncProductsOfCategory, getCategoryProductsStatus } from '../../store/categorySlice';
import Loader from '../../components/Loader/Loader';
import { STATUS } from '../../utils/status';

const CategoryProductPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryProducts = useSelector(getAllProductsByCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    console.log('Category:', category);
    dispatch(fetchAsyncProductsOfCategory(category));
  }, [dispatch, category]);

  console.log('categoryProducts:', categoryProducts);
  console.log('categoryProductsStatus:', categoryProductsStatus);

  return (
    <div className='cat-products py-5 bg-whitesmoke'>
      <div className='container'>
        <div className='cat-products-content'>
          <div className='title-md'>
            <h3>See our <span className='text-capitalize'>{category.replace("-", " ")}</span></h3>
          </div>

          {
            categoryProductsStatus === STATUS.LOADING ? <Loader /> :
            categoryProductsStatus === STATUS.ERROR ? <p>Error loading products. Please try again later.</p> :
            categoryProducts && categoryProducts.length > 0 ? <ProductList products={categoryProducts} /> :
            <p>No products found in this category.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryProductPage;