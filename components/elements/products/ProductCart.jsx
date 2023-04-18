import React from 'react';
import Link from 'next/link';

const ProductCart = ({ product }) => {
    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">
                <img src={product.thumbnail} alt="" />
            </div>
            <div className="ps-product__content">{product.title}</div>
        </div>
    );
};

export default ProductCart;
