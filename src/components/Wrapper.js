import React, { Component } from 'react';
import Headers from './Headers';
import Footer from "./Footer";
import { Helmet } from "react-helmet";


class Wrapper extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Shop</title>
        </Helmet>
        <Headers />

        {this.props.children}
        <Footer />
      </>
    );
  }
}

export default Wrapper;
