import React from 'react';

const MarketPlaceSiteFeatures = () => (
    <div className="ps-site-features p-5">
        <div className="ps-container">
            <div className="ps-block--site-features ps-block--site-features-2">
                <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-rocket"></i>
                    </div>
                    <div className="ps-block__right">
                        <h4>Entrega gratis</h4>
                        <p>Para todos los pedidos superiores a $99</p>
                    </div>
                </div>
                <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-sync"></i>
                    </div>
                    <div className="ps-block__right">
                        <h4>90 días de devolución</h4>
                        <p>Si los bienes tienen problemas</p>
                    </div>
                </div>
                <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-credit-card"></i>
                    </div>
                    <div className="ps-block__right">
                        <h4>Pago seguro</h4>
                        <p>Pago 100% seguro</p>
                    </div>
                </div>
                <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-bubbles"></i>
                    </div>
                    <div className="ps-block__right">
                        <h4>Soporte 24/7</h4>
                        <p>Soporte dedicado</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default MarketPlaceSiteFeatures;
