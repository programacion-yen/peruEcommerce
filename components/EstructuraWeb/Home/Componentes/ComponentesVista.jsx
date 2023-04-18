import React, { useEffect, useState } from 'react'
import {ComponentesFila} from './ComponentesFila';

export const ComponentesVista = ({items}) => {

	const [cabecera, setCabecera] = useState([]);
	const [secundario, SetSecundario] = useState([]);
	const [filas, setFilas] = useState([]);

	//Separar los componentes
	function cargarComponente(){

		//Verifico si es Cabecera
		if(items.idSeccion == 1){
			setCabecera(items.filas);
		}

		//Verifico si es Secundario
		if(items.idSeccion == 5){
			SetSecundario(items.filas);
		}

		//Verifico si es Body
		if(items.idSeccion == 6){
			setFilas(items.filas);
		}

	}

	useEffect(() =>{
		cargarComponente();
	},[]);

  return (
	<>

			{cabecera != null && cabecera.map((cab, key) =>
			
				<div key={key}>
					<ComponentesFila fila={cab} />
				</div>

			)}

			{secundario != null && secundario.map((sec, key) =>
			
				<div className='col-12 padding-global-home' style={{ maxWidth: '1200px', margin: '0 auto' }} key={key}>
					<ComponentesFila fila={sec} />
				</div>
			
			)}

			{ filas != null && filas.map((body, key) =>
			
				<div className='col-12 padding-global-home' key={key} style={{ paddingBottom: '2%', maxWidth: '1200px', margin: '0 auto' }}>
					<ComponentesFila fila={body} />
				</div>
			)}

	</>
  )
}
