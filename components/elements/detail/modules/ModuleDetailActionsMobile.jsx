import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

const ModuleDetailActionsMobile = ({ ecomerce, product }) => {
    
    const handleAddItemToCart = (e) => {
        e.preventDefault();
        alert('hola')
    };

    return (
        <div className="ps-product__actions-mobile">
            <a
                className="ps-btn"
                onClick={(e) => handleAddItemToCart(e)}>
                Comprar ahora
            </a>
        </div>
    );
};

export default ModuleDetailActionsMobile;
