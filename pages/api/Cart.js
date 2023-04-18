import React from 'react'
import {BASE_PATH_PUBLICA, FAKE_SERVER, BASE_PATH_PUBLICA_FBP} from "../../utils/constant";
import {size, includes, remove, indexOf} from "lodash";
import useLogin from "/hooks/useLogin";
import 	{producto1, producto2, producto3, producto4, producto5,
	producto6, producto7, producto8, producto9, producto10,
	producto11, producto12, producto13, producto14, producto15,
	producto16, producto17, producto18, producto19, producto20} from '../../imgTemp/index'
import axios from "axios";


const url_base = BASE_PATH_PUBLICA + "/Api/v1/Carro/";
const url_base_fbp = BASE_PATH_PUBLICA_FBP + "/Api/v1/Utilidades";

//Trae los carritos que le corresponden al usuario
export async function getCarritoDisponible(idContacto){


	let idcont = idContacto == undefined ? window.localStorage.getItem('idContacto') : idContacto

	let productos = [];
	if(idcont != undefined && idcont != null){

		//console.log('contacto', idContacto);
		let token = window.localStorage.getItem('token');
		let head = {'Content-Type': 'application/json', 'token': token}
		// let data = {"IDcontacto" : idcont}
		let url = url_base_fbp + "CarritoDisponibles/"+ idcont;
		
		await axios.get(url, {headers:head})
		.then((res) =>{
			// //console.log(res);
			productos = res;

		}).catch((error) =>{
			productos = error.response;
		})
		
	}

	return productos;

}

//Funcionando con API Trae los productos de cada carrito
export async function getProductosAPI(idContacto, idMinisitio){


	let idcont = idContacto == undefined ? window.localStorage.getItem('idContacto') : idContacto

	let productos = [];
	if(idcont != undefined && idcont != null){

		// console.log('contacto', idContacto);
		let token = window.localStorage.getItem('token');
		let head = {'Content-Type': 'application/json', 'token': token}
		let data = {"iDcontacto" : idcont, "idMiniSitio": idMinisitio}
		let url = url_base_fbp + "GetCarro";

		// console.log();
		
		await axios.post(url, data, {headers:head})
		.then((res) =>{
			// console.log('API', res);
			productos = res;

		}).catch((error) =>{
			productos = error.response;
			// console.log('Error', productos);
		})
		
	}

	// console.log('productos ', productos)
	return productos;

}


//Funcionando con API Guarda los productos a carrito
export async function setCarritoAPI(producto){

	

	let token = window.localStorage.getItem('token');
	let head = {'Content-Type': 'application/json', 'token': token}
	let data = producto;
	let url = url_base_fbp + "insertArticulo";
	let response;

	// //console.log('API', producto.cantidad);
	// //console.log('carrito', producto)

	await axios.post(
		url,
		data, 
		{headers: head})
	.then((res) =>{
		response = res;
	})
	.catch((error) =>{
		response = error.response;
	})
	return response;
}


export async function updateCarritoAPI(producto){

	let token = window.localStorage.getItem('token');
	let head = {'Content-Type': 'application/json', 'token': token}
	let data = producto;
	let url = url_base_fbp + "UpdateArticulo";
	let response;

	await axios.post(
		url,
		data, 
		{headers: head})
	.then((res) =>{
		response = res;
	})
	.catch((error) =>{
		response = error.response;
	})
	return response;

}


//Funcionando con API Elimina el producto de carrito
export async function delCarritoAPI(producto){

	// //console.log(producto);
	let token = window.localStorage.getItem('token');
	let head = {'Content-Type': 'application/json', 'token': token}
	let data = producto;
	let url = url_base_fbp + "DeleteArticulo";
	let response;

	// //console.log(token, head, data, url);

	await axios.post(
		url,
		data,
		{headers: head})
	.then((res) =>{
		response = res;
	}).catch((error) =>{
		response = error.response;
	})

	return response;

}


//Procesar Carrito
export async function procesarCarro(producto){

	let token = window.localStorage.getItem('token');
	let head = {'Content-Type': 'application/json', 'token': token}
	let data = producto;
	let url = url_base_fbp + "ProcesarCarrito";
	let response;

	await axios.post(
		url,
		data,
		{headers: head})
	.then((res) =>{
		response = res;
	}).catch((error) =>{
		response = error.response;
	})

	return response;


}