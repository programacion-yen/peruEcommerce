import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { carouselSingle } from '/utils/carousel-helpers';
import NextArrow from '/components/elements/carousel/NextArrow';
import PrevArrow from '/components/elements/carousel/PrevArrow';
import allServices from '/services/allServices'
import useProducts from '/hooks/useProducts';

const gallerySetting = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 7,
				slidesToScroll: 7,
			}
		},
		{
			breakpoint: 650,
			settings: {
				slidesToShow: 6,
				slidesToScroll: 6,
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5,
			}
		},
		{
			breakpoint: 450,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			}
		}
	]
};

const TechnologyBestSaleBrands = () => {

    const [brandsFooter, setBrandFooter] = useState()
    const getbrandsFooter = async () => {
        let footerbrands = await allServices.getMarcasFooters()
        if (footerbrands) {
            setBrandFooter(footerbrands)
        }
    }
    const {limpiar} = useProducts()

    function cleanBrands(e) {
        limpiar()
    }
    useEffect(() => {
        getbrandsFooter()
    },[])

    return (
        <div className="ps-best-sale-brands ps-section--furniture">
            <div className="ps-container">
                <div className="">
                     <Slider
                        {...gallerySetting}
                        arrows={false}
                        >
                        {brandsFooter && brandsFooter.length > 0 ?
                            brandsFooter.map((item, key) => (
                                <Link href={`/products/catalogo/${item.nombre}/${item.idMarca}`} key={key} prefetch={false}>
                                    <a onClick={(e) => cleanBrands(e)}>
                                        <img src={item.imagen} alt={item.nombre} />
                                    </a>
                                </Link>
                            ))
                            :
                            ''
                        }

                    </Slider>
                </div>
            </div>
        </div>
    );
}


export default TechnologyBestSaleBrands;
