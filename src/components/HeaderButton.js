import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class HeaderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: null
    }
  }

  componentDidMount() {
    this.setState({
      element: document.querySelector('.header__top__left')
    })
  }


  render() {
    const { element } = this.state;
    if (!element) {
      return null;
    }
    return ReactDOM.createPortal((
      <div>
        <button>hello {this.props.cart.length}</button>
      </div>
    ), element)
  }
}

export default HeaderButton;
