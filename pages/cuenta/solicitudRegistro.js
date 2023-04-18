import { useEffect, useState } from 'react';
import {registerApi} from '../api/SolicitudRegistro';
import { WidgetContactInfoHorizontal } from '../../components/shared/widgets/WidgetContactInfoHorizontal';
import { WidgetContactInfo } from '../../components/shared/widgets/WidgetContactInfo';
import { Alert } from 'antd';
import { Success, Warning, MError } from '/utils/Notificaciones';
import { useRouter } from 'next/router';

export default function SolicitudRegistro(){

	const router = useRouter();

	const [comenzar, setComenzar] = useState(false);

	// Paso 1
	const [rut, setRut] = useState('');
	const [razonSocial, setRazonSocial] = useState('');
	const [email, setEmail] = useState('');
	const [personaContacto, setPersonaContacto] = useState('');

	//Paso 2
	const [direccionFact, setDireccionFact] = useState('');
	const [comuna, setComuna] = useState('');
	const [ciudad, setCiudad] = useState('');
	const [giro, setGiro] = useState('');
	const [telefonoCont, setTelefonoCont] = useState('');

	//Paso 3
	const [cantArchivos, setCantArchivos] = useState(1);

	const [error, setError] = useState('');
	const [windowWidth, setWindowWidth] = useState(900)
	
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
	

	//va en el form
	const enviarFormulario = async(e) =>{

		e.preventDefault();
		let validado = ValidaCampos();

		if(!validado){
			return;
		}

		let archivos = GuardarImagenes();

		let fd = new FormData();

		fd.append('IDCliente', rut);
		fd.append('RazonSocial', razonSocial);
		fd.append('EMail', email);
		fd.append('Contacto', personaContacto);

		fd.append('DireccionComercial', direccionFact);
		fd.append('Comuna', comuna);
		fd.append('Ciudad', ciudad);
		fd.append('Giro', giro);
		fd.append('Celular', telefonoCont);

		for(let i = 0; i < archivos.length; i++){
			fd.append('UploadFiles', archivos[i]);
		}

		const resp = await registerApi(fd);

		if(resp && resp.status === 200) {
			Success('Solicitud de registro enviada correctamente')
			router.push('/')
		} else {
			MError('Hubo un error al ingresar su solicitud')
		}


	}

	const GuardarImagenes= () =>{

		let divImg = document.getElementById('AgergarIMG');
		let CantidadInputFile = divImg.getElementsByTagName('input').length;

		let dato = [];

		for(let i = 0; i < CantidadInputFile; i++){

			let img = document.getElementById('img' + i).files[0];
			if(img) dato.push(img);

		}

		if(dato.length < 2) {
			setError('Debe adjuntar los archivos requeridos')
		} else if (error) {
			setError('');
		}

		return dato;
	}

	//Valida Rut
	let Fn = {
		validaRut : function(rutCompleto){
			if(!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) {
				return false;
			}

			var tmp 	= rutCompleto.split('-');
			var digv	= tmp[1]; 
			var rut 	= tmp[0];
			if ( digv == 'K' ) digv = 'k' ;
			return (Fn.dv(rut) == digv );
			
		},
		dv: function(T){

			var M=0,S=1;
			for(;T;T=Math.floor(T/10))
				S=(S+T%10*(9-M++%6))%11;
			return S?S-1:'k';
		}
	}

	//Valida Campos
	function ValidaCampos() {
		// pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
		// const EmailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
		const nroContactoRegex = /^[0-9]{9}$/i

		if(!rut){
			setError('Debe ingresar su rut')
			return false;
		}

		if(!Fn.validaRut(rut))
		{
			setError('Rut no válido')
			return false;
		} 

		if(!razonSocial)
		{
			setError('Debe ingresar su nombre o razón social');
			return false;
		}

		if(!email){
			setError('Debe ingresar su email');
			return false;
		}

		if(!emailRegex.test(email)){
			setError('Formato de email incorrecto')
			return false;
		}

		if(!personaContacto){
			setError('Debe ingresar la persona de contacto');
			return false;
		}

		if(!direccionFact){
			setError('Debe ingresar su dirección de facturación');
			return false;
		}

		if(!comuna){
			setError('Debe ingresar su comuna');
			return false;
		}

		if(!ciudad){
			setError('Debe ingresar su ciudad');
			return false;
		}

		if(!giro){
			setError('Debe ingresar su giro o actividad');
			return false;
		}

		if(!telefonoCont){
			setError('Debe ingresar su nro de contacto');
			return false;
		}

		if(!nroContactoRegex.test(telefonoCont)) {
			setError('Formato de nro contacto incorrecto')
			return false;
		}

		return true;
	}

	const AgregarCantidadArchivos = () => {
		if( cantArchivos < 10) {
			setCantArchivos(cantArchivos + 1)
		} else {
			setError('El límite es de 10 archivos, no puede agregar más.')
		}
	}

	const EliminarCantidadArchivos = () => {
		if(cantArchivos > 1) setCantArchivos(cantArchivos - 1)
	}

	const EliminarArchivoSeleccionado = (item) => {
		const element = document.getElementById(`img${item}`)
		element.value = '';
	}

	return(
		<>
		<div className="ps-my-account-2">
			<div className="container registerContainer">
				<div className="ps-section__wrapper">
					<form className="ps-form--register ps-tab-root" onSubmit={enviarFormulario} >
						<ul className="ps-tab-list">
							<li className="active">
								<a>Registrar</a>
							</li>
						</ul>
						{
							comenzar
								?	
									<>
										<ul className="nav nav-tabs m-5" id="myTab" role="tablist">
											<li className="nav-item" role="presentation" style={{ display: 'flex', flex: 1 }}>
												<button className="nav-link active registerTab" id="paso1-tab" data-bs-toggle="tab" data-bs-target="#paso1" type="button" role="tab" aria-controls="paso1" aria-selected="true">
													<p className='registerTabTitle'>Paso 1</p>
													<p className='registerTabText'>Datos de Contacto</p>
												</button>
											</li>
											<li className="nav-item" role="presentation" style={{ display: 'flex', flex: 1 }}>
												<button className="nav-link registerTab" id="paso2-tab" data-bs-toggle="tab" data-bs-target="#paso2" type="button" role="tab" aria-controls="paso2" aria-selected="false">
													<p className='registerTabTitle'>Paso 2</p>
													<p className='registerTabText'>Datos de la Empresa</p>
												</button>
											</li>
											<li className="nav-item" role="presentation" style={{ display: 'flex', flex: 1 }}>
												<button className="nav-link registerTab" id="Paso3-tab" data-bs-toggle="tab" data-bs-target="#paso3" type="button" role="tab" aria-controls="Paso3" aria-selected="false">
													<p className='registerTabTitle'>Paso 3</p>
													<p className='registerTabText'>Documentación</p>
												</button>
											</li>
										</ul>
				
										<div className='registerTabContainer'>
											<div className="tab-content m-5" id="myTabContent">
													{/* Tab Paso 1 */}
												<div className="tab-pane fade show active" id="paso1" role="tabpanel" aria-labelledby="paso1-tab">
													<div>
														<div>
															<div className='registerTabTitleContainer'>
																<h3 className='registerInsideTitle'>Datos de Contacto </h3>
																<b className="text-danger registerWarningText">Todos los datos son requeridos.</b>
															</div>
															
															<p className='registerInsideText'>
																Solo se procesarán solicitudes de empresas relacionadas con alguno de los siguientes giros comerciales:
																BICICLETAS, MOTOS o DEPORTES, y que envíen la máxima cantidad posible de documentos. <br />
																<b>No se responderá a personas naturales y/o empresas de otros rubros.</b>
															</p>
														</div>
														{/* Formulario de registro */}
														<section>
															{/* Textbox Rut */}
															<div className="row">
																<div className="form-group col-md-6 col-12">
																	<label className="form-label registerFormText">Rut</label>
																	<input type="text" className="form-control registerFormInput" onChange={ (e) => setRut(e.target.value)} maxLength='11' placeholder="11111111-1" />
																</div>
				
																{/* Textbox Nombre o Razon Social */}
																<div className="form-group col-md-6 col-12">
																	<label className="form-label registerFormText">Nombre o Razón Social</label>
																	<input type="text" className="form-control registerFormInput" placeholder='Nombre o razón social' onChange={ (e) => setRazonSocial(e.target.value) } />
																</div>
				
																{/* Textbox Email */}
																<div className="form-group col-md-6 col-12">
																	<label className="form-label registerFormText">Email</label>
																	<input type="text" className="form-control registerFormInput" placeholder="ejemplo@ejemplo.com" onChange={ (e) => setEmail(e.target.value) } />
																</div>
				
																{/* Textbox Persona de contacto */}
																<div className="form-group col-md-6 col-12">
																	<label className="form-label registerFormText">Persona de contacto</label>
																	<input type="text" className="form-control registerFormInput" placeholder='Persona de contacto' onChange={ (e) => setPersonaContacto(e.target.value) } />
																</div>
				
															</div>
														</section>
													</div>
												</div>
				
													{/* Tab Paso 2 */}
												<div className="tab-pane fade" id="paso2" role="tabpanel" aria-labelledby="paso2-tab">
													<div>
														<div className='registerTabTitleContainer'>
															<h3 className='registerInsideTitle'>Datos de la Empresa</h3>
															<b className="text-danger registerWarningText">Todos los datos son requeridos.</b>
														</div>
														{/* Formulario de registro */}
														<section>
															{/* Textbox Dirección de Facturación */}
															<div className="row pt-4">
																<div className="form-group col-md-6 col-12">
																	<label className="form-label registerFormText">Dirección de Facturación</label>
																	<input type="text" className="form-control registerFormInput" placeholder='Dirección de Facturación'  onChange={ (e) => setDireccionFact(e.target.value) } />
																</div>
				
																{/* Textbox Comuna */}
																<div className="form-group col-md-6 col-12">
																	<label className="form-label registerFormText">Comuna</label>
																	<input type="text" className="form-control registerFormInput" placeholder='Comuna' onChange={ (e) => setComuna(e.target.value) } />
																</div>
				
																{/* Textbox Ciudad */}
																<div className="form-group col-md-6 col-12">
																	<label className="form-label registerFormText">Ciudad</label>
																	<input type="text" className="form-control registerFormInput" placeholder='Ciudad'  onChange={ (e) => setCiudad(e.target.value) } />
																</div>
				
																{/* Textbox Giro o Actividad */}
																<div className="form-group col-md-6 col-12">
																	<label className="form-label registerFormText">Giro o Actividad</label>
																	<input type="text" className="form-control registerFormInput" placeholder='Giro o Actividad'  onChange={ (e) => setGiro(e.target.value) } />
																</div>
				
																{/* Textbox Fono Contacto */}
																<div className="form-group col-md-6 col-12">
																	<label className="form-label registerFormText">Número de Contacto</label>
																	<input type="text" className="form-control registerFormInput" placeholder='912345678' maxLength={9} onChange={ (e) => setTelefonoCont(e.target.value) } />
																</div>
															</div>
														</section>
													</div>
												</div>
				
													{/* Tab Paso 3 */}
												<div className="tab-pane fade" id="paso3" role="tabpanel" aria-labelledby="paso3-tab">
													<div>
														<div>
															<h3 className='registerInsideTitle' style={{ marginBottom: '15px' }}>Documentación Requerida</h3>
															<h5 className='registerInsideText'>Estimado Cliente, los formatos compatibles son: Imágenes (JPG, PNG) y Documentos (PDF, DOC, DOCX).</h5>
				
															<h5 className='registerInsideText'>Documentación necesaria:</h5>
															<ul>
																<ol className="list-group-numbered">
																	<li className="px-3 py-2 d-flex justify-content-between align-items-start">
																		<div className="ms-2 me-auto">
																			<p className='registerInsideText' style={{ margin: 0, fontWeight: 400 }}>
																				<i className='fa fa-check-circle' style={{ fontSize: '16px', color: 'blue', marginRight: '10px' }}></i>
																				Fotos del local o taller - <b className="text-danger">IMPORTANTE!</b>
																			</p>
																		</div>
																	</li>
																	<li className="px-3 py-2 d-flex justify-content-between align-items-start">
																		<div className="ms-2 me-auto">
																			<p className='registerInsideText' style={{ margin: 0, fontWeight: 400 }}>
																				<i className='fa fa-check-circle' style={{ fontSize: '16px', color: 'blue', marginRight: '10px' }}></i>
																				Patente Municipal - Debe indicar alguno de los 3 giros BICICLETAS - MOTOS - DEPORTES - <b className="text-danger">IMPORTANTE!</b>
																			</p>
																		</div>
																	</li>
																	<li className="px-3 py-2 d-flex justify-content-between align-items-start">
																		<div className="ms-2 me-auto">
																			<p className='registerInsideText' style={{ margin: 0, fontWeight: 400 }}>
																				<i className='fa fa-check-circle' style={{ fontSize: '16px', color: 'blue', marginRight: '10px' }}></i>
																				RUT de la empresa (ambos lados)
																			</p>
																		</div>
																	</li>
																	<li className="px-3 py-2 d-flex justify-content-between align-items-start">
																		<div className="ms-2 me-auto">
																			<p className='registerInsideText' style={{ fontWeight: 400 }}>
																				<i className='fa fa-check-circle' style={{ fontSize: '16px', color: 'blue', marginRight: '10px' }}></i>
																				Últimos 3 IVA (si los tiene)
																			</p>
																		</div>
																	</li>
																	
																</ol>
															</ul>
														</div>
				
														{/* Formulario subir archivos */}
														<section>
															<h5 className='registerInsideText'>Adjunte sus documentos aquí:</h5>
															<div id="AgergarIMG">
																{/* Input file Subir Archivos */}
																<div className="form-group" style={{ border: '1px solid blue', borderRadius: '15px' }}>
																	{/* Renderizado de inputs segun la cantidad de archivos, inicial 1, aumenta con AgregarCantidadArchivos */}
																	{
																		[...Array(cantArchivos).keys()].map(item => (
																			<div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 10px'}} id={`divimg${item}`} key={`divimg${item}`}>
																				<input type="file" id={`img${item}`} className="p-3 input-group" accept=".jpg, .png, .doc, .pdf" key={`img${item}`} />
																				<button type='button' className='btn btn-lg' onClick={() => EliminarArchivoSeleccionado(item)}>X</button>
																			</div>
																		))
																	}
																</div>
															</div>
				
															{/* Agregar cantidad de archivos */}
															<div className="ps-3 my-4">
																<span className="btn btn-lg" onClick={AgregarCantidadArchivos} style={{ backgroundColor: 'black', color: 'white', padding: '5px 30px', marginLeft: '15px', borderRadius: '6px' }}>Agregar cantidad de archivos</span>
																<span className="btn btn-lg" onClick={EliminarCantidadArchivos} style={{ backgroundColor: 'black', color: 'white', padding: '5px 30px', marginLeft: '15px', borderRadius: '6px' }}>Eliminar cantidad de archivos</span>
															</div>
														</section>
													</div>
				
													<div className="text-center" style={{ margin: '30px 0' }}>
														<button className="btn btn-lg registerEnviar" type="submit">Enviar</button>
													</div>
												</div>
												
												{
													error &&
														<Alert
															message="Error en formulario"
															description={error}
															type="error"
															showIcon
															closable
															onClose={ () => setError('') }
														/>
												}
												
											</div>
										</div>
									</>

								:
									<>
										<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
											<h3 className='registerInsideTitle' style={{ textAlign: 'center', maxWidth: '90%' }}>Considere este punto antes de registrarse</h3>
										</div>
										
										<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
											<h3 className='registroComienzoWarning'>ANDES INDUSTRIAL NO VENDE A PÚBLICO, SOLO A TIENDAS Y TALLERES ESTABLECIDOS</h3>
										</div>
										
										<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
											<p className='registroComienzoP'>Si usted desea ser parte de nuestra red de retail debe enviar toda la documentación requerida, de lo contrario su solicitud no será procesada</p>
										</div>
										
										<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '100px' }}>
											<button className='btn btn-lg registerComenzarbtn' type='button' onClick={() => setComenzar(true)}>Comenzar registro</button>
										</div>
									</>
						}
						
					</form>
				</div>
		
				{
					windowWidth > 768
						? <WidgetContactInfoHorizontal />
						: (
							<div className='widgetContactInfo'>
								<WidgetContactInfo />
							</div>	
						)
				}

			</div>
		</div>
		</>
	)
}