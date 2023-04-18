import React from 'react';
import Link from 'next/link';
import Rating from '/components/elements/Rating';
import useLogin from '/hooks/useLogin';
import {FormatNumber} from '/utils/utilidades'

const ModuleDetailTopInformation = ({ product }) => {

    const {isLogged} = useLogin()
    let header;
    let raking;
    let comment;

    if (product && product.length > 0) {
        product.map((item,key) => {
            item.categorizacion.map(data => {
                raking = item.puntuaciones
                comment = item.comentarios ? item.comentarios.length: 0
                header =  <header key={item.id}>
                    <h1>{item.nombreWeb}</h1>
                    <div className="ps-product__meta">
                        <div>
                            Código: 
                                <p className="ml-2 text-capitalize">
                                    {item.codigo}
                                </p>
                        </div>
                        <div>
                            Marca:
                            <p className="ml-2 text-capitalize">
                                {/* <Link href={`/products/catalogo${item.marca ? `/>${item.url}` : '' }/${item.idMarca}`}>
                                    <a>{item.marca}</a>
                                </Link> */}
                                {item.marca}
                            </p>
                        </div>
                        <div className="ps-product__rating">
                            <Rating rating={raking}/>
                            <span>({comment} Comentarios)</span>
                        </div>
                    </div>
                    {
                        isLogged ?
                        <>
                            <div className="CodigoPrecio mb-4">
                                <div className="d-flex">
                                    <p className="ps-product__price sale m-0" style={{ color : item.precioAnterior <= item.precio ? '#3e81ac' : 'red' }}> {FormatNumber(item.precio)}</p>
                                    <p className="text-muted px-3 pt-3" style={{ textDecoration:'line-through' }}>
                                        {item.precioAnterior <= item.precio ? '': FormatNumber(item.precioAnterior)}
                                    </p>
                                    {item.porcentajeDescuento != 0 && <h6 className="text-danger pt-4">- ({item.porcentajeDescuento}) %</h6>}
                                </div>
                            </div>
                        </>
                        :
                        <div className="ps-product__content p-0 m-0">
                            <h4 style={{ color : '#373935' }}>Para ver el precio, debes ingresar con tu cuenta</h4>
                        </div>
                    }
                </header>
            })
        })
    }
    return (
       <>
           {header}
       </>
    );
};

export default ModuleDetailTopInformation;
