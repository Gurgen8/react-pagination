import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
    constructor(props) {
        super(props);
        const { product } = this.props;
        this.state = {
            single: product.images[0]
        }
    }

    handleClick = (ev) => {
        this.setState({single: ev.target.src})
    }


    render() {
        const { product } = this.props;
        const { single } = this.state;
        let key = 0;
        const settings = {
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4
        };
        return (
            <div>
                <img src={single} alt="0" className="single__img"/>
                <Slider {...settings}>
                    {product.images.map(i => (
                        <div key={key++} className="slider__img__wrapper" onClick={this.handleClick}>
                            <img src={i} alt="sliderImg" className="slider__img"/>
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}