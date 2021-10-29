import React, {Component} from 'react';
import Cart from "../helpers/Cart";
import PRODUCTS from "../data/products.json";
import Events from "../helpers/Events";

class TotalPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: '',
            total: 0,
            subTotal: 0
        }
    }

    componentDidMount() {
        this.handleCartChange();
        Events.on('cartChange', this.handleCartChange)
    }

    componentWillUnmount() {
        Events.remove('cartChange', this.handleCartChange)
    }

    handleCartChange = () => {
        const cart = Cart.get();
        const products = [], subTotal = [], total = [];
        cart.forEach(el => {
            products.push([PRODUCTS.find(p => p.id === el.id), el.qty])
        })
        products.forEach(el => {
            total.push((+el[0].salePrice || +el[0].price) * +el[1]);
            subTotal.push(+el[0].price * +el[1]);
        })
        this.setState({total: this.sum(total), subTotal: this.sum(subTotal)});
    }
    
    sum = (arr) => {
        let x = 0;
        arr.forEach(el => {x += el});
        return x.toFixed(2);
    }


    render() {
        const { total, subTotal } = this.state;
        return (
            <div className="col-lg-6">
                <div className="shoping__checkout">
                    <h5>Cart Total</h5>
                    <ul>
                        <li>Subtotal <span>${subTotal}</span></li>
                        <li>Total <span>${total}</span></li>
                        <li>You save <span>${(subTotal - total).toFixed(2)}</span></li>
                    </ul>
                    <a href="https://fb.com" className="primary-btn">PROCEED TO CHECKOUT</a>
                </div>
            </div>
        );
    }
}

export default TotalPrice;