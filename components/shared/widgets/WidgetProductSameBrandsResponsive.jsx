import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import NextArrow from '../../elements/carousel/NextArrow';
import PrevArrow from '../../elements/carousel/PrevArrow';
// import { generateTempArray } from '/utils/common-helpers';
// import SkeletonProduct from '/components/elements/skeletons/SkeletonProduct';

import ProductOnCart from '/components/elements/products/ProductOnCart';

const WidgetProductSameBrandsResponsive = ({ brand,idMinisito }) => {
 
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
  let brands = [];

  if (brand) {
    brands = brand.slice(0,5)
    if (brand.length > 0) {
      productItemsView = brands.map((item,key)  => {
      return <div className="productoCarruselRecomendado" key={key} >
        <ProductOnCart product={item} key={key} idminisito={idMinisito}/>
      </div> 
    });
    } else {
        productItemsView = <p>No se encontraron productos relacionados</p>;
    }
  }

  return (
      <div className="ps-block--shop-features ps-container">
          <div className="ps-block__header">
              <h3>Misma Marca</h3>
          </div>
          <div className="ps-block__content">
              {brands && brands.length > 0 ? (
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

};

export default WidgetProductSameBrandsResponsive;
