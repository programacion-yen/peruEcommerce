import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Enumerable from 'linq';

export default function Ebanner({ListaBanner}){

	const [ubicacionBanner, setUbicacionBanner] = useState([]);
	const [imagenes, setImagenes] = useState([]);

	function OrdenarBanner(){

		if(ListaBanner == undefined){
			return;
		}

		let posicion = [];

		posicion = setUbicacion();
		// console.log(posicion);
		UbicacionBanner(posicion);
	}

	//Saco las "Especificaciones" paramostrar en cabecera
	function setUbicacion(){

		let dato = Enumerable.from(ListaBanner)
					.select(s =>({
						ColumnaUbicacion: s.columnaUbicacionGrafica,
						Alineacion: s.alineacionHorizontal
					})).toArray();

		return dato;

	}

	//Coloco las clases necesarias para mostrar la cabecera
	function UbicacionBanner(listaUbicacion){

		let posicion = [];
		let posicionFinal = '';

		posicion.push(UbicacionColumna(listaUbicacion[0].ColumnaUbicacion));
		posicion.push(AlineacionFila(listaUbicacion[0].Alineacion));
		posicionFinal = posicion[0] + posicion[1];
		setUbicacionBanner(posicionFinal);

	}

	//Agrego la clase correspondiente a columna
	function UbicacionColumna(Columna){

		let columna = '';

		switch(Columna){

			case 1:
				columna = 'd-flex col-12';
			break;

			default:
				columna = 'col-12';
			break;
		}

		return columna;
	}

	//Agrego la clase correspondiente a la alineacion de la fila
	function AlineacionFila(Alineacion){

		let alineacion = '';

		switch(Alineacion){

			case 1:
				alineacion =' justify-content-start  ';
			break;

			case 2:
				alineacion =' justify-content-center ';
			break;

			case 3:
				alineacion =' justify-content-end ';
			break;

			default:
				alineacion = '';
			break;
		}

		return alineacion;

	}

	//Obtengo la imagen
	function CargarImagenes(){

		let dato = Enumerable.from(ListaBanner)
					.select(s => ({
						src : s.imagen,
						url: s.url,
						open: s.openURL,
						siClickeable: s.siClickeable
					})).toArray();

		setImagenes(dato);
		// console.log('imagenes banner', dato);
	}

	useEffect(() =>{

		if(ListaBanner.length > 0){
			OrdenarBanner();
			CargarImagenes();
		}

	}, [ListaBanner])


	return(


		<div>

			<div className="ps-promotions p-5">

				<div className="container">

					<div className="row">

						{

							imagenes.length == 0 ? 
							<div></div>

							:

							imagenes.map((item, key) =>
								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " key={key}>
									<Link href={item.url} target={item.open}>
										<a className="ps-collection">
											<img src={item.src} alt="prueba"/>
										</a>
									</Link>
								</div>
							)

						}

					</div>

				</div>

			</div>

		</div>
	)

}