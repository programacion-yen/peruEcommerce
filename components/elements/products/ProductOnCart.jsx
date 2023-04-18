import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import { FormatNumber } from '/utils/utilidades';
import useLogin from '/hooks/useLogin';
import { ProductEtiquetas } from './ProductEtiquetas';

const ProductOnCart = ({ product }) => {
    const {isLogged} = useLogin()

    function urllist(nombre){
        let reg = /[_.,!@$%^&*()\-\/]+/g
        let word = nombre
        let symbol = word.replace(reg, '');
        let space = symbol.replace(/\s+/g, '_');
        let nom2 = space.split('_');
        let contador = 0;
        let urlTemp = '';
        while(contador <= 6 ){
            if(nom2[contador] !== undefined){
                urlTemp += nom2[contador] + '_';
            }
            contador++;
        }
        let temp = urlTemp.substring(0, urlTemp.length - 1);
        return temp;
    }

    return (
        <div className="ps-product__container">
            {/* <div className="ps-product__thumbnail">
                <Link href={`/details/${product.idminisitio}/${urllist(product.nombre.toLowerCase())+ '-'+`${product.idarticulo}`}`} >
                    <a><img src={product.imagen} height="150" width="150" style={{ display: 'block', margin: 'auto' }}
                    onError={(e) => (e.target.onerror = null, e.target.src = '/static/img/slider/andes/85182.jpeg')}/></a>
                </Link>
            </div> */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '5px' }}>
                <Link href={`/details/${product.idminisitio}/${urllist(product.nombre.toLowerCase())+ '-'+`${product.idarticulo}`}`} >
                    <a style={{ maxHeight: '150px', aspectRatio: '1/1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img 
                            className='m-0'
                            src={product.imagen}
                            style={{ display: 'block', maxHeight: '100%', width: 'auto', padding: '0.5vw' }}
                            onError={(e) => (e.target.onerror = null, e.target.src = '/static/img/slider/andes/85182.jpeg')}
                        />
                    </a>
                </Link>
            </div>
            <div className="ps-product__content">
                <div className="pb-2">
                    {
                        product.etiquetas 
                            ?   
                                <div className="">
                                    <ProductEtiquetas etiquetas={product.etiquetas} />
                                </div>
                            :
                                <div style={{ height: '22px' }}></div>
                    }
                </div>

                {/* <small><b style={{ color : '#3E81AC' }}>{product.marca == '' ? '-': product.marca}</b></small> */}
                <h6 className='m-0'>
                    <Link href={`/details/${product.idminisitio}/${urllist(product.nombre.toLowerCase())+ '-'+`${product.idarticulo}`}`}>
                        <a>{product.nombre.toUpperCase()}</a>
                    </Link>
                </h6>

                {/* {
                    isLogged ?
                    <>
                        <div className="ps-product__specification">
                            <small>SKU {product.idarticulo}</small>
                        </div>
                        <div className="d-flex">
                            <h5 className="ps-product__price sale pt-2"> {FormatNumber(product.preciofinal)}</h5>
                            <del className="text-muted pl-3 pt-1">
                                <small>{product.precio <= product.preciofinal ? '': FormatNumber(product.precio)}</small>
                            </del>
                            {product.descuento != 0 && <small className="text-danger px-3 m-0" style={{ paddingTop: '5px' }}>- ({product.descuento}) %</small>}
                        </div>
                    </>
                    :
                    <div className="ps-product__content">
                        <p className="ps-product__price sale ">SKU {product.idarticulo}</p>
                    </div>
                } */}
                {
                    isLogged && product.precio > 0 ?
                        <>
                            <div className="">
                                <small style={{fontSize: '12px', color: '#558fb5', fontWeight: 600}}>SKU {product.idarticulo}</small>
                                <div className="d-flex">
                                    <p className="ps-product__price sale m-0" style={{ color : product.precio <= product.preciofinal ? '#3e81ac' : 'red', fontSize: '20px' }}> {FormatNumber(product.preciofinal)}</p>
                                    <p className="text-muted px-3 pt-2" style={{ textDecoration:'line-through' }}>
                                        {product.precio <= product.preciofinal ? '': FormatNumber(product.precio)}
                                    </p>
                                </div>
                            </div>
                        </>
                    :
                        <div className="ps-product__content p-0 m-0 SoloCodigo">
                            <p className="ps-product__price sale p-0 m-0" style={{ fontSize: '16px', color: '#558fb5' }}>SKU {product.idarticulo}</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default ProductOnCart;
