import React from 'react';
import Slider from 'react-slick';
import NextArrow from '/components/elements/carousel/NextArrow';
import PrevArrow from '/components/elements/carousel/PrevArrow';
import Image from 'next/image';

const MarketPlaceHomeBanner = () => {
    const carouselSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="">
            <div className="ps-container">
                <section className="ps-home-banner">
                    <Slider {...carouselSettings} className="ps-carousel">
                        <div
                            className="ps-banner--market-1"
                            style={{
                                backgroundImage: `url(/static/img/slider/andes/Elite-slider-principal_v1.jpg)`,
                            }}>
                            <img
                                src="/static/img/slider/andes/Elite-slider-principal_v1.jpg"
                                alt="martfury"
                            />
                        </div>
                        <div
                            className="ps-banner--market-1"
                            style={{
                                backgroundImage: `url(/static/img/slider/andes/Scott-slider-principal_v1.jpg)`,
                            }}>
                            <img
                                src="/static/img/slider/andes/Scott-slider-principal_v1.jpg"
                                alt="martfury"
                            />
                        </div>
                        <div
                            className="ps-banner--market-1"
                            style={{
                                backgroundImage: `url(/static/img/slider/andes/pro-slider-principal_v1.jpg)`,
                            }}>
                            <img
                                src="/static/img/slider/andes/pro-slider-principal_v1.jpg"
                                alt="martfury"
                            />
                        </div>
                        <div
                            className="ps-banner--market-1"
                            style={{
                                backgroundImage: `url(/static/img/slider/andes/Super-b-slider-principal.jpg)`,
                            }}>
                            <img
                                src="/static/img/slider/andes/Super-b-slider-principal.jpg"
                                alt="martfury"
                            />
                        </div>
                        <div
                            className="ps-banner--market-1"
                            style={{
                                backgroundImage: `url(/static/img/slider/andes/VISION-slider-principal.jpg)`,
                            }}>
                            <img
                                src="/static/img/slider/andes/VISION-slider-principal.jpg"
                                alt="martfury"
                            />
                        </div>
                    </Slider>
                </section>
            </div>
        </div>
    );
};

export default MarketPlaceHomeBanner;
