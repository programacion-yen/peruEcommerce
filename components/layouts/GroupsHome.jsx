import React, { useEffect, useState } from 'react';
import Product from '/components/products/Product'
import useGetProducts from '/hooks/useGetProducts';
import ThumbnailGruposAndCategories from '/components/partials/homepage/marketplace/modules/ThumbnailGruposAndCategories'
import {Tabs,Button} from 'antd'
import Link from 'next/link'


const GroupsHome = ({ items,typeRequest,typeSale,data }) => {
    const { loading } = useGetProducts();
    const { TabPane } = Tabs;

    let productItemRecomendado;
    let productItemMasVendidos;
    if (!loading) {
        productItemRecomendado = <Product type={typeRequest} />
        productItemMasVendidos = <Product type={typeSale} />

    } else {
        productItemRecomendado,productItemMasVendidos = <p>Cargando...</p>;
    }

    return (
        <>
            <div className="ps-product-list--2 py-5">
                <div className="ps-container title">
                    <Link href={`/products/catalogo/${items.grupo.toLowerCase()}/${items.idGrupo}`}>
                        <a className="d-flex">
                            <h2 style={{ color: '#003399',textTransform: 'capitalize' }}>{items.grupo.toLowerCase()}</h2>
                        </a>
                    </Link>
                    <Tabs className="ant-tabs-end">
                        <TabPane tab="Te Recomendamos" key="1">
                            <div className="ps-section__content p-0">
                                <div className="ps-block--products-of-category">
                                    <ThumbnailGruposAndCategories items={items} data={data} type={typeRequest}/>
                                    {productItemRecomendado}
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Más Vendidos" key="2">
                            <div className="ps-section__content p-0">
                                <div className="ps-block--products-of-category">
                                    <ThumbnailGruposAndCategories items={items} data={data} type={typeRequest}/>
                                    {productItemMasVendidos}
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default GroupsHome;
