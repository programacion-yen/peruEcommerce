import React, { Component } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import NextArrow from '/components/elements/carousel/NextArrow';
import PrevArrow from '/components/elements/carousel/PrevArrow';
import Image from 'next/image';

const MartketPlace2Banner = () => {
    const carouselSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        cssEase: "linear"
    };

    return (
        <section className="ps-home-banner">
            <div className="">
                <div className="ps-section__left">
                    <Slider {...carouselSettings} className="ps-carousel">
                        <div className="item">
                            
                                <a>
                                    <img
                                        src="/static/img/slider/andes/banner-scott-mtb-aspect.png"
                                        alt="martfury"
                                    />
                                </a>
                            
                        </div>

                        <div className="item">
                            
                                <a>
                                    <img
                                        src="/static/img/slider/andes/banner-scott-mtb-addict-v2.png"
                                        alt="martfury"
                                    />
                                </a>
                            
                        </div>

                        <div className="item">
                            
                                <a>
                                    <img
                                        src="/static/img/slider/andes/banner-scott-mtb-scale-v2.png"
                                        alt="martfury"
                                    />
                                </a>
                            
                        </div>
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default MartketPlace2Banner;
