import React from 'react';
import useGlobal from '/hooks/useGlobal';

const ModuleShopSortBy = ({product}) => {

    const {isorder,orderhook} = useGlobal();

    product.sort((a, b) => b.precio - a.precio);

    const orderMenor = () => {
        orderhook(true)
        product.sort((a, b) =>  b.precio - a.precio);
    }

    return (
        <select
            className="ps-select form-control"
            data-placeholder="Sort Items">
            <option onClick={() => orderMenor()}>Ordenar por precio: menor a mayor</option>
            <option>Ordenar por precio: mayor a menor</option>
        </select>
    );
};

export default ModuleShopSortBy;
