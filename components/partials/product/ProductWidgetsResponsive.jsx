import React from 'react';
// import WidgetProductFeatures from '/components/shared/widgets/WidgetProductFeatures';
// import WidgetSaleOnSite from '/components/shared/widgets/WidgetSaleOnSite';
import WidgetProductSameBrandsResponsive from '/components/shared/widgets/WidgetProductSameBrandsResponsive';
import WidgetShopAdsResponsive from '/components/shared/widgets/WidgetShopAdsResponsive';

const ProductWidgets = ({product}) => {

    let brand;
    if (product && product.length > 0) {
        product.map((item, key) => {
            brand = <WidgetProductSameBrandsResponsive brand={item.productosMismaMarca} key={key} idMinisito={item.idMiniSitio}/>
        });
    }

    return (
        <section>
            <WidgetShopAdsResponsive product={product} />
            {brand}
        </section>
    );
};

export default ProductWidgets;