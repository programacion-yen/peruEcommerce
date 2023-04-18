import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import Rating from '/components/elements/Rating';
import useLogin from '/hooks/useLogin';
import { CrearUrl } from '/utils/utilidades';
import {Divider} from 'antd'

const ProductSearchResult = ({ product,keyword }) => {

    let listaPalabras = '';
    let listamaracas = '';
    
    if (product && product) {
        listaPalabras = product.ListadoPalabras.map((item,key) => {

            if(item.encontradas === 'SCOTT') {
                return (
                    <Link href={'/miniSitios/Scott/12/'} key={`${item.encontradas}${key}`}>
                        <li className="" key={`${item.encontradas}${key}`}>
                            <a className="">{item.encontradas}</a>
                        </li>
                    </Link>
                )
            }

            return (
                <Link href={`/products/buscar/${item.encontradas}`} key={`${item.encontradas}${key}`}>
                    <li className="" key={`${item.encontradas}${key}`}>
                        <a className="">{item.encontradas}</a>
                    </li>
                </Link>
            )
            
        })
        listamaracas = product.ListadoMarcas.map((item,key) => {
            return (
                <Link href={`/products/catalogo/${item.marca}/${item.idMarca}`} key={item.idMarca}>
                    <li className="" key={item.idMarca}>
                        <a className="">{item.marca}</a>
                    </li>
                </Link>
            )
        })
    }


    return (
        <div className="d-flex bd-highlight" style={{  textAlign: 'start' }}>
            <div className="flex-fill bd-highlight hoverList">
                <ul className="list-group list-group-flush py-4">
                    <Link href={`/products/buscar/${keyword}`}>
                        <li className="">
                            <a className=""><b>{keyword}</b></a>
                        </li>
                    </Link>
                    {listaPalabras}
                </ul>
            </div>
            <div className="flex-fill bd-highlight hoverList">
                <ul className="list-group list-group-flush py-4">
                    <div className="text-muted px-4">
                        <b>Marcas relacionadas</b>
                    </div>
                    {listamaracas}
                </ul>
            </div>
        </div>
    );
};
export default ProductSearchResult;
