import React from 'react';
// import WidgetProductFeatures from '/components/shared/widgets/WidgetProductFeatures';
// import WidgetSaleOnSite from '/components/shared/widgets/WidgetSaleOnSite';
import WidgetProductSameBrands from '/components/shared/widgets/WidgetProductSameBrands';
import WidgetShopAds from '/components/shared/widgets/WidgetShopAds';

const ProductWidgets = ({product}) => {

    let brand;
    if (product && product.length > 0) {
        product.map((item, key) => {
            brand = <WidgetProductSameBrands brand={item.productosMismaMarca} key={key} idMinisito={item.idMiniSitio}/>
        });
    }

    return (
        <section>
            {
                product[0]?.bannerLateral &&
                    <WidgetShopAds product={product} />
            }
            {brand}
        </section>
    );
};

export default ProductWidgets;
