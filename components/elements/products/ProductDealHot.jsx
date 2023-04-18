import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import ThumbnailWithBadge from '/components/elements/detail/thumbnail/ThumbnailWithBadge';
import { CrearUrl } from '/utils/utilidades';
import Icons from '/components/products/Icons'
import useLogin from '/hooks/useLogin';
import {setProductosFavAPI} from '/pages/api/WishList';
import { Success, Warning } from '/utils/Notificaciones';
import { FormatNumber} from '/utils/utilidades'
import useGlobal from '/hooks/useGlobal'
import { ProductEtiquetas } from './ProductEtiquetas';

const ProductDealHot = ({ products }) => {
    const [url, setUrl] = useState('');
    const {isLogged, favhook, carthook, idcontacto} = useLogin();
    const slider = 'form-control-slider';
    const textSlider = 'textSlider';
    const className = '';
    const [disable2, setDisable2] = useState('');
    const [iheart, setIheart] = useState('');
    const {idMinisitoHook} = useGlobal();


    function UrlProducto(){
        let temp = CrearUrl(products);
        setUrl(temp);
    }

    async function handleAddItemToWishlist(e) {
        if (!isLogged) return Router.push('/loginpage/login_page');
        e.preventDefault();

        let temp = {
            "idArticulo": products.codigo,
            "nombreWeb": products.nombreWeb
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

    useEffect(() =>{
        if(products){
            if(products.siFavorito == 1){
                setIheart('fa fa-heart FavoritosIcon');
                setDisable2('ps-product__actions bloquear');
            }
            else{
                setIheart('icon-heart');
                setDisable2('ps-product__actions');
            }
        }
        // idMinisitoHook(products.isMiniSitios)
        UrlProducto();
    },[])

    return (
        <div className="ps-product--detail ps-product--hot-deal">
            <div className="ps-product__header pb-3">
                <ThumbnailWithBadge product={products} />
                <div className="row justify-content-center py-5 my-5">
                    <div className="col-9">
                        <h4 style={{ color : '#3E81AC' }}>{products.marca}</h4>
                        <h4 className="ps-product__name">
                            <Link
                                href={`/details/${products.isMiniSitios}/${url}`}>
                                <a>{products.nombre}</a>
                            </Link>
                        </h4>
                        <div className="pb-3">
                            <ProductEtiquetas etiquetas={products.etiquetas} />
                        </div>
                        <div className="ps-product__meta mb-2">
                            {
                                isLogged ?
                                <>
                                    <div className="ps-product__specification">
                                        <p>
                                            <strong>SKU: </strong> {products.codigo}
                                        </p>
                                    </div>
                                    <div className="d-flex">
                                        <h4 className="ps-product__price sale pt-2 mr-0" style={{ color : products.precioAnterior <= products.precio ? '#3e81ac' : 'red' }}> {FormatNumber(products.precio)}</h4>
                                        <del className="text-muted px-3 pt-3">
                                            {products.precioAnterior <= products.precio ? '': FormatNumber(products.precioAnterior)}
                                        </del>
                                        {products.porcentajeDescuento != 0 && <h6 className="text-danger pt-4 m-0">- ({products.porcentajeDescuento}) %</h6>}
                                    </div>
                                </>
                                :
                                <div className="ps-product__content p-0 m-0 SoloCodigo">
                                    <p className="ps-product__price sale p-0 m-0">SKU: {products.codigo}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-2 col-2">
                        <div className='ps-product__shopping ml-2' style={{ justifyContent: 'flex-end' }}>
                            <div className={disable2}>
                                <a onClick={(e) => handleAddItemToWishlist(e)}>
                                        <i className={iheart}></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='col-11'>
                        <Icons product={products} />
                    </div>
                    {/* <div className="col-lg-11 col-1 mb-5">
                        <div className="row">
                            <div className="col-lg-8 col-9">
                                <Icons product={products} slider={slider} textSliders={textSlider} classesCenter={className}/>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ProductDealHot;
