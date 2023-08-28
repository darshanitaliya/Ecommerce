const catchAsyncError = require('../middleware/catchAsyncError')

const stripe = require('stripe')(
  'sk_test_51NexnBSGTp7gwQGHx4wtOdJEsH4GlV30flNrSigAeoF66euO6TQYOYivy8huSQyVodWjKyDqUeQM6ZzjbZl0yLu300b7HKHqd5'
)

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'inr',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      company: 'Ecommerce',
    },
  })

  res.status(200).json({ success: true, clientSecret: myPayment.client_secret })
})

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY })
})
