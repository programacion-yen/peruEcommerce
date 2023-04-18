import React from 'react';
import Link from 'next/link';
import { ProductEtiquetas } from '../../products/ProductEtiquetas';

const ModuleProductDetailSpecification = ({ product }) => {
    let bodyProduct;
    let tags;

    if(product && product.length > 0){
        product.map((item) => {
        tags = item.tags.split(",")
        var newArray = tags.filter((item) => item !== ' x' && item !== 'x');
        item.categorizacion.map(data => {
            bodyProduct = <div className="ps-product__specification">
                <div className="pb-3">
                    <ProductEtiquetas etiquetas={product.etiquetas} />
                </div>
                <p className="py-2">
                    <strong>SKU: </strong> {item.codigo}
                </p>
                <h6 className="categories" style={{ display: 'flex', alignItems: 'center' }}>
                    <strong> Categorias: </strong>
                    <Link href={`/products/catalogo/${data.grupo}/${data.categoria.toLowerCase()}/${data.idcategoria}`}>
                        <a className="text-primary ml-2">{data.categoria}</a>
                    </Link>
                </h6>
                <h6 className="tags" style={{ display: 'flex', alignItems: 'center', flexFlow: 'wrap' }}>
                    <strong> Etiquetas: </strong>
                        {
                            newArray.map((dato, key) => (
                                <Link href={`/products/buscar/${dato.replace(',','')}`} key={key}>
                                    <a>
                                        <p className="text-primary ml-2">{dato}</p>
                                    </a>
                                </Link>
                            ))
                        }
                </h6>
            </div>
            })
        })
    }
    return (
       <>
           {bodyProduct}
       </>
    );
}

export default ModuleProductDetailSpecification;
