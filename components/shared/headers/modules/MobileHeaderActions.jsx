import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import useLogin from '/hooks/useLogin';
import ContadorCart from './ContadorCart';
import ContadorFavoritos from './ContadorFavoritos';

const MobileHeaderActions = () => {
    const {isLogged,logout} = useLogin()

    return (
        <div className="navigation__right">
            {isLogged ? (
                <div className='header__actions'>
                    <ContadorFavoritos />
                    <ContadorCart />
                    <div className="ps-block--user-account" style={{ paddingTop: '2px' }}>
                        <i className="icon-user"></i>
                        <div className="ps-block__content">
                            <ul className="ps-list--arrow">
                                <li className="ps-block__footer">
                                    <Link href="/account/my-account" replace>
                                        <a>Información del usuario</a>
                                    </Link>
                                </li>
                                <li className="ps-block__footer">
                                    <a onClick={logout}>
                                    Cerrar Sesión
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            ) : (
                <div className="header__extra" style={{ color: '#fee01e' }}>
                    <Link href="/loginpage/login_page">
                        <a>Ingresar</a>
                    </Link>
                    <Link href="/cuenta/solicitudRegistro">
                        <a>Registro</a>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MobileHeaderActions;
