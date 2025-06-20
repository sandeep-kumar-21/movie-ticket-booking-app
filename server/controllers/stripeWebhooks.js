import stripe from 'stripe'
import Booking from '../models/Booking.js'



export const stripeWebhooks = async (req, res) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
    const sig = req.headers["stripe-signature"]
    
    let event;
    console.log('in stripe webhooks00');

    try{
        event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    }catch(error){
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }
    console.log('in stripe webhooks01');
    try {
        console.log('in stripe webhooks02');

        switch(event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id
                })

                const session = sessionList.data[0];
                const {bookingId} = session.metadata;
                console.log('in stripe webhooks03');


                await Booking.findByIdAndUpdate(bookingId,{isPaid: true, paymentLink: ""})
                console.log(bookingId);
                break;
            }
                
            
            default:
                console.log('Unhandled event type:', event.type)
                break;    
        }

        res.json({received: true})
        console.log('in stripe webhooks04');

    } catch (error) {
        console.error('Webhook processing error:', error)
        res.status(500).send("Internal Server Error")
    }
}