import {BASE_PATH_PUBLICA, BASE_PATH_PUBLICA_FBP} from "../../utils/constant";
import axios from "axios";
// import login from "../../services/login";
// import Enumerable from "linq";

import repositories from '/repositories/Repository';

const {requestOptions, serializeQuery} = repositories()

// const url_base = BASE_PATH_PUBLICA + "/Api/v1/Utilidades";
const url_base_fbp = BASE_PATH_PUBLICA_FBP + "/Api/v1/Utilidades";

//trae los Mini Sitios
export async function getMiniSitios(idContacto, tipoConsulta = 0){
	let miniSitios = [];
	let iDContacto = idContacto != null ? idContacto : ''
	const token =  window.localStorage.getItem('token');

	let url = `${url_base_fbp}/getMiniSitios/${tipoConsulta}/${iDContacto}`;
	let config = {
		headers:{
			"Content-Type": "application/json",
			"Token":token
			}
		}
	await axios.get(url,config)
	.then((res) =>{
		miniSitios = res;
	})
	.catch((error) => {})

	return miniSitios.data;
}

//Consultar si la pagina esta en mantenimiento
export async function getServidorMensaje(idMiniSitio){

	let mantencion = false;
	let url = `${url_base_fbp}/getEstadosMiniSitios/${idMiniSitio}`;

	await axios.get(url)
		.catch((error) => {
			// if(error.response.status == 503){
			// 	mantencion = true;
			// }
			mantencion = true;
		})
	return mantencion;

}

//Traigo la estructura del mini sitio
export async function getEstructuraMSitios(idMiniSitio, idPublicacion){

	let estructura = [];
	const token = window.localStorage.getItem('token');

	// Si viene idPublicacion se adjunta como parametro
	let url = `${url_base_fbp}/getEstructuraMiniSitios/${idMiniSitio}${idPublicacion ? `?idPublicacion=${idPublicacion}` : ''}`

	if(token){
		const config = {headers:{ "Content-Type": "application/json", "Token": token}}
		await axios.get(url, config)
		.then((res) =>{
			estructura = res;
		})
		.catch((error) => {
			estructura = error.response;
		})
	} else {
		await axios.get(url)
		.then((res) =>{
			estructura = res;
		})
		.catch((error) => {
			estructura = error.response;
		})
	}

	return estructura

}

// Consulta banners/sliders minisitios
export async function getSliderBannerMSitios(items){
	const idPublicacion = sessionStorage.getItem('idPublicacion')
	let estructura = [];
	let url = `${url_base_fbp}/getEstructuraMiniSitios/1?${serializeQuery(items)}${idPublicacion ? `&idPublicacion=${idPublicacion}` : ''}`;
	await axios.get(url)
	.then((res) =>{
		estructura = res.data;
	})
	.catch((error) => {
		estructura = error.response;
	})

	return estructura

}


export async function getProductosMinistios(idMinisitio){

	const token = window.localStorage.getItem('token');
	let listProduct = [];
	let config = {headers:{ "Content-Type": "application/json", "Token": token}}
	let url2 = BASE_PATH_PUBLICA_FBP + `/api/v1/Catalogo/?TipoConsulta=0&IDSitio=${idMinisitio}`;

	await axios.get(url2, config)
	.then((res) =>{

		listProduct.push(res);
	}).catch(error =>{

		listProduct.push(error.response);
	})

	return listProduct;

}