import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { authcontext } from '../../Context/AuthContext';
import { DarkModeContext } from '../../Context/DarkModeContext'; 
import logo from '../../../public/ecommerce.png'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);  
  const { IsLoggedIn, setIsLoggedIn } = useContext(authcontext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext); 

  const menuItems = [
    "Home",
    "Categories",
    // "Brands",
    "Cart",
    "WhishList",
    "allorders"
  ];

  function logOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Navbar className='container' isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="lg:hidden" />
        <NavbarBrand>
          <NavLink to="/" className="flex items-center">
            <img src={logo} className='h-8' alt="Logo" />
            <p className="font-bold text-inherit">Fresh Cart</p>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      {IsLoggedIn && (
        <NavbarContent className="hidden lg:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <NavLink
                to={item === "Home" ? "/" : "/" + item}
                className={({ isActive }) =>
                  isActive ? "text-rgb(15 23 42 / var(--tw-bg-opacity, 1)) font-bold pb-1" : "text-gray-800 dark:text-gray-300"
                }
              >
                {item}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      {
        IsLoggedIn ? (
          <NavbarContent justify="end">
            <NavbarItem>
              <Button onPress={logOut} type='button' color='danger' variant='flat'>
                Sign Out
              </Button>
            </NavbarItem>
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem>
            <NavLink 
              to="/login" 
              className="text-gray-800 dark:text-white hover:text-primary-500 dark:hover:text-primary-500 
                        bg-gray-200 dark:bg-gray-700 hover:bg-primary-200 dark:hover:bg-primary-100 
                        px-3 py-2 rounded-lg inline-block transition-all duration-300 ease-in-out"
            >
              Login
            </NavLink>
            </NavbarItem>
            <NavbarItem>
            <NavLink 
              to="/register" 
              className="text-gray-800 dark:text-white hover:text-primary-500 dark:hover:text-primary-500 
                        bg-gray-200 dark:bg-gray-700 hover:bg-primary-200 dark:hover:bg-primary-100 
                        px-3 py-2 rounded-lg inline-block transition-all duration-300 ease-in-out"
            >
              Sign Up
            </NavLink>
            </NavbarItem>
          </NavbarContent>
        )
      }

      {IsLoggedIn && (
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index} onClick={() => setIsMenuOpen(false)}>
              <NavLink
                to={item === "Home" ? "/" : "/" + item}
                className={({ isActive }) =>
                  isActive ? "text-rgb(15 23 42 / var(--tw-bg-opacity, 1)) font-bold pb-1" : "text-gray-800 dark:text-gray-300"
                }
              >
                {item}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}

      <NavbarContent justify="center">
        <NavbarItem>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
