import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUserSelector } from '../../redux/auth/auth.slice';
import useActions from '../../redux/hooks/useActions';
import './profile.css';

const ProfilePage = () => {
  const user = useAuthUserSelector();
  // console.log(user.user)
  const { logout } = useActions();
  const navigate = useNavigate();

  if (!user) return <p>user not found</p>;

  const logoutHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    logout();
    navigate('/');
  };

  const {
    name,email
  } = user?.user[0];

  return (
    <div className='profile'>
      <div className='profile-header'>
        {/* <div className='profile-pic'>
          <img src={image} alt='' />
        </div> */}
        <div className='profile-info'>
          <h2>{`${name}`}</h2>
          <p>{email}</p>
        </div>
      </div>
      <div className='profile-details'>
        <ul>
          {/* <li>
            <strong>Age:</strong> {age}
          </li>
          <li>
            <strong>Birth Date:</strong> {birthDate}
          </li>
          <li>
            <strong>Phone:</strong> {phone}
          </li>
          <li>
            <strong>City:</strong> {city}
          </li>
          <li>
            <strong>University:</strong> {university}
          </li> */}
        </ul>
      </div>
      <button
        type='button'
        className='logout-btn'
        onClick={logoutHandler}
        onKeyPress={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
