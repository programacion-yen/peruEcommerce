import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import Rating from '/components/elements/Rating';
import useProduct from '/hooks/useProduct';
import { CrearUrl } from '/utils/utilidades';
import useLogin from '/hooks/useLogin'
import { FormatNumber } from '/utils/utilidades';
import { ProductEtiquetas } from './ProductEtiquetas';

const ProductHorizontal = ({ products }) => {
    const { thumbnailImage, title } = useProduct();
    const [url, setUrl] = useState('');
    const {isLogged} = useLogin()

    function UrlProducto(){
        let temp = CrearUrl(products);
        setUrl(temp);
    }

    useEffect(() =>{
        UrlProducto();
    },[])
    return (
        <div className="ps-product--horizontal">
            <div className="ps-product__thumbnail">
                <Link href={`/details/${products.idMiniSitio}/${url}`}>
                    <a>{thumbnailImage(products)}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {title(products)}
                <div className="ps-product__rating">
                    <Rating />
                </div>
                {
                    isLogged ?
                    <>
                        <div className="ps-product__specification">
                            <p className="m-0">
                                <strong>SKU: </strong> {products.codigo}
                            </p>
                        </div>
                        <div className="d-flex">
                            <h4 className="ps-product__price sale pt-2 mr-0" style={{ color : products.precioAnterior <= products.precio ? '#3e81ac' : 'red' }}> {FormatNumber(products.precio)}</h4>
                            <del className="text-muted px-3 pt-1">
                                <small>{products.precioAnterior <= products.precio ? '': FormatNumber(products.precioAnterior)}</small>
                            </del>
                            {products.porcentajeDescuento != 0 && <small className="text-danger m-0" style={{ paddingTop: '5px' }}>- ({products.porcentajeDescuento}) %</small>}
                        </div>
                    </>
                    :
                    <div className="ps-product__content p-0 m-0 SoloCodigo">
                        <p className="ps-product__price sale p-0 m-0">SKU: {products.codigo}</p>
                    </div>
                }
                <div className="pb-3">
                    <ProductEtiquetas etiquetas={products.etiquetas} />
                </div>
            </div>
        </div>
    );
};

export default ProductHorizontal;
