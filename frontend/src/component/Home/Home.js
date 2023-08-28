import React from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import MetaData from '../layout/metaData'
import { useEffect } from 'react'
import { clearErrors, getProduct } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import ProductCart from './ProductCart'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector((state) => state.products)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  }, [dispatch, error, alert])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Home" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div id="container" className="container">
            {products &&
              products.map((product) => <ProductCart product={product} />)}
          </div>
        </>
      )}
    </>
  )
}

export default Home
