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

    const verifyPayment = async () => {
        try {

            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } })

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

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <main className="verify-page" aria-live="polite">
            <section className="verify-card" aria-labelledby="verify-title">
                <p className="verify-overline">PAYMENT CHECK / 01</p>
                <div className="verify-loader" aria-hidden="true">
                    <span />
                </div>
                <h1 id="verify-title">Confirming <em>your order.</em></h1>
                <p className="verify-description">
                    We’re checking your payment details. Please keep this page open for a moment.
                </p>
                <div className="verify-status">
                    <span>PAYMENT STATUS</span>
                    <strong><i /> IN PROGRESS</strong>
                </div>
                <p className="verify-note">YOUR FOREVER EDIT IS ALMOST READY</p>
            </section>
        </main>
    )
}

export default Verify