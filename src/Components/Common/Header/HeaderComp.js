import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const logout = (history) => {
  // localstorage clear
  localStorage.clear();
  history.push('/');
  // navigate to Home page
};

const Header = (props) => {
  let content = props.isLoggedIn ? (
    <ul class='nav nav-tabs bg-dark'>
      <li class='nav-item'>
        <Link className='nav-link' style={{ color: 'white' }} to='/'>
          <i class='bi bi-house-door' /> Home
        </Link>
      </li>
      <li class='nav-item'>
        <Link className='nav-link' style={{ color: 'white' }} to='/login'>
          Cart
        </Link>
      </li>
      <li class='nav-item'>
        <Link className='nav-link' style={{ color: 'white' }} to='/register'>
          Dashboard
        </Link>
      </li>
      <li class='nav-item'>
        <Link className='nav-link' style={{ color: 'white' }} to='/about'>
          About
        </Link>
      </li>

      <li class='nav-item dropdown float-end'>
        <Link
          className='nav-link dropdown-toggle'
          data-bs-toggle='dropdown'
          role='button'
          aria-expanded='false'
          style={{ color: 'white' }}
        >
          <i class='bi bi-gear' /> Settings
        </Link>
        <ul class='dropdown-menu '>
          <li>
            <Link className='dropdown-item'>
              <i class='bi bi-person-circle' /> Username
            </Link>
          </li>
          <li>
            <li>
              <Link className='dropdown-item'>
                <i class='bi bi-box-arrow-right' /> Logout
              </Link>
            </li>
          </li>
        </ul>
      </li>
    </ul>
  ) : (
    <ul class='nav nav-tabs bg-dark'>
      <li class='nav-item'>
        <Link className='nav-link' style={{ color: 'white' }} to='/'>
          <i class='bi bi-house-door' /> Home
        </Link>
      </li>
      <li class='nav-item'>
        <Link className='nav-link' style={{ color: 'white' }} to='/login'>
          Login
        </Link>
      </li>
      <li class='nav-item'>
        <Link className='nav-link' style={{ color: 'white' }} to='/register'>
          Register
        </Link>
      </li>
      <li class='nav-item'>
        <Link className='nav-link' style={{ color: 'white' }} to='/about'>
          About
        </Link>
      </li>
    </ul>
  );
  return <div>{content}</div>;
};

export default withRouter(Header);
