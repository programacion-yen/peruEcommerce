import React, { Component } from 'react';
import Slider from 'react-slick';
import NextArrow from '../../../elements/carousel/NextArrow';
import PrevArrow from '../../../elements/carousel/PrevArrow';
import ProductOnCart from '/components/elements/products/ProductOnCart';
import { carouselStandard } from '/utils/carousel-helpers';
import ProductSimple from '/components/elements/products/ProductSimple';

export default function RecommendItems({product}) {

    const carouselStandard = {
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 500,
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };
    let productItemsView;

    if (product && product.length > 0) {
        product.map((item, key) => {
            productItemsView =item.productosMasVistos.map(dato => {
                return <div className="productoCarruselRecomendado" key={key}>
                    <ProductOnCart product={dato} key={dato.id}/>
                </div>
            })
        })
    }
    return (
        <div className="ps-block--shop-features ps-container">
            <div className="ps-block__header">
                <h3>Productos recomendados</h3>
            </div>
            <div className="ps-block__content">
                {product && product.length > 0 ? (
                    <Slider
                        {...carouselStandard}
                        arrows={true}
                        className="ps-carousel outside">
                        {productItemsView}
                    </Slider>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}