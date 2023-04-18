import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Products from '/components/products/Product'
import useGetProducts from '/hooks/useGetProducts';
import GruposAndCategories from '/components/partials/homepage/marketplace/modules/GruposAndCategories'
import {Tabs, Button, Divider, Checkbox} from 'antd'

const OrganicNewArrivals = ({ items }) => {
    const { loading } = useGetProducts();
    const { TabPane } = Tabs;

    // Views
    let productItemView;
    let idcategory;
    if (!loading) {
        if (items) {
            idcategory = items.categoria.map((item) => {
                return item.idCategoria
            });
            productItemView =
                <Products id={idcategory} key={items.id} />
        } else {
            productItemView = <p>No product found.</p>;
        }
    } else {
        productItemView = <p>Loading...</p>;
    }

    return (
        <>
        <div className="ps-product-list ps-product-list--2 pt-5">
            <div className="ps-container">
                <div className="">
                    <h3>{items.grupo}</h3>
                </div>
                <Tabs className="ant-tabs-end">
                    <TabPane tab="Te Recomendamos" key="1">
                        <div className="ps-section__content p-0">
                            <div className="ps-block--products-of-category">
                                <GruposAndCategories items={items}/>
                                {productItemView}
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Más Vendidos" key="2">
                        <div className="ps-section__content p-0">
                            <div className="ps-block--products-of-category">
                                <GruposAndCategories items={items}/>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Ver más" key="3">
                        <div className="ps-section__content p-0">
                            <div className="ps-block--products-of-category">
                                <GruposAndCategories items={items}/>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
               {/*  <div className="ps-section__content p-0">
                    <div className="ps-block--products-of-category">
                        <GruposAndCategories items={items}/>
                        {productItemView}
                    </div>
                </div> */}
            </div>
        </div></>
    );
};

export default OrganicNewArrivals;
