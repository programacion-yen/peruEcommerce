import { useState } from "react";
import {FAKE_SERVER, BASE_PATH_PUBLICA, BASE_PATH_PUBLICA_FBP} from "../../utils/constant";
import axios from "axios";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import useLogin from "/hooks/useLogin";

const favoritosUrl= BASE_PATH_PUBLICA_FBP + '/Api/v1/Favoritos/';

//Funcionando
export async function getProductosFavAPI(){

	let temp = [];
	let idCont = window.localStorage.getItem('idContacto');
	const token = window.localStorage.getItem('token');
	let url = favoritosUrl + `GetCatalogoFavoritos/${idCont}`;
	let head = {'Content-Type': 'application/json', 'token': token}

	await axios.get(
		url, 
		{headers:head})
	.then((data) =>{
		temp = data;
	}).catch((error) =>{
	})

	return temp.data;
}

//Funcionando
export async function setProductosFavAPI(producto){

	const token = window.localStorage.getItem('token');
	let url = favoritosUrl + 'InsetFavoritos';
	let head = {'Content-Type': 'application/json', 'token': token}
	let data = producto;
	let response;

	// console.log('api',url);

	await axios.post(
		url,
		data,
		{headers: head}
		).then((res) =>{
			response = res;
		}).catch((error) =>{
			response = error.response;
	})
	// console.log('API', response);


	return response;
}

//Funcionando
export async function delProductosFavAPI(producto){

	const token = window.localStorage.getItem('token');
	let url = favoritosUrl + 'DeleteFavoritos';
	let head = {'Content-Type': 'application/json', 'token': token}
	let data = producto;
	let response;

	await axios.post(
		url,
		data,
		{headers: head}
	).then((data) =>{
		response = data;
	}).catch((error) =>{
		response = error.response;
	})

	return response;

}