import React from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import Image from 'next/image';


const ShopBanner =()=>  {
    const carouselSetting = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <div className="ps-shop-banner">
            <Slider {...carouselSetting} fade={true} className="ps-carousel">
                <img src="/static/img/slider/shop-default/1.jpg" alt="martfury" width="200" height="200"/>
                <img src="/static/img/slider/shop-default/2.jpg" alt="martfury" width="200" height="200"/>
            </Slider>
        </div>
    );
}

export default ShopBanner;
