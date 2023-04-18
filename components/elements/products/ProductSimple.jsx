import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Icons from '/components/products/Icons'
import useLogin from '/hooks/useLogin';
import useGlobal from '/hooks/useGlobal';
import { CrearUrl } from '/utils/utilidades';
import {FormatNumber} from '/utils/utilidades'
import { setProductosFavAPI, getProductosFavAPI, delProductosFavAPI } from '../../../pages/api/WishList';
import { Success, Warning } from '/utils/Notificaciones';
import { useRouter } from 'next/router';
import { ProductEtiquetas } from './ProductEtiquetas';

const ProductSimple = ({ product,column }) => {

    const {isLogged, favhook, idcontacto} = useLogin()
    // const {idMinisitoHook} = useGlobal();
    const [url, setUrl] = useState('');
    const [iheart, setIheart] = useState('');
    const [disable, setDisable] = useState('');
	const Router = useRouter();

    useEffect(() =>{
        if(product.siFavorito == 1){
            setIheart('fa fa-heart FavoritosIcon');
        }
        else{
            setIheart('icon-heart');
        }
        // idMinisitoHook(product.idMiniSitio)
        UrlProducto();
    },[])

    function UrlProducto(){
        let temp = CrearUrl(product);
        setUrl(temp);
    }


    async function ConsultarFavorito(e){

        e.preventDefault();

        if(product.siFavorito == 0){
            GuardarFavoritos(e);
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

    async function GuardarFavoritos(e){
        if (!isLogged) return Router.push('/loginpage/login_page');
        e.preventDefault();

        let temp = {
            "idContacto": idcontacto,
            "idArticulo": product.codigo,
            "nombreWeb": product.nombreWeb,
            "idMiniSitio" : product.idMiniSitio
        }

        let res = await setProductosFavAPI(temp);

        if(res.status == 200)
        {
            Success(res.data);
            favhook();
            setIheart('fa fa-heart FavoritosIcon');
            // setDisable('bloquear');
        }
        else{
            Warning(res.data == '' ? 'No se pudo agregar a favoritos': res.data);
        }
    }

    // const handleAddItemToCompare = (e) => {
    //     e.preventDefault();
    //     return Router.push('/account/compare')
    // };

    return (
        <>
            <div className={`${column} ps-product ps-product--simple pb-1 border`}>
                <div className="ps-product__thumbnail p-0 m-0">
                    <ul 
                        className='d-flex ps-1 ps-product__actions p-0 m-0' 
                        style={ product.porcentajeDescuento != 0 ? { justifyContent: 'space-between', alignItems: 'center' } : { justifyContent: 'flex-end' }}
                    >
                        {product.porcentajeDescuento != 0 && (
                            <div style={{ backgroundColor: 'red', display: 'flex',  borderRadius: '8px', marginTop: '5px' }}>
                                <h6 className="text-white" style={{ fontSize: '13px', marginBottom: 0, padding: '6px 8px', }}>- {product.porcentajeDescuento} %</h6>
                            </div>
                        )}
                        <li>
                            <a onClick={(e) => ConsultarFavorito(e)} className={disable} data-toggle="tooltip" data-placement="top" title="Agregar a favoritos">
                                <i className={iheart}></i>
                            </a>
                        </li>
                    </ul>
                    <div>
                        <Link href={`/details/${product.idMiniSitio}/${url}`} >
                            <a style={{ maxHeight: '100%', aspectRatio: '1/1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img 
                                    className='m-0' 
                                    src={product.imagenes}
                                    style={{ display: 'block', maxHeight: '100%', width: 'auto', padding: '0.5vw' }}
                                    onError={(e) => (e.target.onerror = null, e.target.src = '/static/img/slider/andes/85182.jpeg')}
                                />
                            </a>
                        </Link>
                    </div>
                    
                </div>
                <div className="ps-product__container m-0">

                    {
                        product.etiquetas 
                            ?   
                                <div className="d-flex">
                                    <ProductEtiquetas etiquetas={product.etiquetas} />
                                </div>
                            :
                                <div style={{ height: '22px' }}></div>
                    }

                    <small><b style={{ color : '#3E81AC' }}>{product.marca == '' ? '-': product.marca}</b></small>
                    <h6 className='altoNombreProd m-0'>
                        <Link href={`/details/${product.idMiniSitio}/${url}`}><a>{product.nombreWeb.toUpperCase()}</a></Link>
                    </h6>
                    {
                        isLogged && product.precio > 0 ?
                        <>
                            <div className="CodigoPrecio">
                                <small style={{fontSize: '12px', color: '#558fb5', fontWeight: 600}}>SKU {product.codigo}</small>
                                <div className="d-flex">
                                    <p className="ps-product__price sale m-0" style={{ color : product.precioAnterior <= product.precio ? '#3e81ac' : 'red' }}> {FormatNumber(product.precio)}</p>
                                    <p className="text-muted px-3 pt-2" style={{ textDecoration:'line-through' }}>
                                        {product.precioAnterior <= product.precio ? '': FormatNumber(product.precioAnterior)}
                                    </p>
                                </div>
                            </div>
                        </>
                        :
                        <div className="ps-product__content p-0 m-0 SoloCodigo">
                            <p className="ps-product__price sale p-0 m-0">SKU {product.codigo}</p>
                        </div>
                    }
                </div>
                <div className='mt-5 mb-3'>
                    <Icons product={product}/>
                </div>
            </div>
        </>
    );
};

export default ProductSimple;
