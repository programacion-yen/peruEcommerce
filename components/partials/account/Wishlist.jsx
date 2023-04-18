import React, { useEffect, useState } from 'react';
import {getProductosFavAPI, delProductosFavAPI} from '../../../pages/api/WishList';
import {icon1} from '../../../imgTemp/IconTemp/index';
import useLogin from '/hooks/useLogin';
import {setCarritoAPI} from '../../../pages/api/Cart';
import { Table, Space, Modal } from 'antd';
import { Success, Error, Warning } from '/utils/Notificaciones';
import {FormatNumber, SoloNumeros} from '/utils/utilidades'
import Link from 'next/link';

const Wishlist = () => {

    const {favhook, idcontacto, token, carthook} = useLogin();

    const [favoritos, setFavoritos] = useState([]);
    const [windowWidth, setWindowWidth] = useState()

    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
        setWindowWidth(window.innerWidth)

        return () => {
            window.removeEventListener("resize", handleResize, false);
        }
    }, [])

    async function getProductos(){
        let resp = await getProductosFavAPI();
        if(resp) {
            const fav = resp.map( item => ({ ...item, key: item.idArticulo }))
            setFavoritos(fav);
        }
    }

    const columns = [
        {
            title: 'PRODUCTO',
            dataIndex: 'nombreWeb',
            key: 'nombreWeb',
            render: (text, item) => (
                <>
                <Link href={`/details/${item.idMinisitio}/${urlWishlist(item.nombreWeb.toLowerCase())+ '-'+`${item.idArticulo}`}`} >
                    <a style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ height: '150px', aspectRatio: '1/1', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '30px' }}>
                            <img src={item.imagen} alt="" style={{ display: 'block', maxHeight: '100%', width: 'auto' }} />
                        </div>
                        
                        <div>
                            <span className='p-0'><p className='p-0 m-0' style={{fontWeight:'bold'}}>SKU:{item.idArticulo}</p></span>
                            <span className='p-0'><p className='p-0 m-0'>{text}</p></span>
                        </div>
                    </a>
                </Link>
                </>
            ),
        },
        {
            title: 'PRECIO',
            key: 'precio',
            width: 150,
            className: 'text-center',
            dataIndex: 'precio',
            render: text => <a>{FormatNumber(text)}</a>,
        },
        {
            title: 'ACCIONES',
            key: 'action',
            width: 150,
            className: 'text-center',
            render: (text, item) => (
                <div className="d-flex justify-content-around" key={item.idArticulo}>

                    <a onClick={(e) => AgregarProductoCarrito(e, item)} id={item.idArticulo}>
                        {
                            item.siEnCarrito == 1
                                ? <img src='/logo/shopping-cart-green.svg' height='32px' />
                                : <img src='/logo/shopping-cart-bl.svg' height='32px' />
                        }
                    </a>
                    
                    <a onClick={(e) => EliminaProductoFavorito(e, item)}>
                        <i className="icon-cross IconSize"></i>
                    </a>
                </div>
            ),
        },
    ];

    
    const mobileColumns = [
        {
            title: 'Productos',
            dataIndex: 'nombreWeb',
            key: 'nombreWeb',
            render: (text, item) => (
                <>
                <Link href={`/details/${item.idMinisitio}/${urlWishlist(item.nombreWeb.toLowerCase())+ '-'+`${item.idArticulo}`}`} >
                    <a style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ height: '100px', aspectRatio: '1/1', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                            <img src={item.imagen} alt="" style={{ display: 'block', maxHeight: '100%', width: 'auto' }} />
                        </div>
                        
                        <div>
                            <span><p className='m-0' style={{ fontWeight:'bold' }}>SKU: {item.idArticulo}</p></span>
                            <span><p className='m-0' style={{ lineHeight: 1.3, fontSize: '14px' }}>{text}</p></span>
                            <span><p className='m-0' style={{ fontSize: '16px' }}><b>{FormatNumber(item.precio)}</b></p></span>
                        </div>
                    </a>
                </Link>
                </>
            ),
        },
        {
            title: 'Acciones',
            key: 'action',
            className: 'text-center',
            render: (text, item) => (
                <div className="d-flex justify-content-around" key={item.idArticulo}>

                    <a onClick={(e) => AgregarProductoCarrito(e, item)} id={item.idArticulo} style={{ marginRight: '5px' }}>
                        {
                            item.siEnCarrito == 1
                                ? <img src='/logo/shopping-cart-green.svg' height='32px' />
                                : <img src='/logo/shopping-cart-bl.svg' height='32px' />
                        }
                    </a>
                    
                    <a onClick={(e) => EliminaProductoFavorito(e, item)}>
                        <i className="icon-cross" style={{ fontSize: '29px' }}></i>
                    </a>
                </div>
            ),
        },
    ];

    function urlWishlist(nombre){
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

    useEffect(() => {
        const unsubscribe = getProductos();
        return unsubscribe;
    }, []);

    async function EliminaProductoFavorito(e, producto) {

        let temp = {
            "idContacto": idcontacto,
            "idArticulo": producto.idArticulo,
            "nombreWeb": producto.nombreWeb,
            "idMiniSitio" : producto.idMinisitio
        }

        let res = await delProductosFavAPI(temp);

        if(res.status === 200){
            Success(res.data);
            favhook();
        }
        else{

            Warning(res.data);
        }

        await getProductos();
        favhook();
    }

    async function AgregarProductoCarrito(e, producto){
        e.preventDefault();

        if( producto.siEnCarrito === 1 ) {
            return Warning('El producto ya está en el carrito')
        }

        let temp = {
            "idMiniSitio": producto.idMinisitio,
            "IDcontacto": idcontacto,
            "idArticulo": producto.idArticulo,
            "cantidad": producto.soloBultos !== 0 ? producto.soloBultos : 1,
            "tipoConsulta": 1
        }

        let res = await setCarritoAPI(temp);

        if(res.status == 200)
        {
            Success(res.data.mensaje);
            carthook();
            getProductos();
        }
        else{
            Warning(res.data.mensaje);
        }

    }

    return(
        <>
            <div className="ps-section__content">
                <Table columns={ windowWidth > 576 ? columns : mobileColumns } dataSource={favoritos} pagination={{ pageSize: 4,showSizeChanger: false,responsive:true }}/>
            </div>
        </>
    )
};
export default Wishlist;
