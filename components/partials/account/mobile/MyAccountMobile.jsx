import {useState,useEffect} from 'react';
import { Avatar, Collapse } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

import useLogin from '/hooks/useLogin';
// import allServices from '/services/allServices';
import { FormatoPalabras } from '../../../../utils/utilidades';

import { DetallesEmpresaMobile, MiPerfilMobile, UsuariosDelSitioMobile } from './';
import Wishlist from '../Wishlist';
import Cart from '../../../CarritoCompra/Cart';
import { Loading } from '../../../elements/Loading';
import OrderTracking from '../OrderTracking';
import TableInvoices from '../modules/TableInvoices';
import MiPerfil from '../../../shared/MiPerfil';

const { Panel } = Collapse;

export const MyAccountMobile = ({dataBusiness, orders}) => {

  const { logout, contactoHook, datacontacto, cargo } = useLogin();
  const [loading, setLoading] = useState(true);

  let name = 'usuario';
  if (datacontacto && datacontacto.length > 0) {
    name = datacontacto[0].nombreContacto
  }

  useEffect(async() => {
    await contactoHook()
    setLoading(false)
  },[])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flex: 1, flexDirection: 'column', marginBottom: '20px' }}>
      {
        loading 
          ? <Loading />
          : 
            <>
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar size={64} icon={<UserOutlined />} style={{ lineHeight: '52px' }}/>
                <p style={{ fontSize: '20px' }}>Hola, {FormatoPalabras(name)}</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Collapse style={{ flex: '0 0 96%' }} className='collapseMyAccountMobile' defaultActiveKey='1' expandIconPosition='end' accordion>
                  <Panel header="Detalles de la empresa" key="1">
                    <DetallesEmpresaMobile items={dataBusiness[0]}/>
                  </Panel>
                  <Panel header={ <span style={{ display: 'flex', alignItems: 'center' }}><i className="icon-folder-user" aria-hidden="true" style={{ marginRight: '10px', fontSize: '20px' }}></i> Mi Perfil</span> } key="2">
                    {/* <MiPerfilMobile /> */}
                    <MiPerfil />
                  </Panel>
                  
                  {
                    (cargo === 1 || cargo === 2 ) &&
                      <Panel header={ <span style={{ display: 'flex', alignItems: 'center' }}><i className="icon-users" aria-hidden="true" style={{ marginRight: '10px', fontSize: '20px' }}></i> Usuarios del sitio</span> } key="3">
                        <UsuariosDelSitioMobile />
                      </Panel>
                  }
                  
                  <Panel header={ <span style={{ display: 'flex', alignItems: 'center' }}><i className="icon-folder" aria-hidden="true" style={{ marginRight: '10px', fontSize: '20px' }}></i> Pedidos</span> } key="4">
                    <OrderTracking orders={orders} />
                  </Panel>
                  <Panel header={ <span style={{ display: 'flex', alignItems: 'center' }}><i className="icon-book" aria-hidden="true" style={{ marginRight: '10px', fontSize: '20px' }}></i> Facturas</span> } key="5">
                    <div style={{ maxWidth: '88vw' }}>
                      <TableInvoices orders={orders} />
                    </div>
                  </Panel>
                  <Panel header={ <span style={{ display: 'flex', alignItems: 'center' }}><img src='/logo/shopping-cart-bl.svg' style={{ marginRight: '8px', height: '22px' }}></img> Carro de compra</span> } key="6">
                    <Cart />
                  </Panel>
                  <Panel header={ <span style={{ display: 'flex', alignItems: 'center' }}><img src='/logo/favorite.svg' style={{ marginRight: '8px', height: '22px' }}></img> Favoritos</span> } key="7">
                    <Wishlist />
                  </Panel>
                </Collapse>
              </div>
              
              <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <button type="button" className='btn btnSubmitMyAccount' data-bs-toggle="modal" data-bs-target="#cerrasesionmobile">
                  Cerrar sesión
                </button>
              </div>

              <div className="modal fade" id="cerrasesionmobile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
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
            </>
      }
      
    </div>
  )
}
