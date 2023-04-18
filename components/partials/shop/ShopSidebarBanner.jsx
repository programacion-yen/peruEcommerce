import React, { Component } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { carouselSingle } from '/utils/carousel-helpers';
import Image from 'next/image';

class ShopSidebarBanner extends Component {
    render() {
        return (
            <div className="ps-shop-banner">
                <Slider {...carouselSingle} className="ps-carousel blur">
                    <div className="item">
                        <img src="https://www.andesindustrial.cl/uploads/slider/02122021175538.jpg" alt=""/>
                        {/* <Link href="/shop">
                            <Image
                                src="/static/img/slider/shop-sidebar/1.jpg"
                                alt="martfury"
                                width="200" height="200"
                            />
                        </Link> */}
                    </div>
                    <div className="item">
                        <img src="https://www.andesindustrial.cl/uploads/slider/15112021170041.jpg" alt=""/>
                        {/* <Link href="/shop">
                            <Image
                                src="/static/img/slider/shop-sidebar/2.jpg"
                                alt="martfury"
                                width="200" height="200"
                            />
                        </Link> */}
                    </div>
                </Slider>
            </div>
        );
    }
}

export default ShopSidebarBanner;
