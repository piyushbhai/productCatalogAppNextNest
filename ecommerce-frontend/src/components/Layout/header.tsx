import { Link } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useCheckAuthenticated } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.svg';
import CartICon from '../../pages/cart/components/CartIcon';

const Header = () => {
  const { isAuthenticated } = useCheckAuthenticated();
  console.log(isAuthenticated)
  return (
    <header>
      <Link to='/' className='logo'>
        <img src={logo} height='40' alt='logo' />
      </Link>
      <div className='header-nav'>
        <Link to='/products/search'>
          <SearchIcon />
        </Link>
        <Link to='/cart'>
          <CartICon />
        </Link>
        {isAuthenticated && (
          <Link to='/profile'>
            <PersonOutlineOutlinedIcon />
          </Link>
        )}
        {!isAuthenticated && (
          <Link to='/login'>
            <button type='button'>Login</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
