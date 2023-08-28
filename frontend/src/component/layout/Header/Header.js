import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
import { MdAccountCircle } from 'react-icons/md'
import { MdSearch } from 'react-icons/md'
import { MdAddShoppingCart } from 'react-icons/md'
import logo from '../../../images/logo.png'

const options = {
  burgerColorHover: '#176b87',
  logo,
  logoWidth: '20vmax',
  navColor1: 'white',
  logoHoverSize: '10px',
  logoHoverColor: '#176b87',
  link1Text: 'Home',
  link2Text: 'Products',
  link3Text: 'Contact',
  link4Text: 'About',
  link1Url: '/',
  link2Url: '/products',
  link3Url: '/contact',
  link4Url: '/about',
  link1Size: '1.3vmax',
  link1Color: '#176b87',
  nav1justifyContent: 'flex-end',
  nav2justifyContent: 'flex-end',
  nav3justifyContent: 'flex-start',
  nav4justifyContent: 'flex-start',
  link1ColorHover: '#001c30',
  link1Margin: '1vmax',
  profileIcon: true,
  profileIconColor: '#176b87',
  ProfileIconElement: MdAccountCircle,
  profileIconUrl: '/login',
  searchIcon: true,
  searchIconColor: '#176b87',
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: '#176b87',
  CartIconElement: MdAddShoppingCart,
  profileIconColorHover: '#001c30',
  searchIconColorHover: '#001c30',
  cartIconColorHover: '#001c30',
  cartIconMargin: '2vmax',
}

const Header = () => {
  return <ReactNavbar {...options} />
}

export default Header
