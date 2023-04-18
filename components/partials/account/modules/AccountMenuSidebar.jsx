import React from 'react';
import { Modal,Avatar } from 'antd';
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons'
import { FormatoPalabras } from '../../../../utils/utilidades';
// import { FormatoPalabras } from '../../../../utils/utilidades';

const AccountMenuSidebar = ({ logout,user,cargo}) => {

    const onLogout = () => {
       /*  Modal.info({
            title:'La sesión se cerrara',
            okText:"Aceptar",
            onOk: logout,
            closeIcon,
            cancelText:"Cancelar",
            okButtonProps:{ className: 'ant-btn-danger' },
            cancelButtonProps : { style: { background: '#DAD8DB', color: '#666565'}},
            centered: true,
        }) */
    }
    return (
        <aside className="ps-widget--account-dashboard">
            <div className="ps-widget__header" style={{ paddingBottom: '10px' }}>
                <Avatar size={64} icon={<UserOutlined />} style={{ lineHeight: '52px' }}/>
                <p style={{ margin: 0, fontSize: '16px', padding: '0 10px', textAlign: 'center', marginTop: '10px' }}>Hola, {user ? FormatoPalabras(user) : ''}</p>
            </div>
            <div className="ps-widget__content">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true">
                        Detalle de la Empresa
                    </button>
                    <button className="nav-link"
                        id="v-pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected="false">
                        <i className="icon-folder-user" aria-hidden="true"></i> Mi Perfil
                    </button>

                    {
                        (cargo === 1 || cargo === 2) &&
                            <button className="nav-link"
                                id="v-pills-contact-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-contact"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-contact"
                                aria-selected="false">
                                <i className="icon-users" aria-hidden="true"></i> Usuarios del Sitio
                            </button>
                    }
                    
                    <button className="nav-link"
                        id="v-pills-order-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-order"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-order"
                        aria-selected="false">
                    <i className="icon-folder" aria-hidden="true"></i> Pedidos
                    </button>
                    <button className="nav-link"
                        id="v-pills-factura-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-factura"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-factura"
                        aria-selected="false">
                        <i className="icon-book" aria-hidden="true"></i> Facturas
                    </button>
                    <button className="nav-link"
                        id="v-pills-cart-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-cart"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-cart"
                        aria-selected="false">
                        <i className="icon-box" aria-hidden="true"></i> Carro de compras
                    </button>
                    <button className="nav-link"
                        id="v-pills-favorite-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-favorite"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-favorite"
                        aria-selected="false">
                        <i className="icon-heart" aria-hidden="true"></i> Favoritos
                    </button>
                    <button type="button" className="nav-link text-center" data-bs-toggle="modal" data-bs-target="#cerrasesion">
                        <i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar Sesión
                    </button>
                    <div className="modal fade" id="cerrasesion" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth : '350px' }}>
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '10px 10px 0' }}>
                                        <InfoCircleOutlined style={{ color: 'red', fontSize: '20px' }} />
                                        <a data-bs-dismiss="modal" aria-label="Close" className="">
                                            <i className="icon-cross icon-close-modal"></i>
                                        </a>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <p className="text-center" style={{ fontSize: '20px', margin: '15px 0 0 0', color: 'black' }}>La sesión se cerrará</p>
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-center border-0 mb-3">
                                    <button type="button" style={{ fontSize: '13px'}} className="btn btn-primary btn-lg" data-bs-dismiss="modal" onClick={logout}>Aceptar</button>
                                    <button type="button" style={{ fontSize: '13px'}} className="btn btn-secondary btn-lg" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
};

export default AccountMenuSidebar;
