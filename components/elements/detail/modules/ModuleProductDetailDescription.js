import React from 'react';
import Link from 'next/link';

const ModuleProductDetailDescription = ({ product }) => {
    
    let description;
    if(product && product.length > 0){
        product.map((item, key) => {
            description = <small>{item.descripcion}</small>
        })
    }
    return (
       <>
        <div className="ps-product__desc">
            <p>
                Descripción :
            </p>
            <p>
                {description}
            </p>
        </div>
       </>
    );
};

export default ModuleProductDetailDescription;
