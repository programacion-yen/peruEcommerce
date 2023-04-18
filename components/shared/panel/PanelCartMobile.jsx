import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import CarritoCompra from '/components/CarritoCompra/Cart'

const PanelCartMobile = () => {

    useEffect(() => {
       /*  if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems);
        } */
    }, []);

    return (
        <div className="ps-cart--mobile">
            <div className="ps-cart__content">
                <CarritoCompra />
            </div>
        </div>
    );
};
export default PanelCartMobile;
