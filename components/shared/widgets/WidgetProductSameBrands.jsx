import React, { useEffect, useState } from 'react';
import { generateTempArray } from '/utils/common-helpers';
import SkeletonProduct from '/components/elements/skeletons/SkeletonProduct';
import ProductOnCart from '/components/elements/products/ProductOnCart';

const WidgetProductSameBrands = ({ brand,idMinisito }) => {
 
    let productItemsView;
    let brands = [];
    if (brand) {
        brands = brand.slice(0,5)
        if (brand.length > 0) {
            productItemsView = brands.map((item,key)  => {
            return <ProductOnCart product={item} key={key} idminisito={idMinisito}/>;
        });
        } else {
            productItemsView = <p>No se encontraron productos relacionados</p>;
        }
    } else {
        productItemsView = generateTempArray(3).map((item) => (
            <SkeletonProduct key={item} />
        ));
    }
    return (
        <aside className="widget widget_same-brand">
            <h3>Misma Marca</h3>
            <div className="widget__content">{productItemsView}</div>
        </aside>
    );
};

export default WidgetProductSameBrands;
