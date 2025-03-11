import { FC } from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { IProduct } from '../../../redux/products/product.types';
import AddToCartBtn from '../../cart/components/AddToCartBtn';

const ProductItem: FC<IProduct> = ({ id, name, price, rating, images }) => (
  <div className='product-item'>
    <div className='product-pic'>
      <Link to={`/products/${String(id)}`}>
        <img src={images[0]} alt={name} />
      </Link>
    </div>
    <div className='product-title'>
      <Link to={`/products/${String(id)}`}>{name}</Link>
    </div>
    <div className='product-price'>{price}$</div>
    <div className='product-info'>
      {/* <div className='product-rating'>
        <StarIcon />
        {rating}
      </div> */}
      <AddToCartBtn id={id}>Buy</AddToCartBtn>
    </div>
  </div>
);

export default ProductItem;
