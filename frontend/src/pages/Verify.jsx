import { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const isCashOnDelivery = searchParams.get('method') === 'cod'

    useEffect(() => {
        if (isCashOnDelivery) {
            const redirectTimer = window.setTimeout(() => navigate('/orders'), 6000)
            return () => window.clearTimeout(redirectTimer)
        }

        const verifyPayment = async () => {
            try {
                if (!token) {
                    return
                }

                const response = await axios.post(
                    backendUrl + '/api/order/verifyStripe',
                    { success, orderId },
                    { headers: { token } },
                )

                if (response.data.success) {
                    setCartItems({})
                    navigate('/orders')
                } else {
                    navigate('/cart')
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

        verifyPayment()
    }, [backendUrl, isCashOnDelivery, navigate, orderId, setCartItems, success, token])

    return (
        <main className="verify-page" aria-live="polite">
            <section className="verify-card" aria-labelledby="verify-title">
                <p className="verify-overline">
                    {isCashOnDelivery ? 'ORDER CONFIRMATION / 01' : 'PAYMENT CHECK / 01'}
                </p>
                <div className="verify-loader" aria-hidden="true">
                    <span />
                </div>
                <h1 id="verify-title">
                    {isCashOnDelivery ? <>Order <em>confirmed.</em></> : <>Confirming <em>your order.</em></>}
                </h1>
                <p className="verify-description">
                    {isCashOnDelivery
                        ? 'Your order is placed with Cash on Delivery. Taking you to your orders in a moment.'
                        : 'We’re checking your payment details. Please keep this page open for a moment.'}
                </p>
                <div className="verify-status">
                    <span>{isCashOnDelivery ? 'ORDER STATUS' : 'PAYMENT STATUS'}</span>
                    <strong><i /> {isCashOnDelivery ? 'ORDER PLACED' : 'IN PROGRESS'}</strong>
                </div>
                <p className="verify-note">
                    {isCashOnDelivery ? 'YOUR FOREVER EDIT IS ON ITS WAY' : 'YOUR FOREVER EDIT IS ALMOST READY'}
                </p>
            </section>
        </main>
    )
}

export default Verify
