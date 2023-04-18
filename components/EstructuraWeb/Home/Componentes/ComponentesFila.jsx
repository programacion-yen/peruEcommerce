import React, { useEffect } from 'react'

import {CompBanner} from './SubComponentes/CompBanner';
import {CompSlider} from './SubComponentes/CompSlider';
import {CompProdOfertas} from './SubComponentes/CompProdOfertas';
import {CompProductos} from './SubComponentes/CompProductos';

export const ComponentesFila = ({fila}) => {



	useEffect(()=>{
		// console.log('desde componente fila', fila);
	},[])

	function RetornoComponente(TipoComp, datoEnviado){

		// console.log('desde TipoComp', TipoComp);

		if(TipoComp == 1){

			return <CompSlider sl={datoEnviado} />
		}

		if(TipoComp == 2){
			return <CompBanner bn={datoEnviado} />
		}

		if(TipoComp == 4){
			
			return <CompProdOfertas ofer={datoEnviado} />
		}

		if(TipoComp == 5){
			
			return <CompProductos prod={datoEnviado} />
		}

	}


	const vista = () =>{

		//Ordeno la fila con 1 columna
		if(fila.numeroColumnas == 1){

			// Aplicación de padding condicional de filaBanner para los componentes Banner de 1 columna
			if(fila.columnas[0].graficas[0].idTipo == 2){
				return (
					<div className=' filaBanner'>
						{RetornoComponente(fila.columnas[0].graficas[0].idTipo, fila.columnas[0].graficas)}
					</div>
				)
			}

			return (
				<div>
					{fila.columnas[0].divide == 1 &&
						<div>
							{RetornoComponente(fila.columnas[0].graficas[0].idTipo, fila.columnas[0].graficas)}
						</div>
					}
				</div>
			)
		}

		//Ordeno la fila con 2 columnas
		if(fila.numeroColumnas == 2){

			return (
				
				<div className='row filaBanner'>

					<div className='col-12 col-sm-6 bannerDivImg'>

						{ fila.columnas[0].divide == 1 &&
							RetornoComponente(fila.columnas[0].graficas[0].idTipo, fila.columnas[0].graficas)
						}

						{fila.columnas[0].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[0].graficas[0].idTipo, [fila.columnas[0].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[0].graficas[0].idTipo, [fila.columnas[0].graficas[1]])}</div>
							</div>
						}
						
					</div>

					<div className='col-12 col-sm-6 bannerDivImg'>

						{ fila.columnas[1].divide == 1 &&
							RetornoComponente(fila.columnas[1].graficas[0].idTipo, fila.columnas[1].graficas)
						}

						{ fila.columnas[1].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div style={{ paddingBottom: '10px' }}>{RetornoComponente(fila.columnas[1].graficas[0].idTipo, [fila.columnas[1].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[1].graficas[0].idTipo, [fila.columnas[1].graficas[1]])}</div>
							</div>
						}

					</div>

				</div>
			)
		}

		// Ordeno la fila con 3 columnas
		if(fila.numeroColumnas == 3){

			return (
				
				<div className='row filaBanner'>

					<div className='col-12 col-sm-4 bannerDivImg'>

						{ fila.columnas[0].divide == 1 &&
							RetornoComponente(fila.columnas[0].graficas[0].idTipo, fila.columnas[0].graficas)
						}

						{fila.columnas[0].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[0].graficas[0].idTipo, [fila.columnas[0].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[0].graficas[0].idTipo, [fila.columnas[0].graficas[1]])}</div>
							</div>
						}
						
					</div>

					<div className='col-12 col-sm-4 bannerDivImg'>

						{ fila.columnas[1].divide == 1 &&
							RetornoComponente(fila.columnas[1].graficas[0].idTipo, fila.columnas[1].graficas)
						}

						{ fila.columnas[1].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[1].graficas[0].idTipo, [fila.columnas[1].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[1].graficas[0].idTipo, [fila.columnas[1].graficas[1]])}</div>
							</div>
						}

					</div>

					<div className='col-12 col-sm-4 bannerDivImg'>

						{ fila.columnas[2].divide == 1 &&
							RetornoComponente(fila.columnas[2].graficas[0].idTipo, fila.columnas[2].graficas)
						}

						{ fila.columnas[2].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[2].graficas[0].idTipo, [fila.columnas[2].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[2].graficas[0].idTipo, [fila.columnas[2].graficas[1]])}</div>
							</div>
						}

					</div>

				</div>
			)
		}

		//Ordeno la fila con 4 columnas
		if(fila.numeroColumnas == 4){

			return (
				
				<div className='col-12 d-flex'>

					<div className='col-3'>

						{ fila.columnas[0].divide == 1 &&
							RetornoComponente(fila.columnas[0].graficas[0].idTipo, fila.columnas[0].graficas)
						}

						{fila.columnas[0].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[0].graficas[0].idTipo, [fila.columnas[0].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[0].graficas[0].idTipo, [fila.columnas[0].graficas[1]])}</div>
							</div>
						}
						
					</div>

					<div className='col-3'>

						{ fila.columnas[1].divide == 1 &&
							RetornoComponente(fila.columnas[1].graficas[0].idTipo, fila.columnas[1].graficas)
						}

						{ fila.columnas[1].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[1].graficas[0].idTipo, [fila.columnas[1].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[1].graficas[0].idTipo, [fila.columnas[1].graficas[1]])}</div>
							</div>
						}

					</div>

					<div className='col-3'>

						{ fila.columnas[2].divide == 1 &&
							RetornoComponente(fila.columnas[2].graficas[0].idTipo, fila.columnas[2].graficas)
						}

						{ fila.columnas[2].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[2].graficas[0].idTipo, [fila.columnas[2].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[2].graficas[0].idTipo, [fila.columnas[2].graficas[1]])}</div>
							</div>
						}

					</div>

					<div className='col-3'>

						{ fila.columnas[3].divide == 1 &&
							RetornoComponente(fila.columnas[3].graficas[0].idTipo, fila.columnas[3].graficas)
						}

						{ fila.columnas[3].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[3].graficas[0].idTipo, [fila.columnas[3].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[3].graficas[0].idTipo, [fila.columnas[3].graficas[1]])}</div>
							</div>
						}

					</div>

				</div>
			)
		}

		//Ordeno la fila con 5 columnas
		if(fila.numeroColumnas == 5){

			return (
				
				<div className='col-12 d-flex justify-content-center'>

					<div className='col-2'>

						{ fila.columnas[0].divide == 1 &&
							RetornoComponente(fila.columnas[0].graficas[0].idTipo, fila.columnas[0].graficas)
						}

						{fila.columnas[0].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[0].graficas[0].idTipo, [fila.columnas[0].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[0].graficas[0].idTipo, [fila.columnas[0].graficas[1]])}</div>
							</div>
						}
						
					</div>

					<div className='col-2'>

						{ fila.columnas[1].divide == 1 &&
							RetornoComponente(fila.columnas[1].graficas[0].idTipo, fila.columnas[1].graficas)
						}

						{ fila.columnas[1].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[1].graficas[0].idTipo, [fila.columnas[1].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[1].graficas[0].idTipo, [fila.columnas[1].graficas[1]])}</div>
							</div>
						}

					</div>

					<div className='col-2'>

						{ fila.columnas[2].divide == 1 &&
							RetornoComponente(fila.columnas[2].graficas[0].idTipo, fila.columnas[2].graficas)
						}

						{ fila.columnas[2].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[2].graficas[0].idTipo, [fila.columnas[2].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[2].graficas[0].idTipo, [fila.columnas[2].graficas[1]])}</div>
							</div>
						}

					</div>

					<div className='col-2'>

						{ fila.columnas[3].divide == 1 &&
							RetornoComponente(fila.columnas[3].graficas[0].idTipo, fila.columnas[3].graficas)
						}

						{ fila.columnas[3].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[3].graficas[0].idTipo, [fila.columnas[3].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[3].graficas[0].idTipo, [fila.columnas[3].graficas[1]])}</div>
							</div>
						}

					</div>

					<div className='col-2'>

						{ fila.columnas[4].divide == 1 &&
							RetornoComponente(fila.columnas[4].graficas[0].idTipo, fila.columnas[4].graficas)
						}

						{ fila.columnas[4].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[4].graficas[0].idTipo, [fila.columnas[4].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[4].graficas[0].idTipo, [fila.columnas[4].graficas[1]])}</div>
							</div>
						}

					</div>

				</div>
			)
		}

		//Ordeno la fila con 6 columnas
		if(fila.numeroColumnas == 6){

			return (
				
				<div className='col-12 d-flex'>

					<div className='col-2'>

						{ fila.columnas[0].divide == 1 &&
							RetornoComponente(fila.columnas[0].graficas[0].idTipo, fila.columnas[0].graficas)
						}

						{fila.columnas[0].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[0].graficas[0].idTipo, [fila.columnas[0].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[0].graficas[0].idTipo, [fila.columnas[0].graficas[1]])}</div>
							</div>
						}
						
					</div>

					<div className='col-2'>

						{ fila.columnas[1].divide == 1 &&
							RetornoComponente(fila.columnas[1].graficas[0].idTipo, fila.columnas[1].graficas)
						}

						{ fila.columnas[1].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[1].graficas[0].idTipo, [fila.columnas[1].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[1].graficas[0].idTipo, [fila.columnas[1].graficas[1]])}</div>
							</div>
						}

					</div>

					<div className='col-2'>

						{ fila.columnas[2].divide == 1 &&
							RetornoComponente(fila.columnas[2].graficas[0].idTipo, fila.columnas[2].graficas)
						}

						{ fila.columnas[2].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[2].graficas[0].idTipo, [fila.columnas[2].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[2].graficas[0].idTipo, [fila.columnas[2].graficas[1]])}</div>
							</div>
						}

					</div>

					<div className='col-2'>

						{ fila.columnas[3].divide == 1 &&
							RetornoComponente(fila.columnas[3].graficas[0].idTipo, fila.columnas[3].graficas)
						}

						{ fila.columnas[3].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[3].graficas[0].idTipo, [fila.columnas[3].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[3].graficas[0].idTipo, [fila.columnas[3].graficas[1]])}</div>
							</div>
						}

					</div>

					<div className='col-2'>

						{ fila.columnas[4].divide == 1 &&
							RetornoComponente(fila.columnas[4].graficas[0].idTipo, fila.columnas[4].graficas)
						}

						{ fila.columnas[4].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[4].graficas[0].idTipo, [fila.columnas[4].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[4].graficas[0].idTipo, [fila.columnas[4].graficas[1]])}</div>
							</div>
						}

					</div>

					<div className='col-2'>

						{ fila.columnas[5].divide == 1 &&
							RetornoComponente(fila.columnas[5].graficas[0].idTipo, fila.columnas[5].graficas)
						}

						{ fila.columnas[5].divide == 2 &&
							<div className='d-flex flex-column justify-content-between' style={{ height: '100%' }}>
								<div>{RetornoComponente(fila.columnas[5].graficas[0].idTipo, [fila.columnas[5].graficas[0]])}</div>
								<div>{RetornoComponente(fila.columnas[5].graficas[0].idTipo, [fila.columnas[5].graficas[1]])}</div>
							</div>
						}

					</div>

				</div>
			)
		}

	}

  return (
		<>
			{vista()}
		</>
		
  )

}
