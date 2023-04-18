import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Rate } from 'antd';
import {producto1,
	producto2,
	producto3,
	producto4,
	producto5,
	producto6,
	producto7,
	producto8,
	producto9,
	producto10,
	producto11,
	producto12,
	producto13,
	producto14,
	producto15,
	producto16,
	producto17,
	producto18,
	producto19,
	producto20,} from '../../../imgTemp/index';

const Compare = () => {

    function handleAddItemToCart(e, product) {
        e.preventDefault();
/*         addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
 */    }

    function handleRemoveCompareItem(e, product) {
        e.preventDefault();
        /* removeItem(product, ecomerce.compareItems, 'compare'); */
    }
    return (
        <div className="ps-compare ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Productos a Comparar</h1>
                </div>
                <div className="ps-section__content">
                    <div className="table-responsive">
                        <table className="table ps-table--compare">
                            <tbody>
                                <tr>
                                    <td className="heading" rowSpan="2">Producto</td>
                                    <td><a>Remover</a></td>
                                    <td><a>Remover</a></td>
                                    <td><a>Remover</a></td>
                                    <td><a>Remover</a></td>
                                    <td><a>Remover</a></td>
                                    <td><a>Remover</a></td>
                                    <td><a>Remover</a></td>
                                    <td><a>Remover</a></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="ps-product--compare">
                                            <div className="ps-product__thumbnail"><a><img
                                                        src={producto1.src}
                                                        alt={producto1.src}/></a>
                                            </div>
                                            <div className="ps-product__content"><a className="ps-product__title">Sound Intone
                                                    I65 Earphone White Version</a></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="ps-product--compare">
                                            <div className="ps-product__thumbnail"><a><img
                                                        src={producto2.src}
                                                        alt={producto2.src}/></a>
                                            </div>
                                            <div className="ps-product__content"><a className="ps-product__title">Korea Long
                                                    Sofa Fabric In Blue Navy Color</a></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="ps-product--compare">
                                            <div className="ps-product__thumbnail"><a><img
                                                        src={producto3.src}
                                                        alt={producto3.src}/></a>
                                            </div>
                                            <div className="ps-product__content"><a className="ps-product__title">Unero
                                                    Military Classical Backpack</a></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="ps-product--compare">
                                            <div className="ps-product__thumbnail"><a><img
                                                        src={producto4.src}
                                                        alt={producto4.src}/></a>
                                            </div>
                                            <div className="ps-product__content"><a className="ps-product__title">Rayban
                                                    Rounded Sunglass Brown Color</a></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="ps-product--compare">
                                            <div className="ps-product__thumbnail"><a><img
                                                        src={producto5.src}
                                                        alt={producto5.src}/></a>
                                            </div>
                                            <div className="ps-product__content"><a className="ps-product__title">MVMTH
                                                    Classical Leather Watch In Black</a></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="ps-product--compare">
                                            <div className="ps-product__thumbnail"><a><img
                                                        src={producto6.src}
                                                        alt={producto6.src}/></a>
                                            </div>
                                            <div className="ps-product__content"><a className="ps-product__title">EPSION
                                                    Plaster Printer</a></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="ps-product--compare">
                                            <div className="ps-product__thumbnail"><a><img
                                                        src={producto7.src}
                                                        alt={producto7.src}/></a>
                                            </div>
                                            <div className="ps-product__content"><a className="ps-product__title">EPSION
                                                    Plaster Printer 2</a></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="ps-product--compare">
                                            <div className="ps-product__thumbnail"><a><img
                                                        src={producto8.src}
                                                        alt={producto8.src}/></a>
                                            </div>
                                            <div className="ps-product__content"><a className="ps-product__title">LG White
                                                    Front Load Steam Washer</a></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="heading">Precio</td>
                                    <td>
                                        <h4 className="price">$ 106.96</h4>
                                    </td>
                                    <td>
                                        <h4 className="price">$ 670.2</h4>
                                    </td>
                                    <td>
                                        <h4 className="price">$ 42.2</h4>
                                    </td>
                                    <td>
                                        <h4 className="price">$ 35.89</h4>
                                    </td>
                                    <td>
                                        <h4 className="price">$ 62.99</h4>
                                    </td>
                                    <td>
                                        <h4 className="price">$ 233.28</h4>
                                    </td>
                                    <td>
                                        <h4 className="price">$ 299.28</h4>
                                    </td>
                                    <td>
                                        <h4 className="price">$ 1422.7</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="heading"></td>
                                    <td><button className="ps-btn"><i className="icon-bag2"></i></button></td>
                                    <td><button className="ps-btn"><i className="icon-bag2"></i></button></td>
                                    <td><button className="ps-btn"><i className="icon-bag2"></i></button></td>
                                    <td><button className="ps-btn"><i className="icon-bag2"></i></button></td>
                                    <td><button className="ps-btn"><i className="icon-bag2"></i></button></td>
                                    <td><button className="ps-btn"><i className="icon-bag2"></i></button></td>
                                    <td><button className="ps-btn"><i className="icon-bag2"></i></button></td>
                                    <td><button className="ps-btn"><i className="icon-bag2"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
/*         <div className="ps-compare ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Productos a comparar</h1>
                </div>
                <div className="ps-section__content">
                    {products && products.length === 0 ? (
                        <div className="alert alert-danger" role="alert">
                            Compare list is empty!
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table ps-table--compare">
                                <tbody>
                                    <tr>
                                        <td className="heading" rowSpan="2">
                                            Producto
                                        </td>
                                        {products && products.length > 0 ? (
                                            products.map((product) => (
                                                <td key={product.id}>
                                                {product.id}
                                                    <a
                                                        href="#"
                                                        onClick={(e) =>
                                                            handleRemoveCompareItem(
                                                                e,
                                                                product
                                                            )
                                                        }>
                                                        Remove
                                                    </a>
                                                </td>
                                            ))
                                        ) : (
                                            <td></td>
                                        )}
                                    </tr>
                                    <tr>
                                        {products && products.length > 0 ? (
                                            products.map((product) => (
                                                <td key={product.id}>
                                                    <div className="ps-product--compare">
                                                        <div className="ps-product__thumbnail">
                                                            <Link
                                                                href="/product/[pid]"
                                                                as={`/product/${product.id}`}>
                                                                <a>
                                                                
                                                                </a>
                                                            </Link>
                                                        </div>
                                                        <div className="ps-product__content">
                                                            <Link
                                                                href="/product/[pid]"
                                                                as={`/product/${product.id}`}>
                                                                <a className="ps-product__title">
                                                                    {
                                                                        product.title
                                                                    }
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            ))
                                        ) : (
                                            <td></td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td className="heading">Precio</td>
                                        {products && products.length > 0 ? (
                                            products.map((product) => {
                                                if (product.precio === true) {
                                                    return (
                                                        <td key={product.id}>
                                                            <h4 className="price sale">
                                                                ${product.precio}
                                                                <del>
                                                                    $
                                                                    {
                                                                        product.salePrice
                                                                    }
                                                                </del>
                                                            </h4>
                                                        </td>
                                                    );
                                                } else
                                                    return (
                                                        <td key={product.id}>
                                                            <h4 className="price">
                                                                ${' '}
                                                                {product.precio}
                                                            </h4>
                                                        </td>
                                                    );
                                            })
                                        ) : (
                                            <td></td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td className="heading"></td>
                                        {products && products.length > 0 ? (
                                            products.map((product) => (
                                                <td key={product.id}>
                                                    <button
                                                        className="ps-btn"
                                                        onClick={(e) =>
                                                            handleAddItemToCart(
                                                                e,
                                                                product
                                                            )
                                                        }>
                                                        Add To Cart
                                                    </button>
                                                </td>
                                            ))
                                        ) : (
                                            <td></td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div> */
    );
};

export default connect((state) => state)(Compare);
