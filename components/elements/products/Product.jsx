import React from 'react';
import Link from 'next/link';
/* import ModuleProductActions from '/components/elements/products/modules/ModuleProductActions';
 */import useProduct from '/hooks/useProduct';
import Rating from '/components/elements/Rating';
import Icons from '/components/products/Icons'

const Product = ({ products }) => {
    const { thumbnailImage, price, badge, title } = useProduct();
    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                {/* <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>{thumbnailImage(products)}</a>
                </Link> */}
                {badge(products)}
                <Icons product={products}/>
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">Young Shop</a>
                </Link>
                <div className="ps-product__content">
                    {title(products)}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>02</span>
                    </div>
                    {price(products)}
                </div>
                <div className="ps-product__content hover">
                    {title(products)}
                    {price(products)}
                </div>
            </div>
        </div>
    );
};

export default Product;
