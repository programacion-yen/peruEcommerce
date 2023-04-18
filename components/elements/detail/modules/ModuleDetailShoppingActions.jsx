import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import { Modal } from 'antd';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import useLogin from '/hooks/useLogin';
import {getProductosAPI, delCarritoAPI, setCarritoAPI, updateCarritoAPI} from '../../../../pages/api/Cart';//../../pages/api/Cart
import {getProductosFavAPI, setProductosFavAPI, delProductosFavAPI} from '../../../../pages/api/WishList';//../../pages/api/WishList
import {Success, Warning, MError} from '/utils/Notificaciones';
import { SoloNumeros,FormatNumber } from '/utils/utilidades';
import { isEmpty } from 'lodash';


const ModuleDetailShoppingActions = ({product}) =>  {
    const Router = useRouter();
    const {favhook, carthook, idcontacto, isLogged} = useLogin();
    const [cantidad, setCantidad] = useState(0);
    // const [disable, setDisable] = useState('');
    // const [disable2, setDisable2] = useState('');
    const [iheart, setIheart] = useState('');
    const [siOculto, setSiOculto] = useState(false);

    //Cuando este lista la api
    useEffect(() =>{

        if(product && product.length > 0){
            // console.log(product)
            if(product[0].siEnCarrito == 1){
                setSiOculto(true);
                setCantidad(product[0].cantidadEnCarrito);
            }
            else{
                setSiOculto(false);
            }

            if(product[0].siFavorito == 1){
                setIheart('fa fa-heart FavoritosIcon');
                // setDisable2('bloquear');
            }
            else{
                setIheart('icon-heart');
                // setDisable2('');
            }
        }

    }, [product])

    const handleBuynow = async(e) => {
        if (!isLogged) return Router.push('/loginpage/login_page');
        e.preventDefault();
        if(cantidad == 0) {
            await handleAddItemToCart(e, 1)
        }
        Router.push('/carritoCompra/cart')
    }

    async function handleAddItemToWishlist(e) {
        if (!isLogged) return Router.push('/loginpage/login_page');
        e.preventDefault();

        let temp = {
            "idContacto": idcontacto,
            "idArticulo": product[0].codigo,
            "nombreWeb": product[0].nombreWeb,
            "idMiniSitio" : product[0].idMiniSitio
        }

        // console.log(product[0]);

        let res = await setProductosFavAPI(temp);
        // console.log('desde action', res)

        if(res.status === 200)
        {
            Success(res.data);
            favhook();
            setIheart('fa fa-heart FavoritosIcon');
            // setDisable2('ps-product__actions bloquear')
        }
        else{
            Warning(res.data);
        }
    }


    async function ConsultarFavorito(e){
        e.preventDefault();

        // console.log('productos', product);
        
        if(product[0].siFavorito == 0){
            handleAddItemToWishlist(e);
            product[0].siFavorito = 1;
        }
        else{

            let temp = {
                "idContacto": idcontacto,
                "idArticulo": product[0].id.toString(),
                "nombreWeb": product[0].nombreWeb,
                "idMiniSitio" : product[0].idMiniSitio
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
            product[0].siFavorito = 0;
        }
    }


    async function handleAddItemToCart(e, cant) {
        if (!isLogged) return Router.push('/loginpage/login_page');
        e.preventDefault();

        let cantidadProd = cantidad;

        if(product[0].soloBultos == 0 ){

            cantidadProd = cant
        }
        else{
            cantidadProd = product[0].soloBultos;
        }

        let temp = {
            "idMiniSitio": product[0].idMiniSitio,
            "IDcontacto": idcontacto,
            "idArticulo": product[0].codigo,
            "cantidad": cantidadProd,
            "tipoConsulta": 1
        }

        let res = await setCarritoAPI(temp);

        if(res.status === 200)
        {
            setCantidad(cantidadProd);
            Success(res.data.mensaje);
            // setDisable('bloquear');
            carthook();
            setSiOculto(true);
        }
        else if(res.status == 404){
            Warning(res.data.mensaje);
        }
    }

    async function ModificarProductoCarrito(cant){

        if (!isLogged) return Router.push('/loginpage/login_page');

        let temp = {

            "idMiniSitio": product[0].idMiniSitio,
            "iDcontacto": idcontacto,
            "idArticulo": product[0].codigo,
            "cantidad": cant,
            "tipoConsulta": 1
		}

        let res = await updateCarritoAPI(temp);

        if(res.status == 200){

            Success(res.data.mensaje);
            setCantidad(cant);
        }
        else if(res.status == 404){

            Warning(res.data.mensaje);
            setCantidad(product[0].cantidadEnCarrito);
        }
        else{
            MError(res.data.title);
        }
    }

    async function EliminarProductoCarrito(e){
        if (!isLogged) return Router.push('/loginpage/login_page');
		e.preventDefault();

        let temp = {

                "idMiniSitio": product[0].idMiniSitio,
                "iDcontacto": idcontacto,
                "idArticulo": product[0].codigo,
                "tipoConsulta": 1
        }

		let res = await delCarritoAPI(temp);

		if(res.status === 200)
        {
            Success(res.data.mensaje);
            carthook();
            setSiOculto(false);
			// loadproductos();
        }
        else{

            Warning(res.data.mensaje);
        }
    }

    async function SumarRestar(e, tipo){
        let dato = cantidad;

        if(product[0].soloBultos == 0 ){

            tipo == 's' ? dato++ : dato--;            
        }
        else{

            if(tipo == 's'){
                dato += product[0].soloBultos;
            }
            else{

                dato -= product[0].soloBultos;
            }
        }

        if(dato <= 0){
            dato = 0;
            EliminarProductoCarrito(e);
        }
        else{
            ModificarProductoCarrito(dato);
        }
    }

    async function CantidadManual(e){

        if(cantidad === Number(e.target.value)) return
        
        if(cantidad == 0) return EliminarProductoCarrito(e);

        if(isEmpty(cantidad)){
           Warning('Debe colocar un numero de producto');
           return;
        }

        if(product[0].soloBultos == 0 ){
            await ModificarProductoCarrito(cantidad);
        }
        else{

            if((cantidad % product[0].soloBultos) == 0){
                await ModificarProductoCarrito(cantidad);
            }
            else{
                setCantidad(product[0].soloBultos);
                Warning('Solo Admite Multiplos de: ' + product[0].soloBultos);
            }
        }
    }

    function onChange(e){
        let valor = SoloNumeros(e);
        setCantidad(valor);
    }

    function handleGuardarparadespues(e){
        // console.log(e)
    }

    let bultos = null;
    let oferta = null;
    let alerta;
    if (product && product.length > 0) {
        product.map((item) => {
            oferta = item.ofertas
            if (item.soloBultos > 0) {
                bultos = item.soloBultos
            }
        })
    }

    if (bultos != null || oferta != null) {
        alerta = <>
            {bultos != null &&
                <div className="alert alert-info" role="alert">
                    <strong>IMPORTANTE!</strong> Este articulo se vende solo en múltiplos de {bultos} unidades.
                </div>
            }
            {oferta != null && !!product.porcentajeDescuento &&
            <div className="alert alert-info" role="alert">
                <hr />
                <strong>OFERTAS</strong>
                <ul style={{ listStyleType: 'none' }} className="pl-3">
                    {
                        oferta.map((dato, key) => (
                            <li key={key}>{dato.bultoOferta} Bultos
                                por <strong className="px-2">{FormatNumber(dato.precioOferta)}</strong>
                            </li>
                        ))
                    }
                </ul>
            </div>
            }
        </>
    }
    return (
        <div className="borderAcions">
            <div className='d-flex align-items-center' style={{ paddingBottom: '30px', maxWidth: '400px'}}>
                <div style={{ flex: '0 0 44%', marginRight: '5px', padding: 0, maxWidth: '44%' }}>
                    {!siOculto 
                        ?
                            <button type='button' className='btn btn-amarillo BotonDetalleCarrito' onClick={(e) => handleAddItemToCart(e, 1)}>
                                Agregar producto
                            </button>
                        :
                            <div className='d-flex flex-column justify-content-center' style={{ flex: '0 0 45%' }}>

                                <div className='cantidadAgregar' style={{ flex: '0 0 45%'}}>

                                    <p className='cantidad' style={{marginBottom: 0, fontSize: '15px'}}>Cantidad</p>

                                    <div className={"form-group--number2 "}>

                                        <button className={"up"} onClick={(e) => SumarRestar(e, 's')}>
                                            <i className="fa fa-plus"></i>
                                        </button>

                                        <button className={"down"} onClick={(e) => SumarRestar(e, 'r')}>
                                            <i className="fa fa-minus"></i>
                                        </button>
                                        
                                        <input
                                            style={{ maxWidth: '100%' }}
                                            className={`form-control-number2`}
                                            type="text"
                                            placeholder={"1"}
                                            value={cantidad}
                                            onChange={(e) => onChange(e)}
                                            onBlur={(e) => CantidadManual(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                    }
                </div>
                <div style={{ flex: '0 0 44%', marginLeft: '5px', padding: 0 }}>
                    <button type='button' className="BotonDetalleCarrito btn btn-gris"  onClick={(e) => handleBuynow(e)}>
                            Comprar ahora
                    </button>
                </div>
                
                <div style={{ flex: '0 0 8%', minWidth: '30px', heigh: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '5px', padding: 0 }}>
                    <a onClick={(e) => ConsultarFavorito(e)}>
                        <i className={iheart} style={{ fontSize: '25px' }}></i>
                    </a>
                </div>

                {/* <div className='ps-product__shopping ml-2'>
                    <a className="ps-btn" onClick={(e) => handleBuynow(e)}>
                            Comprar ahora
                    </a>
                    <div className={`ps-product__actions`}>
                        <a onClick={(e) => ConsultarFavorito(e)}>
                            <i className={iheart}></i>
                        </a>
                    </div>
                </div> */}
            </div>
            {alerta}
        </div>
    );

}
export default connect((state) => state)(ModuleDetailShoppingActions);
