import React,{useEffect, useState} from 'react';
import useLogin from '/hooks/useLogin';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {Input,Form, Modal} from 'antd';
import { WidgetContactInfo } from '../../components/shared/widgets/WidgetContactInfo';
import Context from '../../context/UserContext';
import { useContext } from 'react';
import MiPerfil from '../../components/shared/MiPerfil';

export default function Login() {

    const Router = useRouter();
    const {loginhook, isLogged, loading,errorLoading,premium,setRecordar} = useLogin()
	const { siDatosActualizados, setIsLogged } = useContext(Context)

	const [mostrarModalDatos, setMostrarModalDatos] = useState(false)

    // useEffect(() => {
    //     if(isLogged && siDatosActualizados === 1) Router.push('/')
    // }, [isLogged,Router, siDatosActualizados])

	useEffect(() => {
		if(isLogged) Router.push('/')
	}, [isLogged, Router])

/* 	const handleChange = (event) => {
		const input = event.target;
		const value = input.type === 'checkbox' ? input.checked : input.value;
		console.log(value)
		setRecordar(value);
	}; */

    const validationForm = async(e) => {
		let email = e.email
		let pass = e.pass
		await loginhook({email,pass})
    }

	useEffect(() => {
		if(siDatosActualizados === 0 ) {
			setMostrarModalDatos(true);
		}
	}, [siDatosActualizados])
	
	const closeModalMiPerfil = () => {
		setMostrarModalDatos(false);
		setIsLogged(true)
	};
	

  	return (
		<>
			<div className="ps-my-account-2">
				<div className="container">
					<div className="ps-section__wrapper_login">
						<div className="ps-section__left">
						{loading &&
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						}
						{!loading &&
							<Form
								className="ps-form--account ps-tab-root"
								layout="vertical"
								onFinish={validationForm}>
								<ul className="ps-tab-list">
									<li className="active">
										<p className="m-0">Ingresar</p>
									</li>
									<li>
										<Link href="/cuenta/solicitudRegistro">
											<a>Registrarse</a>
										</Link>
									</li>
								</ul>
								<div className="ps-tabs">
									<div className="ps-tab active" id="sign-in">
										<div className="ps-form__content" style={{ paddingTop: 0 }}>
											<h5>Ingresa a tu cuenta</h5>
											<div className="form-group">
												{
													errorLoading && (
														<div className="className alert alert-danger">
															Usuario o Clave invalida
														</div>
													)
												}
												<Form.Item
														label="Correo electrónico"
														name="email"
														rules={[
																{
																		type: 'email',
																		message: 'Por favor, ingrese un Email correcto. Ej. mail@mail.com',
																},
																{
																		required: true,
																		message: 'Campo requerido!',
																},
														]}
												>
													<Input
														type="email"
														className="form-control"
														id="email"
														//required
														name="email"
														placeholder="Email"
														//onChange={e => setEmail(e.target.value)} value={email}
													/>
												</Form.Item>
											</div>
											<div className="form-group form-forgot">
												<Form.Item
														label="Contraseña"
														name="pass"
														rules={[
														{
															required: true,
															message: 'Campo requerido!',
														},
														]}
													>
													<Input.Password
														className="form-control"
														placeholder="Contrasena"
														//required
														id="pass"
														name="pass"
														//onChange={e => setPass(e.target.value)} value={pass}
													/>
												</Form.Item>
												{/* <a href="">Forgot?</a> */}
											</div>
											{/* <div className="form-group">
												<div className="ps-checkbox">
													<input
														className="form-control"
														type="checkbox"
														id="remember-me"
														name="remember-me"
														onChange={handleChange}
													/>
													<label htmlFor="remember-me">
														Recuerdame
													</label>
												</div>
											</div> */}
											<div className="form-group submit">
												<Form.Item className="m-0">
													<button type="submit" className="ps-btn ps-btn--fullwidth">
														Ingresar
													</button>
												</Form.Item>
											</div>
										</div>
									</div>
								</div>
							</Form>
						}
						</div>

						{/* <div className="ps-section__right widgetContactInfo">
							<WidgetContactInfo />
						</div> */}

					</div>
				</div>
			</div>

			{/* Modal mi perfil */}
			{/* <Modal 
				// title="Basic Modal"
				// open={mostrarModalDatos} 
				// onOk={handleOk} 
				// onCancel={handleCancel}
				open={mostrarModalDatos}
				okButtonProps={{hidden:true}}
				cancelButtonProps={{hidden: true}}
				centered={true}
				// className='modalBoleta'
				width={1000}
				closable={false}
				footer={false}
        		// bodyStyle={{backgroundColor:'#EEEEEE'}}
			>
				<h4 style={{ color: '#003399', textAlign: 'center', margin: '10px 0 0 0' }}>Revise y actualice sus datos para continuar</h4>
				<MiPerfil closeModalMiPerfil={closeModalMiPerfil} />
			</Modal> */}
			
		</>	
    )
}
