import React from 'react';
import Image from 'next/image';

const MarketPlacePromotion = () => (
    <div className="ps-promotions">
        <div className="container">
            <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                    <a className="ps-collection">
                        <img src="/static/img/promotions/home-3-1.jpg" alt="martfury" width="200" height="200"/>
                    </a>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                    <a className="ps-collection">
                        <img src="/static/img/promotions/home-3-2.jpg" alt="martfury" width="200" height="200"/>
                    </a>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                    <a className="ps-collection">
                        <img src="/static/img/promotions/home-3-3.jpg" alt="martfury" width="200" height="200"/>
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default MarketPlacePromotion;
