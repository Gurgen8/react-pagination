import React, { Component } from 'react';
import Wrapper from "../components/Wrapper";
import TotalPrice from "../components/TotalPrice";
import Cart from "../helpers/Cart";
import PRODUCTS from "../data/products.json";
import Events from "../helpers/Events";
import ChangeCartQty from "../components/ChangeCartQty";
import { Link } from "react-router-dom";
import HeaderButton from "../components/HeaderButton";
import { Helmet } from "react-helmet";
import Select from "react-select";
import SelectAsync from "react-select/async";
import CreatableSelect from 'react-select/creatable';
import axios from "axios";

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: Cart.get(),
      bodyClass: '',
      selectVal: 'apple',
    }
  }

  componentDidMount() {
    Events.on('cartChange', this.handleCartChange)
  }

  componentWillUnmount() {
    Events.remove('cartChange', this.handleCartChange)
  }

  handleCartChange = () => {
    this.setState({ cart: Cart.get() })
  }

  deleteProduct = (productId) => {
    Cart.delete(productId)
  }
  changeBodyClass = () => {
    this.setState({
      bodyClass: 'test_' + Math.random(),
    })
  }

  handleChange = (value) => {
    this.setState({ selectVal: value })
  }

  loadOptions = async (val) => {
    console.log(val);
    const { data } = await axios.get('http://localhost:5000/http://suggestqueries.google.com/complete/search', {
      params: {
        client: 'firefox',
        ds: 'yt',
        q: val || 'apple',
      }
    })
    console.log(data[1])

    return data[1];
  }

  render() {
    const { cart, bodyClass, selectVal } = this.state;
    const options = [
      { value: 'a', label: 'A', id: 12312312 },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
    ]
    return (
      <Wrapper>
        <HeaderButton cart={cart} />
        <Helmet>
          <title>Cart page</title>
          <body className={bodyClass} />
          <html className={bodyClass} />
        </Helmet>
        <select value={selectVal} onChange={this.handleChange} style={{ width: 300 }} name="" id="">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>
        <SelectAsync
          classNamePrefix="select"
          defaultOptions
          getOptionValue={o => o}
          getOptionLabel={o => o}
          value={[selectVal]}
          onChange={this.handleChange}
          loadOptions={this.loadOptions}
        />

        <button onClick={this.changeBodyClass}>toggle Body class</button>
        <section className="shoping-cart spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="shoping__cart__table">
                  <table>
                    <thead>
                      <tr>
                        <th style={{overflow: 'hidden'}} className="shoping__product">
                          <CreatableSelect
                            classNamePrefix="select"
                            options={options}
                              value={options.find(o => o.value === selectVal)}
                            onChange={(v) => this.handleChange(v.value)}
                          />
                        </th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map(item => {
                        const product = PRODUCTS.find(p => p.id === item.id);
                        if (!product) {
                          return null;
                        }
                        return (
                          <tr key={product.id}>
                            <td className="shoping__cart__item">
                              <Link to={`/product/${product.id}`}>
                                <img
                                  width={100}
                                  height={100}
                                  src={product.images[0]}
                                  alt="" />
                                <h5>{product.name}</h5>
                              </Link>
                            </td>
                            <td className="shoping__cart__price">
                              {product.salePrice ? (
                                  <>
                                    ${product.salePrice} <br />
                                    <span className="small__price">(${product.price})</span>
                                  </>
                                ) :
                                <>
                                  ${product.price}
                                </>
                              }
                            </td>
                            <td className="shoping__cart__quantity">
                              <ChangeCartQty id={item.id} qty={item.qty} />
                            </td>
                            <td className="shoping__cart__total">
                              {product.salePrice ? (
                                  <>
                                    ${(product.salePrice * item.qty).toFixed(2)} <br />
                                    <span className="small__price">(${(product.price * item.qty).toFixed(2)})</span>
                                  </>
                                ) :
                                <>
                                  ${product.price * item.qty}
                                </>
                              }
                            </td>
                            <td className="shoping__cart__item__close">
                              <i onClick={() => this.deleteProduct(item.id)} className="fa fa-trash"
                                 style={{ cursor: 'pointer', fontSize: 22 }} />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row">

              <div className="col-lg-6">
                <div className="shoping__continue">
                  <div className="shoping__discount">
                    <h5>Discount Codes</h5>
                    <form action="#">
                      <input type="text" placeholder="Enter your coupon code" />
                      <button type="submit" className="site-btn">APPLY COUPON</button>
                    </form>
                  </div>
                </div>
              </div>
              <TotalPrice />
            </div>
          </div>
        </section>
      </Wrapper>
    );
  }
}

export default CartPage;
