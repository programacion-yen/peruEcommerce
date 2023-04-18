// import Enumerable from 'linq';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
// import { ClaseUbicacionHorizontal, ClaseColumnasBanner } from '../../../../../utils/utilidades';

export const CompBanner = ({bn}) => {

	const [imagen, setImagen] = useState([]);

	function CargarBanners(){
		let item = bn[0];
		let ban = item.imgs[0];
		setImagen(ban);
	}
	useEffect(() =>{

		CargarBanners();

	}, [bn])
	
	const Mostrar = () =>{

		return(

			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				{ imagen.siClick == 1 &&
					<Link href={imagen.url == undefined ? "#" : imagen.url} >
						<a>
							<img src={imagen.img} alt={imagen.nombre} />
						</a>
					</Link>
				}
				{ imagen.siClick == 0 &&
					<img src={imagen.img} alt={imagen.nombre} />
				}

			</div>
		)
	}

	return(

		<>{Mostrar()}</>
	)
  
}