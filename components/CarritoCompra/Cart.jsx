import React, { useEffect, useState } from 'react';
//import router, { Router, useRouter } from 'next/router';
import useLogin from '/hooks/useLogin';
import useGlobal from '/hooks/useGlobal';
import Link from 'next/link';
import {getProductosAPI, delCarritoAPI, getCarritoDisponible, updateCarritoAPI} from '../../pages/api/Cart';
import {Table} from 'antd';	
// import {icon1} from '../../imgTemp/IconTemp/index';
import {delProductosFavAPI, setProductosFavAPI} from '../../pages/api/WishList';
import { Success, Warning, MError } from '/utils/Notificaciones';
// import { SoloNumeros } from '/utils/utilidades';
import { FormatNumber } from '/utils/utilidades';
import { isEmpty, orderBy } from 'lodash';
import Enumerable from 'linq';
import { useContext } from 'react';
import Context from '../../context/UserContext';

export default function Cart({ myAccount }) {

	const {isLogged, premium, scott, idcontacto, carthook, favhook} = useLogin();
	const {procesarCarritoHook} = useGlobal()
	const { idContacto } = useContext(Context)

	//Nuevas variables para el carrito con minisitios
	const [idMSitio, setidMSitio] = useState(0);
	const [tabs, setTabs] = useState([]);
	const [prod, setProd] = useState([]);

	const [subTotal, setSubTotal] = useState(0);
	const [iva, setIva] = useState(0);
	const [total, setTotal] = useState(0);

	const [dis, setDis] = useState(false);

	// const [cantidad, setCantidad] = useState(0);
	// const [arrayCantidad, setArrayCAntidad] = useState([]);

	const [windowWidth, setWindowWidth] = useState(600)

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

	// let idcont;
	let tempFinal;
	let TotalProducto = 0;


	//Codigo para el nuevo carrito
	async function CargaInicial(){
		let tab =  await getCarritoDisponible(idContacto);
		let tb = tab.data;

		let tb2 = Enumerable.from(tb).orderBy(s => s.idMiniSitio).toArray();
		
		await CargarTabs(tb2);
	}

	async function CargarTabs(tab){
		let final = [];
		let activo = false;

		let tabTemp = Enumerable.from(tab)
		.select(tt => ({
			idMiniSitio: tt.idMiniSitio,
			nombre: tt.nombre,
			activo: "",
			logo: tt.logo,
		})).toArray();

		tabTemp.map((item) =>{

			if(activo == false){

				item.activo = 'active'
				activo = true;
			}

			final.push(item);
		})

		setTabs(final);
		CargarProductos(final[0].idMiniSitio);
	}

	useEffect(async () => {
		await CargaInicial();
	}, []);

	//#region Metodos CRUD

	async function CargarProductos(idMinisitio){

		let producto = await getProductosAPI(idContacto, idMinisitio);

		if(producto.status == 200){
			const productos = producto.data.map( item => ({ ...item, key: item.idArticulo }))
			setProd(productos);

			setidMSitio(idMinisitio);

			if(producto.data.length > 0){
				setDis(true);
			}else{
				setDis(false);
			}

			producto.data.map((item) =>{
				TotalProducto += item.totalVentaLinea;	
			});

			CargarTotalesPorCarro(TotalProducto);
		}

	}

	async function ModificarProductoCarrito(cant, item){

    let temp = {
			"idMiniSitio": item.idMiniSitio,
			"iDcontacto": idcontacto,
			"idArticulo": item.idArticulo,
			"cantidad": cant,
			"tipoConsulta": 1
		}

    let res = await updateCarritoAPI(temp);

		if(res.status == 200){

			CargarProductos(item.idMiniSitio);
			Success(res.data.mensaje);
			
		}
		else if(res.status == 404){

			Warning(res.data.mensaje);

		}
		else{
			MError(res.data.mensaje);
		}

	}

	//Nuevo metodo eliminar
	async function EliminarProductoCarrito(e,producto){

		e.preventDefault();

		let temp = {
			"idMiniSitio": producto.idMiniSitio,
			"iDcontacto": idcontacto,
			"idArticulo": producto.idArticulo,
			"tipoConsulta": 0
		}

		let res = await delCarritoAPI(temp);

		if(res.status === 200)
			{
				Success('Eliminado el producto de carrito');
				CargarProductos(producto.idMiniSitio);
				carthook();
			}
			else{
				Warning('No se pudo ELiminar el producto');
			}

	}

	const ToggleFavorito = (e, producto) => {
		e.preventDefault();

		if( producto.siEsFavorito == 0 ) {
			AgregarFavorito(producto);
		} else if ( producto.siEsFavorito == 1 ) {
			EliminaProductoFavorito(producto);
		}

	}

	//Agrega a favoritos
	async function AgregarFavorito(producto){

		let temp = {
			"idContacto": idcontacto,
			"idArticulo": producto.idArticulo,
			"nombreWeb": producto.nombreWeb,
			"idMiniSitio" : producto.idMiniSitio
    }

		let res = await setProductosFavAPI(temp);

		if(res.status === 200){
			Success(res.data);
			favhook();

			// Se cambia el estado, para actualizar el icono
			const updatedProd = prod.map( item => {
				if(item.idArticulo == producto.idArticulo) {
					return {
						...item,
						siEsFavorito: 1
					}
				} else {
					return item
				}
			})
			setProd(updatedProd);

		} else {
			Warning(res.data);
		}

	}

	async function EliminaProductoFavorito(producto) {

		let temp = {
			"idContacto": idcontacto,
			"idArticulo": producto.idArticulo,
			"nombreWeb": producto.nombreWeb,
			"idMiniSitio" : producto.idMiniSitio
		}

		let res = await delProductosFavAPI(temp);

		if(res.status === 200){
			Success(res.data);
			favhook();

			// Se cambia el estado, para actualizar el icono
			const updatedProd = prod.map( item => {
				if(item.idArticulo == producto.idArticulo) {
					return {
						...item,
						siEsFavorito: 0
					}
				} else {
					return item
				}
			})
			setProd(updatedProd);

		} else {
			Warning(res.data);
		}

	}

	async function SumarRestar(e, cant, item, tipo){

		e.preventDefault();

		let dato = item.cantidad;

		if(item.soloBultos == 0 ){

			tipo == 's' ? dato++ : dato--;  

		} else {

			if(tipo == 's'){
				dato += item.soloBultos;
			} else {
				dato -= item.soloBultos;
			}

		}
		
		if(dato == 0){
			EliminarProductoCarrito(e, item);
		} else {
			ModificarProductoCarrito(dato, item);
		}
	}

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
        return tempFinal =  temp;
    }

	function CargarTotalesPorCarro(subtotal){

		let subt = Number(subtotal);
		let iva = (19 * subtotal) / 100;
		iva = Number(iva);
		let total = iva + subtotal;
		total = Number(total);

		setSubTotal(subt);
		setIva(iva);
		setTotal(total);
	}

	//Para cambiar el valor de carrito
	async function CantidadManual(e, item){
		
		let cantidadInput = e.target.value;

		if(cantidadInput == 0) return EliminarProductoCarrito(e, item);

		if(isEmpty(cantidadInput)){
			Warning('Debe colocar un numero de producto');
			return;
		}

		if(item.soloBultos == 0 ){

			await ModificarProductoCarrito(cantidadInput, item);

		} else {

			if((cantidadInput % item.soloBultos) == 0){
				await ModificarProductoCarrito(cantidadInput, item);
			} else {
				
				const updatedProd = prod.map( product => {
					if( product.idArticulo == item.idArticulo && product.idMiniSitio == item.idMiniSitio ) {
		
						return {
							...product,
							cantidad: Number(product.soloBultos)
						} 
		
					} else {
						return product
					}
				})
		
				setProd(updatedProd);

				Warning('Solo Admite Multiplos de: ' + item.soloBultos);
			}

		}
	}

  function onChange(e, item){

		const updatedProd = prod.map( product => {
			if( product.idArticulo == item.idArticulo && product.idMiniSitio == item.idMiniSitio ) {

				return {
					...product,
					cantidad: Number(e.target.value)
				} 

			} else {
				return product
			}
		})

		setProd(updatedProd);

  }

	function ProcesarCarrito(){

		let procesar = [];
		let valores = [];
		
		valores.push(subTotal);
		valores.push(iva);
		valores.push(total);

		procesar.push(valores);
		procesar.push(prod);
		procesar.push(idMSitio);

		procesarCarritoHook(procesar);


	}

	const Columns = [
		{
			title: `Productos (${prod.length})`,
			dataIndex: 'nombre',
			render: (text, item) =>(
				<>
					<Link href={`/details/${item.idMiniSitio}/${urlWishlist(item.nombre.toLowerCase())+ '-'+`${item.idArticulo}`}`} key={item.idArticulo}>
						<a style={{ display: 'flex', alignItems: 'center'}}>
							<div className='divCartImgWeb'>
								<img src={item.imagen} alt="" style={{ display: 'block', maxHeight: '100%', width: 'auto' }} />
							</div>
							<div>
								<span style={{fontWeight:'bold'}}>{'SKU ' + item.idArticulo}</span>
									<span><p>{text}</p></span>
							</div>
						</a>
					</Link>
        </>
			)
		},
		{
			title: 'Precio',
			dataIndex:'precioVentaFinal',
			// width:150,
			className: 'text-center',
			render: (text, item) => (
				<>
					{text < item.precioVentaOriginal ? 
					
						<div className='d-flex flex-column' >
							<span className='tachedText'>{FormatNumber(item.precioVentaOriginal)}</span>
							<span className='newPrice'>{FormatNumber(text)}</span>
						</div>

			     	:
					 	<a>{FormatNumber(text)}</a>
				 	}
				</>
			)
		},
		{
			title: 'Cantidad',
			dataIndex: 'cantidad',
			// width: 150,
			className: 'text-center',
			render:(text, item) =>(
				<>
					<div className='mb-2 rowCantidadCarrito'>
						<div className={"form-group--number2"} style={{ width: '100%' }}>
								<button className={"up"} onClick={(e) => SumarRestar(e, item.cantidad, item , 's')}>
									<i className="fa fa-plus"></i>
								</button>

								<button className={"down"} onClick={(e) => SumarRestar(e, item.cantidad, item, 'r')}>
									<i className="fa fa-minus"></i>
								</button>
								
								<input
									style={{ maxWidth: '100%' }}
									className={'form-control-number2'}
									type="text"
									// placeholder={"1"}
									value={item.cantidad}
									onChange={(e) => onChange(e, item)}
									onBlur={(e) => CantidadManual(e, item)}
								/>
						</div>
					</div>
				</>
			)
		},
		{
			title: 'Total',
			dataIndex:'totalVentaLinea',
			className: 'text-center',
			render: text => <a>{FormatNumber(text)}</a>
		},
		{
			title: 'Accion',
			key:'action',
			// width: 120,
			className: 'text-center',
			render:(text, item) =>(
				<div className="d-flex justify-content-around">
					<a onClick={(e) => ToggleFavorito(e, item)} id={item.idArticulo} style={{ minWidth: '32px'}}>
						<img src={ item.siEsFavorito == 0 ? '/logo/favorite.svg' : '/logo/favorite-filled.svg' } height='32px' width='32px' />
					</a>
					<a onClick={(e) => EliminarProductoCarrito(e, item)}>
						<i className="icon-cross IconSize"></i>
					</a>
				</div>
			)

		}
	];

	const mobileColumns = [
		{
			title: `Productos (${prod.length})`,
			dataIndex: 'nombre',
			render: (text, item) =>(
				<div style={{ display: 'flex' }}>

					<Link href={`/details/${item.idMiniSitio}/${urlWishlist(item.nombre.toLowerCase())+ '-'+`${item.idArticulo}`}`} key={item.idArticulo}>
						<a style={{ display: 'flex', alignItems: 'center' }}>
							<div style={{ height: '100px', aspectRatio: '1/1', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
								<img src={item.imagen} alt="" style={{ display: 'block', maxHeight: '100%', width: 'auto' }} />
							</div>
						</a>
					</Link>

					<div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

						<div style={{ position: 'absolute', right: 5, top: 10, display: 'flex' }}>
							<a onClick={(e) => ToggleFavorito(e, item)} id={item.idArticulo} style={{ minWidth: '26px', marginRight: '5px'}}>
								<img src={ item.siEsFavorito == 0 ? '/logo/favorite.svg' : '/logo/favorite-filled.svg' } height='26px' width='26px' />
							</a>
							<a onClick={(e) => EliminarProductoCarrito(e, item)}>
								<i className="icon-cross" style={{ fontSize: '24px' }}></i>
							</a>
						</div>

						<span style={{fontWeight:'bold', marginTop: '10px' }}>{'SKU ' + item.idArticulo}</span>
						<span style={{ margin: 0, fontSize: '13px'}}>{text}</span>

						{
							item.precioVentaFinal < item.precioVentaOriginal 
								? 
									<div className='d-flex flex-column' >
										<span className='tachedText'>{FormatNumber(item.precioVentaOriginal)}</span>
										<span className='newPrice' style={{fontWeight:'bold'}}>{FormatNumber(item.precioVentaFinal)}</span>
									</div>

								:	
									<span style={{fontWeight:'bold'}}>{FormatNumber(item.precioVenta)}</span>
						}

						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<div className='mb-2 rowCantidadCarrito'>
								<div className={"form-group--number2"} style={{ width: '100%' }}>
										<button className={"up"} onClick={(e) => SumarRestar(e, item.cantidad, item , 's')}>
											<i className="fa fa-plus"></i>
										</button>

										<button className={"down"} onClick={(e) => SumarRestar(e, item.cantidad, item, 'r')}>
											<i className="fa fa-minus"></i>
										</button>
										
										<input
											style={{ maxWidth: '100%' }}
											className={'form-control-number2'}
											type="text"
											// placeholder={"1"}
											value={item.cantidad}
											onChange={(e) => onChange(e, item)}
											onBlur={(e) => CantidadManual(e, item)}
										/>
								</div>
							</div>
						</div>
						
					</div>
        </div>
			)
		},
	];

	//#endregion
	
	return (
		<>
			<div style={{ display: 'flex', flex: 1 }}>
				{ 
					myAccount && 
						<h4 className="formDetailsTitleMenu" style={{ textAlign: 'center', margin: 0, padding: '10px 20px' }}>
							Carrito de Compras <img src='/logo/shopping-cart-wh.svg' height='30px' />
						</h4>
				}

				<div className="nav cartNav nav-tabs" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ justifyContent: 'center', border: 0, flex: 1 }}>
					<div className={ myAccount ? '' : 'containerMarcasCarrito'  } style={{ display: 'flex', justifyContent: myAccount ? 'flex-end' : 'center' , flex: 1, flexFlow: 'wrap' }}>
						{
							tabs.map((item, key) =>
								<button 
									className={"nav-link nav-carrito border btnNavCarrito " + item.activo}
									onClick={() =>CargarProductos(item.idMiniSitio)} 
									id={"nav-"+item.nombre.replace(/\s+/g, '')+"-tab"} 
									data-bs-toggle="tab" 
									data-bs-target={"#nav-"+ item.nombre.replace(/\s+/g, '')} 
									role="tab" 
									aria-controls={"nav-"+ item.nombre.replace(/\s+/g, '')}
									aria-selected="true" key={key}
								>
									<img src={item.logo} className='logoTabMyAccount' />
								</button>
							)
						}
					</div>
					
				</div>
			</div>

			<div className="tab-content p-0 mt-4" id="nav-tabContent">
				<Table columns={ windowWidth > 576 ? Columns : mobileColumns } dataSource={prod} pagination={{pageSize: 4,showSizeChanger: false,responsive:true}} className='tablaCarrito'></Table>
			</div>


			{
				windowWidth > 576 
					?
						<div className='d-flex'>
							{/*Volver a home*/}
							<div className="ps-section__cart-actions col-lg-6 p-0 pt-5 pl-3">
								<Link href="/"><a style={{height:'50px'}} className="ps-btn">Seguir Comprando</a></Link>
							</div>
			
							{/*Boton de procesar carrito*/}
							<div className="ps-section__footer col-lg-6">
								<div className="row justify-content-end pt-5">
									<div className="ps-block--shopping-total col-lg-8 m-0">
										<div className="ps-block__header">
											{
                        subTotal < 80000 &&
													<>
                          	<p style={{ margin: 0, textAlign: 'center', fontWeight: 600, color: 'red' }}>Recuerde que para realizar una compra debe ser mínimo de $80.000 neto</p>
														<hr />
													</>
                      }
											<p style={{ margin: 0, fontWeight: 600, color: 'black' }}>Subtotal <span style={{ fontWeight: 600, color: 'black' }}>{FormatNumber(subTotal)}</span></p>
											<p style={{ fontWeight: 600, color: 'black' }}>Iva <span style={{ fontWeight: 600, color: 'black' }}>{FormatNumber(iva)}</span></p>
										</div>
										<div className="ps-block__content">
											<h3>Total <span>{FormatNumber(total)}</span></h3>
										</div>
									</div>
			
									{
										dis == true && subTotal > 80000
											? 	
												<Link href="/carritoCompra/procesarcarrito" replace>
													<button type='button' className="ps-btn ps-btn--fullwidth text-white col-lg-8" onClick={(e) => ProcesarCarrito()} disabled={subTotal < 80000}>
														Procesar Carrito
													</button>
												</Link>
											: <></>
									}
			
								</div>
							</div>
						</div>
					: 
						<div style={{ padding: '0 5%'}}>
							<p style={{ fontSize: '16px' }}>Resumen de compra</p>
							<div style={{ backgroundColor: '#f1f1f1', padding: '10px 20px' }}>
								{
									subTotal < 80000 &&
										<>
											<p style={{ margin: 0, textAlign: 'center', fontWeight: 600, color: 'red' }}>Recuerde que para realizar una compra debe ser mínimo de $80.000 neto</p>
											<hr />
										</>
								}
								<p style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: 'black' }}>Subtotal <span style={{ float: 'right'}}>{FormatNumber(subTotal)}</span></p>
								<p style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: 'black' }}>Iva <span style={{ float: 'right'}}>{FormatNumber(iva)}</span></p>
								<hr />
								<h3 style={{ fontSize: '18px' }}>Total <span style={{ float: 'right', color: 'red', fontWeight: 600 }}>{FormatNumber(total)}</span></h3>

								{
									subTotal > 80000 &&
										<Link href="/carritoCompra/procesarcarrito">
											<button type='button' className='btn btn-lg btn-block mt-4 procesarCarritobtn' onClick={(e) => ProcesarCarrito()}>Procesar carrito</button>
										</Link>
								}
								
								<Link href="/">
									<button type='button' className='btn btn-lg btn-block my-4 btnSubmitMyAccount'>Seguir comprando</button>
								</Link>
							</div>
						</div>
			}


		</>

	)
}
