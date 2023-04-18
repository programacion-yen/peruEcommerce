import React from 'react';

const WidgetShopAds = ({ product }) => {
    return (
        <aside className="widget" style={{ display: 'flex', flexFlow: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
            {
                product && product[0].bannerLateral &&
                    product[0].bannerLateral.map(banner => (
                        <img className="pb-2" src={banner.imagen} alt={banner.nombre} width="300" height="73" />
                    ))
            }
        </aside>
    );
};


export default WidgetShopAds;