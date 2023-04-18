import React, { useEffect,useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import ProductDealOfDay from '/components/elements/products/ProductDealOfDay';
import { generateTempArray } from '/utils/common-helpers';
import SkeletonProduct from '/components/elements/skeletons/SkeletonProduct';
import allServices from '/services/allServices';
import { carouselStandard } from '/utils/carousel-helpers';
//import CountDownSimple from '/components/elements/CountDownSimple';
import useProducts from '/hooks/useProducts';

const ProductGroupDealOfDay = ({
    boxed = false,
}) => {
   
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const {productScottHook,scottProd} = useProducts()

    const productScotts = async () =>{
        let dato = await allServices.getProductScott();
        productScottHook(dato);
        if (dato) {
          setLoading(true);
          setTotal(dato.length);
        }
      }

    useEffect(() => {
        productScotts()
    }, []);

    // Views
    let productItemsView;
    if (!loading) {
        if (scottProd && scottProd.length > 0) {
            const slideItems = scottProd.map((item) => (
                <ProductDealOfDay product={item} key={item.id} />
            ));
            productItemsView = (
                <Slider {...carouselStandard} className="ps-carousel outside">
                    {slideItems}
                </Slider>
            );
        } else {
            productItemsView = <p>No product found.</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }

    return (
        <div className="ps-deal-of-day">
            <div className={boxed ? 'container' : 'ps-container'}>
                <div className="ps-section__header">
                    <div className="ps-block--countdown-deal">
                        <div className="ps-block__left">
                            <h3>Deal of the day</h3>
                        </div>
                        <div className="ps-block__right">
                            <figure>
                                <figcaption>End in:</figcaption>
                                {/* <CountDownSimple
                                    timeTillDate="12 31 2021, 6:00 am"
                                    timeFormat="MM DD YYYY, h:mm a"
                                /> */}
                            </figure>
                        </div>
                    </div>
                    <Link href="/shop">
                        <a>View all</a>
                    </Link>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};

export default ProductGroupDealOfDay;
