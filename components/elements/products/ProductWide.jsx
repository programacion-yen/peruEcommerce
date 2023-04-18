import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import useLogin from '/hooks/useLogin';
import useGlobal from '/hooks/useGlobal';
import {FormatNumber} from '/utils/utilidades'
import Icons from '/components/products/Icons'
import {CrearUrl} from '/utils/utilidades'
import { setProductosFavAPI,delProductosFavAPI } from '../../../pages/api/WishList';
import router, { Router, useRouter } from 'next/router';
import { Success, Warning,MError } from '/utils/Notificaciones';
import { ProductEtiquetas } from './ProductEtiquetas';

const ProductWide = ({ product }) => {
    const {isLogged,favhook,idcontacto} = useLogin()
    const {idMinisitoHook} = useGlobal()
    const [url, setUrl] = useState('');
    const [iheart, setIheart] = useState('');
    const [disable, setDisable] = useState('');
    const [disable2, setDisable2] = useState('');
    const Router = useRouter();

    function UrlProducto(){
        let temp = CrearUrl(product);
        setUrl(temp);
    }

    async function handleAddItemToWishlist(e) {
        if (!isLogged) return Router.push('/loginpage/login_page');
        e.preventDefault();

        let temp = {
            "idContacto": idcontacto,
            "idArticulo": product.codigo,
            "nombreWeb": product.nombreWeb,
            "idMiniSitio" : product.idMiniSitio
        }
        let res = await setProductosFavAPI(temp);

        if(res.status === 200)
        {
            Success(res.data);
            favhook();
            setIheart('fa fa-heart FavoritosIcon');
            setDisable2('ps-product__actions bloquear')
        }
        else{
            Warning(res.data);
        }
    }


    async function ConsultarFavorito(e){
        e.preventDefault();
        
        if(product.siFavorito == 0){
            handleAddItemToWishlist(e);
            product.siFavorito = 1;
        }
        else{

            let temp = {
                "idContacto": idcontacto,
                "idArticulo": product.id.toString(),
                "nombreWeb": product.nombreWeb,
                "idMiniSitio" : product.idMiniSitio
            }

            let res = await delProductosFavAPI(temp);

            if(res.status == 200){

                Success(res.data);
            }
            else{
                MError(res.data)
            }
            setIheart('icon-heart');
            favhook();
            product.siFavorito = 0;
        }
    }

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        return Router.push('/account/compare')
    };

    useEffect(() =>{
        if(product.siFavorito == 1){
            setIheart('fa fa-heart FavoritosIcon');
            setDisable('bloquear');
        }
        else{
            setIheart('icon-heart');
        }
        // idMinisitoHook(product.idMinisito)
        UrlProducto()
    },[])

    return (
        <div className="ps-product ps-product--simple pb-1 border-0" style={{ flex: 1 }}>
            <div className="row">
                <div className="col-4" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <div className="border-0">
                        <a style={{ maxHeight: '200px', aspectRatio: '1/1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img 
                                    className='m-0'
                                    src={product.imagenes}
                                    style={{ display: 'block', maxHeight: '100%', width: 'auto', padding: '0.5vw' }}
                                    onError={(e) => (e.target.onerror = null, e.target.src = '/static/img/slider/andes/85182.jpeg')}
                                />
                        </a>
                    </div>
                </div>
                <div className="col-7">
                    <div className="ps-product__container border-0">
                        <div>
                            <ProductEtiquetas etiquetas={product.etiquetas} />
                        </div>
                        <small><b style={{ color : '#3E81AC' }}>{product.marca}</b></small>
                        <div className="ps-product__content">
                            {product.nombre}
                            {
                            isLogged ?
                            <>
                                <div className="CodigoPrecio">
                                    <small>SKU {product.codigo}</small>
                                    <div className="d-flex">
                                        <p className="ps-product__price sale m-0" style={{ color : product.precioAnterior <= product.precio ? '#3e81ac' : 'red' }}> {FormatNumber(product.precio)}</p>
                                        <p className="text-muted px-3 pt-2" style={{ textDecoration:'line-through' }}>
                                            {product.precioAnterior <= product.precio ? '': FormatNumber(product.precioAnterior)}
                                        </p>
                                        {product.porcentajeDescuento != 0 && <h6 className="text-danger pt-3">- ({product.porcentajeDescuento}) %</h6>}
                                    </div>
                                </div>
                                <div className="pt-5">
                                    <Icons product={product}/>
                                </div>
                            </>
                            :
                            <div className="ps-product__content p-0 m-0 SoloCodigo">
                                <p className="ps-product__price sale p-0 m-0">SKU {product.codigo}</p>
                            </div>
                        }
                        </div>
                    </div>
                </div>
                <div className="col-1">
                    <ul className='d-flex justify-content-end ps-1 ps-product__actions p-0 m-0'>
                        {/* <li>
                            <a onClick={(e) => handleAddItemToCompare(e)} className='p-0 m-0'>
                                <i className="icon-chart-bars p-0 m-0"></i>
                            </a>
                        </li> */}
                        <li>
                            <a onClick={(e) => ConsultarFavorito(e)}>
                                <i className={iheart}></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductWide;
