import React, {useEffect, useState} from 'react'
import useLogin from '/hooks/useLogin';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Modal, Tooltip,  Popconfirm} from 'antd';
// import Compare from '/components/partials/account/Compare'
import { setProductosFavAPI} from '../../pages/api/WishList';
import { setCarritoAPI, delCarritoAPI, updateCarritoAPI} from '../../pages/api/Cart';
import { Success, Warning, MError } from '../../utils/Notificaciones';
import { CrearUrl } from '../../utils/utilidades'
import { SoloNumeros } from '../../utils/utilidades'
import { producto1 } from '../../imgTemp';
import { isEmpty } from 'lodash';

let arrayProduct = [];
// const procesar = (id) => {
//     let idProduct = id;
//     if (idProduct != undefined && idProduct != null) {
//         arrayProduct.push(id)
//     }
//     return arrayProduct.length
// }
const Icons = ({product,slider,textSliders,classesCenter}) => {

    const {isLogged, favhook, carthook, idcontacto} = useLogin();
    const [icart, setIcart] = useState('');
    const [disable2, setDisable2] = useState('');
    const [url, setUrl] = useState('');
    const [modal, setModal] = useState(false);
    const [cantidad, setCantidad] = useState(0);


    const [siOculto, setSiOculto] = useState(false);
    const [disable, setDisable] = useState('');
    const Router = useRouter();


    useEffect(() =>{

        if(product.siEnCarrito == 1){

            setSiOculto(true);
            setCantidad(product.cantidadEnCarrito);
        }

        setIcart('icon-box');
        UrlProducto();

    },[])


    function UrlProducto(){
        let temp = CrearUrl(product);
        setUrl(temp);
    }

    function ocultarIcono(e){
        siOculto(true);
    }

    async function GuardarCarrito(e, cant) {
        if (!isLogged) return Router.push('/loginpage/login_page');
        e.preventDefault();
        let cantidadProd = cantidad;

        if(product.soloBultos == 0 ){
            cantidadProd = cant       
        }
        else{
            cantidadProd = product.soloBultos;
        }

        let temp = {
            "idMiniSitio": product.idMiniSitio,
            "IDcontacto": idcontacto,
            "idArticulo": product.codigo,
            "cantidad": cantidadProd,
            "tipoConsulta": 1
        }

        let res = await setCarritoAPI(temp);
        if(res.status === 200)
        {
            setCantidad(cantidadProd);
            Success(res.data.mensaje);
            setDisable2('bloquear');
            carthook();
            setSiOculto(true);
        }
        else{
            MError(res.data.mensaje);
        }


    }

    async function EliminarProductoCarrito(e){
        if (!isLogged) return Router.push('/loginpage/login_page');
		e.preventDefault();
		let temp = {

            "idMiniSitio": product.idMiniSitio,
            "iDcontacto": idcontacto,
            "idArticulo": product.codigo,
            "tipoConsulta": 1
		}

		let res = await delCarritoAPI(temp);

		if(res.status === 200)
        {
            Success(res.data.mensaje);
            carthook();
            setSiOculto(false);
        }
        else{

            MError(res.data.mensaje);
        }
    }

    async function ModificarProductoCarrito(cant){

        if (!isLogged) return Router.push('/loginpage/login_page');

        let temp = {

            "idMiniSitio": product.idMiniSitio,
            "iDcontacto": idcontacto,
            "idArticulo": product.codigo,
            "cantidad": cant,
            "tipoConsulta": 1
		}

        let res = await updateCarritoAPI(temp);
        let canti = cantidad
        if(res.status == 200){
            Success(res.data.mensaje);
            
            setCantidad(cant);
        }
        else if(res.status === 404){
            
            Warning(res.data.mensaje);
            setCantidad(product.cantidadEnCarrito);
            
        }
        else{
            MError(res);
        }

    }

    async function CantidadManual(e){

        let cantidadProd = 0;

        if(cantidad == 0) return EliminarProductoCarrito(e);

        if(isEmpty(cantidad)){
           Warning('Debe colocar un numero de producto');
           return;
        }

        if(product.soloBultos == 0 ){

            cantidadProd = cantidad;
            await ModificarProductoCarrito(cantidadProd);
        }
        else{

            if((cantidad % product.soloBultos) == 0){

                cantidadProd = cantidad;
                await ModificarProductoCarrito(cantidadProd);
            }
            else{

                cantidadProd = product.soloBultos;
                setCantidad(product.soloBultos);
                Warning('Solo Admite Multiplos de: ' + product.soloBultos);
            }
        }
    }

    async function SumarRestar(e, tipo){

        let dato = cantidad;

        if(product.soloBultos == 0 ){

            tipo == 's' ? dato++ : dato--;            
        }
        else{

            if(tipo == 's'){
                dato += product.soloBultos;
            }
            else{

                dato -= product.soloBultos;
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

    function onChange(e){
        let valor = SoloNumeros(e);
        setCantidad(valor);
    }

    // const handleToDetail = (e) => {
    //     e.preventDefault();
    //     if (!product) return;
    //     return Router.push(`${product.id}`)
    // };

    return (
        <>
            {!siOculto ?
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-outline-best BotonVistaGeneral col-12' onClick={(e) => GuardarCarrito(e, 1)} >Agregar al carrito</button>
                </div>
                :
                    <div className={`d-flex ${classesCenter == '' ? '' :'justify-content-center' }`}>
                        <figure className='d-flex flex-column justify-content-center' style={{ maxWidth: '100%' }}>

                            <div className='mb-2 cantidadAgregar'>

                                <p className='cantidad' style={{marginBottom: 0, fontSize: '15px'}}>Cantidad</p>

                                <div className={"form-group--number2 " + disable} style={{ }}>

                                    <button className={"up"} onClick={(e) => SumarRestar(e, 's')}>
                                        <i className="fa fa-plus"></i>
                                    </button>

                                    <button className={"down"} onClick={(e) => SumarRestar(e, 'r')}>
                                        <i className="fa fa-minus"></i>
                                    </button>
                                    
                                    <input
                                        style={{ maxWidth: '100%' }}
                                        className={`form-control-number2 ${slider && slider}`}
                                        type="text"
                                        placeholder={"1"}
                                        value={cantidad}
                                        onChange={(e) => onChange(e)}
                                        onBlur={(e) => CantidadManual(e)}
                                    />
                                </div>
                            </div>
                        </figure>
                    </div>
                
            }
    </>
    )


}
export default Icons;
