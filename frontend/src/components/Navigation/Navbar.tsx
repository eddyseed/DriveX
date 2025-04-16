import React, { useEffect, useState } from 'react';
import styles from '../../assets/styles/Components/Navbar.module.scss';
import Button from '../UI/atoms/Button';

import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LoginIcon from '@mui/icons-material/Login';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { useMenu } from '../../context/MenuContext';
import { useColorContext } from '../../context/ColorContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router';
import axios, { AxiosError } from 'axios';
import InputField from '../UI/atoms/InputField';

const Navbar: React.FC = () => {
  const { isMenuOpen, toggleMenu, navbarHeight } = useMenu();
  const { colors } = useColorContext();
  const { secondary, darkSecondary } = colors.variants;

  const { user, isAuthenticated } = useAuth();
  const [searchText, setSearchText] = useState('');


  return (
    <nav className={styles.NAVBAR}>
      <div className={styles.NAV_SEC_1}>

        <div className="group-1">
          <section className="logo">
            <Link to="/" className='bungee-tint-regular text-3xl'>DriveX</Link>
          </section>
        </div>

        <div className="group-2">
          <section className="">
            <InputField
              value={searchText}
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for latest hybrid cars..."
              name={''} />
            <Button variant='primary' to='/' colors={darkSecondary}>
              <SearchIcon />
            </Button>
          </section>
        </div>

        <div className="group-3">
          <div className="div-1 space-x-2 pr-2">
            <Button to="/cart" variant="primary" colors={darkSecondary}>
              <ShoppingCartRoundedIcon />
            </Button>

            {isAuthenticated ? (
              <>
                <Button
                  title="Go to Profile"
                  colors={darkSecondary}
                  text={user?.name.split(' ')[0] || "Profile"}
                >
                  <LoginIcon />
                </Button>

              </>
            ) : (
              <Button
                to="/user/login"
                title="Login/SignUp"
                colors={darkSecondary}
                text="Sign In"
              >
                <LoginIcon />
              </Button>
            )}
          </div>
          <div className="div-2">
            <Button colors={darkSecondary} onClick={toggleMenu}>
              {isMenuOpen ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
            </Button>
          </div>
        </div>

      </div>

      <div className={`${styles.NAV_SEC_2} montserrat-ff`} style={{ height: navbarHeight }}>
        <div className="div-1 flex items-center space-x-6 px-12">
          <Link to="/user/dashboard">My Dashboard</Link>
          <Link to="/user/dashboard">Categories</Link>
          <Link to="/user/dashboard">EMI Calculator</Link>
          <Link to="/cars/sell">Sell My Car</Link>
          <Link to="/user/dashboard">Contact Us</Link>
        </div>
        <div className="div-2 flex items-center justify-end px-4">
          {<LocationOnIcon/>}
          {/* {location.city ? `${location.city}, ${location.region}, ${location.country}` : "Detecting location..."} */}
          Delhi, India
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
