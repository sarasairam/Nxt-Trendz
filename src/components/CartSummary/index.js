import {Component} from 'react'
import {Popup} from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

class CartSummary extends Component {
  state = {dis: false, valueHere: '0'}

  updateValue = event => {
    this.setState({valueHere: event.target.value})
  }

  updateDis = () => {
    this.setState(prevState => ({dis: !prevState.dis}))
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const {valueHere, dis} = this.state
          let total = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.price * eachCartItem.quantity
          })
          return (
            <>
              <div className="summaryContainer">
                <h1>
                  <span>Order Total:</span>
                  Rs {total}/-
                </h1>
                <p>{cartList.length} Items in cart</p>
                <div>
                  <Popup
                    modal
                    trigger={
                      <button type="button" className="trigger-button">
                        Checkout
                      </button>
                    }
                  >
                    <div className="popup-container">
                      <h1>
                        <span>Order Total:</span>
                        Rs {total}/-
                      </h1>
                      <p>{cartList.length} Items in cart</p>
                      <div>
                        <h1>Payment Method</h1>
                        <input id="1" type="radio" disabled />
                        <label htmlFor="1">Card</label>
                        <input id="2" type="radio" disabled />
                        <label htmlFor="2">Net Banking</label>
                        <input id="3" type="radio" disabled />
                        <label htmlFor="3">UPI</label>
                        <input id="4" type="radio" disabled />
                        <label htmlFor="4">Wallet</label>
                        <input
                          id="5"
                          type="radio"
                          value="5"
                          onChange={this.updateValue}
                        />
                        <label htmlFor="5">Cash on Delivery</label>
                      </div>
                      {valueHere === '5' ? (
                        <button type="button" onClick={this.updateDis}>
                          Confirm Order
                        </button>
                      ) : (
                        <button type="button" disabled onClick={this.updateDis}>
                          Confirm Order
                        </button>
                      )}
                      {dis === true ? (
                        <p>Your order has been placed successfully</p>
                      ) : null}
                    </div>
                  </Popup>
                </div>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
