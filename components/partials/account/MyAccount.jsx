import React,{useState,useEffect} from 'react';
import MiPerfil from '/components/shared/MiPerfil';
import TableContacts from '/components/shared/tables/TableContacts'
import OrderTracking from '/components/partials/account/OrderTracking';
import useLogin from '/hooks/useLogin';
import Wishlist from '/components/partials/account/Wishlist';
import CarritoCompra from '/components/CarritoCompra/Cart';
import TableInvoices from './modules/TableInvoices';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
// import allServices from '/services/allServices';
import AdressDispatch from '/components/shared/AdressDispatch'
import { Loading } from '../../elements/Loading';

export default function MyAccount({dataBusiness, orders}) {
    const {logout,cargo,contactoHook,datacontacto} = useLogin();
    const [loading, setLoading] = useState(true);

    let empresa;
    let productItemsView;
    if (dataBusiness && dataBusiness.length > 0) {
        dataBusiness.map((item) => {
            empresa = item
        });

        productItemsView = <div className="ps-section__content">
            <div className="ps-container">
                <AdressDispatch items={empresa}/>
            </div>
        </div>
    }

    let Contacto;
    if (datacontacto && datacontacto.length > 0) {
        datacontacto.map(datos => {
            Contacto = datos.nombreContacto
        })
    }

    useEffect(() => {
        contactoHook()
        setLoading(false);
    },[])

    return (
        <>
            {
                loading
                    ? 
                        <div style={{ height: '70vh', width: '100%' }}>
                            <Loading />
                        </div>
                    :
                        <section className="ps-my-account ps-page--account col-lg-12">
                            <div className="col-12 p-0">
                                <div className="d-flex p-0">
                                    <div className="">
                                        <div className="ps-section__left">
                                            <AccountMenuSidebar logout={logout} user={Contacto} cargo={cargo}/>
                                        </div>
                                    </div>
            
                                    <div className="col-10 containerRightMyAccount">
                                        <div className="tab-content col-12 p-0 m-0" id="v-pills-tabContent">
                                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                                <div className="ps-page__dashboard">
                                                <div className="" style={{ border: '2px solid #003399', borderRadius: '15px', margin: '0 30px', padding: '10px 20px', textAlign: 'center', marginBottom: '30px' }}>
                                                    <p className='avisoMyAccount'>
                                                        Desde el panel de su cuenta, puede ver sus
                                                        órdenes recientes, administre sus
                                                        direcciones de envío y facturación,
                                                        y edite su contraseña y los detalles de su cuenta.
                                                    </p>
                                                </div>
                                                    {/* Detalle de la empresa */}
                                                    {productItemsView}
                                                </div>
                                            </div>
                                            
                                            {/* Mi perfil */}
                                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                                <MiPerfil />
                                            </div>

                                            {/* Usuarios del sitio */}
                                            <div className="tab-pane fade" id="v-pills-contact" role="tabpanel" aria-labelledby="v-pills-contact-tab">
                                                {
                                                    (cargo === 1 || cargo === 2 ) && <TableContacts/>
                                                }
                                            </div>

                                            {/* Ordenes */}
                                            <div className="tab-pane fade" id="v-pills-order" role="tabpanel" aria-labelledby="v-pills-order-tab">
                                                <OrderTracking orders={orders} />
                                            </div>

                                            {/* Facturas */}
                                            <div className="tab-pane fade" id="v-pills-factura" role="tabpanel" aria-labelledby="v-pills-factura-tab">
                                                <TableInvoices orders={orders} />
                                            </div>

                                            <div className="tab-pane fade" id="v-pills-cart" role="tabpanel" aria-labelledby="v-pills-cart-tab">
                                                {/* <div className="ps-section--shopping ps-shopping-cart pt-3"> */}
                                                <div className="pt-3">
                                                    {/* <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                                                        <h4 className="formDetailsTitleMenu col-7" style={{ textAlign: 'center' }} >Carrito de Compras</h4>
                                                    </div> */}
                                                    <CarritoCompra myAccount />
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="v-pills-favorite" role="tabpanel" aria-labelledby="v-pills-favorite-tab">
                                                <div className="ps-section--shopping ps-whishlist pt-3">
                                                    <h4 className="formDetailsTitleMenu" style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '30%' }}>
                                                        Tus favoritos
                                                        <i className='icon-heart' style={{ fontSize: '20px', marginLeft: '10px' }}></i>
                                                    </h4>
                                                    <Wishlist />
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </section>
            }
        </>
    );
}
