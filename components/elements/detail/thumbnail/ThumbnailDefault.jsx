import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import NextArrow from '../../../elements/carousel/NextArrow';
import PrevArrow from '../../../elements/carousel/PrevArrow';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import "react-image-lightbox/style.css";
import { Modal } from 'antd';

const ThumbnailDefault = ({ product, vertical = true }) => {
    const galleryCarousel = useRef(null);
    const variantCarousel = useRef(null);
    const [gallery, setGallery] = useState(null);
    const [variant, setVariant] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [productImages, setProductImages] = useState([]);
    // const [imagenAnuncio, setImagenAnuncio] = useState(null);
    const [is360Open, setIs360Open] = useState(false)
    
    const handleOpenLightbox = (e, imageIndex) => {
        e.preventDefault();
        setPhotoIndex(imageIndex);
        setIsOpen(true);
    };

    const open360 = () => {
        setIs360Open(true)
        setTimeout(() => {
            window.CI360.init();
        }, 50);
    }

    const close360 = () => {
        setIs360Open(false)
        setTimeout(() => {
            window.CI360.destroy();
        }, 100);
    }
    
    useEffect(() => {
        // let imagenAnuncio;
        let images = [];
        if (product && product.length > 0) {
            product.map((item,key) => {
                // if (item.imagenAnuncio) {
                //     imagenAnuncio = item.imagenAnuncio
                // }
                if (item.allImagenes != null) {
                    item.allImagenes.map(dato => {
                        let imagenView = dato.imagen
                        images.push(imagenView)
                    })
                }else{
                    images.push(item.imagenes)
                }
            });
        }
        // setImagenAnuncio(imagenAnuncio)
        setProductImages(images);
        setGallery(galleryCarousel.current);
        setVariant(variantCarousel.current);
    }, [product]);

    const gallerySetting = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    const variantSetting = {
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                    vertical: false,
                    infinite: false,
                },
            },
        ],
    };

    //Views
    let lightboxView, variantCarouselView, imagesView, galleryImagesView;
    if (productImages.length > 0) {
        imagesView = productImages.map((item) => (
            <div className="item" key={item}>
                <img src={item} alt={item} onError={(e) => (e.target.onerror = null, e.target.src ='/static/img/slider/andes/85182.jpeg')}/>
            </div>
        ));
        // console.log(imagesView.length)
        galleryImagesView = productImages.map((item, index) => (
            <div className="item" key={item}>
                <a onClick={(e) => handleOpenLightbox(e, index)} className="d-flex justify-content-end pr-4">
                    <i className="fa fa-external-link"></i>
                </a>
                <InnerImageZoom src={item} zoomSrc={item} onError={(e)=>{e.target.onerror = null; e.target.src='/static/img/slider/andes/85182.jpeg'}} />
            </div>
        ));
    }
    if (vertical) {
        variantCarouselView = (
            <Slider
                asNavFor={gallery}
                ref={(slider) => (variantCarousel.current = slider)}
                swipeToSlide={true}
                arrows={false}
                slidesToShow={imagesView && imagesView.length}
                vertical={true}
                infinite={true}
                focusOnSelect={true}
                {...variantSetting}
                className="ps-product__variants">
                {imagesView}
            </Slider>
        );
    } else {
        variantCarouselView = (
            <Slider
                asNavFor={gallery}
                ref={(slider) => (variantCarousel.current = slider)}
                swipeToSlide={true}
                arrows={false}
                slidesToShow={imagesView && imagesView.length}
                vertical={false}
                centered={true}
                infinite={false}
                focusOnSelect={true}
                className="ps-product__variants">
                {imagesView}
            </Slider>
        );
    }
    if (isOpen) {
        lightboxView = (
            <Lightbox
                mainSrc={productImages[photoIndex]}
                nextSrc={productImages[(photoIndex + 1) % productImages.length]}
                prevSrc={
                    productImages[
                        (photoIndex + productImages.length - 1) %
                            productImages.length
                    ]
                }
                onCloseRequest={() => {
                    setIsOpen(false);
                }}
                onMovePrevRequest={() => {
                    setPhotoIndex(
                        (photoIndex + productImages.length - 1) %
                            productImages.length
                    );
                }}
                onMoveNextRequest={() => {
                    setPhotoIndex((photoIndex + 1) % productImages.length);
                }}
            />
        );
    }

    return (
        <div
            className="ps-product__thumbnail"
            data-vertical={vertical ? 'true' : 'false'}>
            <figure>
                <div className="ps-wrapper">
                    <Slider
                        {...gallerySetting}
                        ref={(slider) => (galleryCarousel.current = slider)}
                        asNavFor={variant}
                        className="ps-product__gallery ps-carousel inside">
                        {galleryImagesView}
                    </Slider>
                </div>
                {/* 360 */}
                <div style={{ height: '50px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img src='/360icon.png' height='50px' onClick={open360} style={{ cursor: 'pointer' }} />
                </div>
                <Modal
                    open={is360Open}
                    okButtonProps={{hidden:true}}
                    cancelButtonProps={{hidden: true}}
                    footer={false}
                    centered={true}
                    width={1200}
                    onCancel={close360}
                >
                    {/* TODO: 360 */}
                    {/* Se necesita url base (data-folder), formato de los archivos (data-filename-x) y cantidad de imagenes (data-amount-x) */}
                    <div
                        className="cloudimage-360"
                        id="360view"
                        // data-folder="https://scaleflex.cloudimg.io/v7/demo/earbuds/"
                        // data-filename-x="{index}.jpg"
                        data-folder="/images/"
                        data-filename-x="IMG_{index}.jpg"
                        data-amount-x="28"
                        data-keys={true}
                        data-hide-360-logo={true}
                        data-drag-speed={10}
                        data-pointer-zoom={3}
                        // data-autoplay={true}
                        // data-play-once={true}
                    >
                        {/* <button className="cloudimage-360-left"></button>
                        <button className="cloudimage-360-right"></button> */}
                    </div>
                </Modal>
            </figure>
            {variantCarouselView}
            {lightboxView}
        </div>
    );
};

export default ThumbnailDefault;
