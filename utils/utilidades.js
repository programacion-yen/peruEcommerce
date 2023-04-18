import { parseRelativeUrl } from "next/dist/shared/lib/router/utils/parse-relative-url";
import React from "react";

//formatear la URL
export function CrearUrl(product){

	let reg = /[_.,!@$%^&*()\-\/]+/g

	let word = product.nombre ? product.nombre.toLowerCase() : product.nombreWeb.toLowerCase();
	let simbol = word.replace(reg, '');
	let space = simbol.replace(/\s+/g, '_');
	let nom2 = space.split('_');
	let contador = 0;
	let urlTemp = '';

	while(contador <= 6 ){
		if(nom2[contador] !== undefined){
			urlTemp += nom2[contador] + '_';
		}
		contador++;
	}
	let codigo = product.codigo == undefined ? product.idarticulo : product.codigo
	let temp = urlTemp.substring(0, urlTemp.length - 1);
	let tempFinal = temp + '-' + codigo;

	return tempFinal;
}

export function FormatoPalabras(str) {

	let temp = str.replace(',', '');
	let word = temp.split(' ');
	let palabraFinal = '';
	let pal1;
	let pal2;
	let pal3;

	// //console.log(word);

	if(word.length === 3 && word[1].toLowerCase() == 'y'){

		pal1 = word[0];
		pal2 = word[1];
		pal3 = word[2];

		palabraFinal = pal1[0].toUpperCase() + pal1.substring(1).toLowerCase() + ' ' + pal2.toLowerCase() + ' ' + pal3[0].toUpperCase() + pal3.substring(1).toLowerCase();
		
	}
	else{

		if(word.length == 3){

			pal1 = word[0];
			pal2 = word[1];
			pal3 = word[2];

			palabraFinal = pal1[0].toUpperCase() + pal1.substring(1).toLowerCase() + ' ' +  pal2[0].toUpperCase() + pal2.substring(1).toLowerCase() + ' ' + pal3[0].toUpperCase() + pal3.substring(1).toLowerCase();

		}
		else if(word.length == 2){

			pal1 = word[0];
			pal2 = word[1];

			palabraFinal = pal1[0].toUpperCase() + pal1.substring(1).toLowerCase() + ' ' + pal2[0].toUpperCase() + pal2.substring(1).toLowerCase();

		}
		else{
			
			pal1 = word[0];

			palabraFinal = pal1[0].toUpperCase() + pal1.substring(1).toLowerCase();

		}
	}

	return palabraFinal;
}

export function FormatNumber(number) {
	return new Intl.NumberFormat("es-CL", {currency: 'CLP', style: 'currency'}).format(number);
}

export function SoloNumeros(e){
	let valor = e.target.value.replace(/\D/g, "");
	return valor;
}

export function getNotificationStyle(type) {
	return {
	  success: {
		color: 'rgba(0, 0, 0, 0.65)',
		border: '1px solid #b7eb8f',
		backgroundColor: '#f6ffed'
	  },
	  warning: {
		color: 'rgba(0, 0, 0, 0.65)',
		border: '1px solid #ffe58f',
		backgroundColor: '#fffbe6'
	  },
	  error: {
		color: 'rgba(0, 0, 0, 0.65)',
		border: '1px solid #ffa39e',
		backgroundColor: '#fff1f0'
	  },
	  info: {
		color: 'rgba(0, 0, 0, 0.65)',
		border: '1px solid #91d5ff',
		backgroundColor: '#e6f7ff'
	  }
	}[type]
}

//Metodos para asignar la ubicacion horizontal utilizada en los componentes de estructura web
export function ClaseUbicacionHorizontal(sl){

	let claseHor = "d-flex ";

	//Linea
	if(sl[0].alineacionHorizontal == 1){
		claseHor += "justify-content-start";
	}

	if(sl[0].alineacionHorizontal == 2){
		claseHor += "justify-content-center";
	}

	if(sl[0].alineacionHorizontal == 3){
		claseHor += "justify-content-end";
	}

	return claseHor;
}

// export function ClaseUbicacionVertical(cantidad){


// }
export function ClaseColumnas(cantidad){

	let claseCol = "";

	if(cantidad == 1){
		claseCol = "col-12";
	}

	if(cantidad == 2){
		claseCol = "col-6";
	}

	if(cantidad == 3){
		claseCol = "col-4";
	}

	if(cantidad == 4){
		claseCol = "col-3";
	}
	
	if(cantidad == 5){
		claseCol = "col-2";
	}

	return claseCol;

}

//Cargo las im agenes correspondientes a cada slider para mostrarlos
export function ArrayImagenes(img){

	let images = [];
	let images0 = [];
	let images1 = [];
	let images2 = [];
	let images3 = [];
	let images4 = [];
	let images5 = [];
	
	// console.log('utilidades', img);

	img.map((item) =>{

		if(item.columnaUbicacionGrafica == 1){
			images0.push(item)
		}

		if(item.columnaUbicacionGrafica == 2){
			images1.push(item)
		}

		if(item.columnaUbicacionGrafica == 3){
			images2.push(item)
		}

		if(item.columnaUbicacionGrafica == 4){
			images3.push(item)
		}
	  
		if(item.columnaUbicacionGrafica == 5){
			images4.push(item)
	  	}

		if(item.columnaUbicacionGrafica == 6){
			images5.push(item)
	  	}		 

	});

	for(let i = 0; i < 1; i++){

		if(images0.length > 0){
			images.push(images0);
		}

		if(images1.length > 0){
			images.push(images1);
		}

		if(images2.length > 0){
			images.push(images2);
		}

		if(images3.length > 0){
			images.push(images3);
		}

		if(images4.length > 0){
			images.push(images4);
		}

		if(images5.length > 0){
			images.push(images5);
		}

	}

	return images;

}

export function ClaseColumnasBanner(cantidad){

	let claseCol = "";

	if(cantidad == 1 || cantidad == 2){

		claseCol = "col-4";
	}

	if(cantidad == 3){
		claseCol = "col-6";
	}

	if(cantidad == 4){
		claseCol = "col-10";
	}
	
	if(cantidad == 5){
		claseCol = "col-12";
	}

	return claseCol;
}

// export function ClaseUbicacionHorizontalBanner(bn){
// 	let claseHor = "d-flex ";

// 	//Linea
// 	if(sl[0].alineacionHorizontal == 1){
// 		claseHor += "justify-content-start";
// 	}

// 	if(sl[0].alineacionHorizontal == 2){
// 		claseHor += "justify-content-center";
// 	}

// 	if(sl[0].alineacionHorizontal == 3){
// 		claseHor += "justify-content-end";
// 	}

// 	return claseHor;
// }