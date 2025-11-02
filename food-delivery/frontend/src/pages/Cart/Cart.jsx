import React, { useContext } from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {

    const { foodList, cartItems, removeFromCart, updateFromCart, getTotalCartAmount, url } = useContext(StoreContext);
    const navigate = useNavigate()

    return (
        <div className='cart'>
            <div className='cart-items'>
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Qty</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {
                    foodList.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div key={index}>
                                    <div className='cart-items-title cart-items-item'>
                                        <img src={url + "/images/" + item.image} alt={item.name} />
                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p><input onChange={(e) => updateFromCart(item._id, e.target.value)} style={{ padding: '3px', width: '70px' }} type="number" min={1} value={cartItems[item._id]} /></p>
                                        <p>${Number(item.price) * Number(cartItems[item._id])}</p>
                                        <p style={{ cursor: 'pointer' }} onClick={() => removeFromCart(item._id)}>x</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })
                }
            </div>

            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCESS TO CHECKOUT</button>
                </div>
                <div className='cart-promocode'>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, veritatis?</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='Promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart