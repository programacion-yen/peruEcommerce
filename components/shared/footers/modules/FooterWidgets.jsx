import React from 'react';
import Link from 'next/link';
import useLogin from '/hooks/useLogin';

export default function FooterWidgets(){
    const {isLogged} = useLogin()

    return(
        <>
            <div className="row">
                <div className={isLogged ? 'col-6 col-sm-4' : 'col-6 col-sm-3'}>
                    <aside className=" widget_footer widget_contact-us">
                        <h4 className="widget-title">Servicio al cliente</h4>
                        <div className="widget_content">
                            <p>
                                <Link href="/page/Blank">
                                    <a rel="noreferrer">
                                        Políticas De Privacidad Y Aviso Legal
                                    </a>
                                </Link>
                            </p>
                            <p>
                                <Link href='https://share-eu1.hsforms.com/1uV7Och3xTVWaqiY7JLABMwf0z6w'>
                                    <a target='_blank'>
                                        Servicio Al Cliente
                                    </a>
                                </Link>
                            </p>
                            
                        </div>
                    </aside>
                </div>

                {
                    isLogged ? '' :
                        <div className='col-6 col-sm-3'>
                            <aside className=" widget_footer">
                                <h4 className="widget-title">Mi cuenta andes</h4>
                                <ul className="ps-list--link">
                                    <li>
                                        <Link href="/cuenta/solicitudRegistro">
                                            <a>Regístrate</a>
                                        </Link>
                                    </li>

                                    <li>
                                        <a>Recuperar Contraseña</a>
                                    </li>
                                </ul>
                            </aside>
                        </div>
                }

                <div className={isLogged ? 'col-6 col-sm-4' : 'col-6 col-sm-3'}>
                    <aside className=" widget_footer">
                        <h4 className="widget-title">Andes Industrial</h4>
                        <div className="widget_content">
                            <p>
                                <Link href="/page/About">
                                    <a rel="noreferrer">
                                        Nuestra Empresa
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </aside>
                </div>
                <div className={isLogged ? 'metodosPago col-6 col-sm-4' : 'col-6 col-sm-3'}>
                    <aside className=" widget_footer">
                        <h4 className="widget-title">Metodos de pago</h4>
                        <div className="widget_content">
                            <img src="https://www.andesindustrial.cl/images/payment.png" alt="Martfury" width="auto" height="auto" />
                        </div>
                    </aside>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 socialDiv'>
                    <ul className="ps-list--social">
                        <li>
                            <Link href="https://www.facebook.com/AndesIndustrial/">
                                <a className="facebook" target="_blank" rel="noreferrer">
                                    <i className="fa fa-facebook-square text-muted"></i>
                                </a>
                            </Link>

                        </li>
                        <li>
                            <Link href="https://www.instagram.com/andesindustrial/">
                                <a className="instagram"  target="_blank" rel="noreferrer">
                                    <i className="fa fa-instagram text-muted"></i>
                                </a>
                            </Link>

                        </li>
                        <li>
                            <Link href="https://www.youtube.com/c/AndesIndustrialLtda">
                                <a className="youtube"  target="_blank" rel="noreferrer">
                                    <i className="fa fa-youtube-square text-muted"></i>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

