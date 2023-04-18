import Enumerable from 'linq';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import NextArrow from '../../elements/carousel/NextArrow';
import PrevArrow from '../../elements/carousel/PrevArrow';
import Link from 'next/link';

export default function ESlider({ListaSlider}){

	//Configuracion del Slider
	const carouselSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        // fade: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

	const [ubicacionSlider, setUbicacionSlider] = useState([]);
	const [imagenes, setImagenes] = useState([]);
	let activo = true;

	//Defino el tipo de cabecera
	function OrdenarSlider(){

		if(ListaSlider == undefined){
			return;
		}

		let Posicion = [];

		//Es Slider
		if(ListaSlider[0].idTipoGrafica == 1){

			Posicion = setUbicacion();
			UbicacionSlider('Slider', Posicion)
		}
	}

	//Saco las "Especificaciones" paramostrar en cabecera
	function setUbicacion(){

		let dato = Enumerable.from(ListaSlider)
					.select(s =>({
						ColumnaUbicacion: s.columnaUbicacionGrafica,
						Alineacion: s.alineacionHorizontal
					})).toArray();

		return dato;
	}

	//Coloco las clases necesarias para mostrar la cabecera
	function UbicacionSlider(tipoCabcera, listaUbicacion){

		let posicion = [];
		let posicionFinal = '';

		if(tipoCabcera == 'Slider'){

			posicion.push(UbicacionColumna(listaUbicacion[0].ColumnaUbicacion));
			posicion.push(AlineacionFila(listaUbicacion[0].Alineacion));
			posicionFinal = posicion[0] + posicion[1];
			setUbicacionSlider(posicionFinal);

		}
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

	function cambiarActivo(){

		activo = false;

		return 'active'
	}

	//Obtengo la imagen
	function CargarImagenes(){

		let dato = Enumerable.from(ListaSlider)
					.select(s => ({
						src : s.imagen,
						url: s.url,
						open: s.openURL,
						siClickeable: s.siClickeable
					})).toArray();

		setImagenes(dato);
	}

	useEffect(() =>{
		CargarImagenes();
		OrdenarSlider();

		// console.log('cabecera', imagenes);

	},[ListaSlider])

	//ps-container-dinamic --> _grid.scss linea 79     
	//ps-home-banner
	//ps-carousel
	return(


		<div className={ubicacionSlider}>
             <div className={'ps-container-dinamic2 '}>
                 <div className='ps-home-banner'>

                     <Slider {...carouselSettings} className="ps-carousel">
					{
							imagenes.map((item, key) =>

								<div key={key}>
									<Link href={item.url} target={item.open} key={key}>
										<a>
											<img src={item.src}  alt='Prueba' />
										</a>
									</Link>
								</div>

							)
						}

                    </Slider>
                </div>
            </div>
		</div>



	)
}