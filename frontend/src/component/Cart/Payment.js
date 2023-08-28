import './Payment.css'
import { useState, useEffect, useRef } from 'react'
import CheckoutSteps from '../Cart/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/metaData'
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import EventIcon from '@material-ui/icons/Event'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import Loader from '../layout/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { createOrder, clearErrors } from '../../actions/orderAction'

const Payment = () => {
  const [stripeApiKey, setStripeApiKey] = useState('')
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  const payBtn = useRef(null)
  const alert = useAlert()
  const stripe = useStripe()
  const elements = useElements()
  const history = useNavigate()
  const dispatch = useDispatch()

  const { cartItems, shippingInfo } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.newOrder)

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey')
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    getStripeApiKey()
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [error, dispatch, alert])

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  }

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    texPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    payBtn.current.disabled = true

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      )

      const client_secret = data.clientSecret

      if (!stripe || !elements) return

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      })

      if (result.error) {
        payBtn.current.disabled = false

        alert.error(result.error.message)
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }

          dispatch(createOrder(order))

          history('/success')
        } else {
          alert.error("There's some issue while processing payment")
        }
      }
    } catch (error) {
      payBtn.current.disabled = false
      alert.error(error.response.data.message)
    }
  }

  return (
    <>
      {stripeApiKey ? (
        <>
          <MetaData title="Payment" />
          <CheckoutSteps activeStep={2} />
          <div className="paymentContainer">
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
              <Typography>Card Info</Typography>
              <div>
                <CreditCardIcon />
                <CardNumberElement className="paymentInput" />
              </div>
              <div>
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
              </div>
              <div>
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput" />
              </div>
              <input
                type="submit"
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className="paymentFormBtn"
              />
            </form>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Payment
