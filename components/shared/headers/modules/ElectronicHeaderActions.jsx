// import React, { useState, useEffect } from 'react';
import useLogin from '/hooks/useLogin';
import Link from 'next/link';
import ContadorFavoritos from './ContadorFavoritos';
import ContadorCart from './ContadorCart';
import useGlobal from '/hooks/useGlobal'

export default function ElectronicHeaderActions({item}){

    const {isLogged,logout} = useLogin();
    const {isActive, activehook,keywordhook} = useGlobal();

    function logoutUser(){
        logout()
        if(isActive){
			activehook(false);
			keywordhook('')
		}
    }

    let nombre;
    if (item && item.length > 0) {
        item.map(datos => {
            nombre = datos.nombreContacto
        })
    }

    return (
        <div className="header__actions">

            <ContadorFavoritos />
            <ContadorCart />
            { 
                isLogged 
                    ?
                        <div className="ps-block--user-account" >
                            <h5 className="m-0 text-end" style={{textTransform: 'capitalize', textAlign: 'end', color: '#fee01e'}}>HOLA,</h5>
                            <h5 className="m-0" style={{textTransform: 'capitalize', textAlign: 'end', color: '#fee01e'}}>{nombre}</h5>
                            <div className="ps-block__content">
                                <ul className="ps-list--arrow">
                                    <li className="ps-block__footer">
                                        <Link href="/account/my-account" replace>
                                            <a>Información del usuario</a>
                                        </Link>
                                    </li>
                                    <li className="ps-block__footer">
                                        <a onClick={() => logoutUser()}>
                                            Cerrar Sesión
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    :
                        <div className="ps-block--user-header">
                            <div className="ps-block__left">
                                <i className="icon-user" style={{ color: '#fee01e' }}></i>
                            </div>
                            <div className="ps-block__right">
                                <Link href="/loginpage/login_page">
                                    <a style={{ color: '#fee01e' }}>Ingresar</a>
                                </Link>
                                <hr style={{ borderTop: '1px solid #fee01e', margin: '1px 0' }} />
                                <Link href="/cuenta/solicitudRegistro">
                                    <a style={{ color: '#fee01e' }}>Registro</a>
                                </Link>
                            </div>
                        </div>
            }
        </div>
    );

}
