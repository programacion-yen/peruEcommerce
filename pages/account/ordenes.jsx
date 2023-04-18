import React,{useEffect} from 'react';
import MyAccount from '/components/partials/account/MyAccount';
import BreadCrumb from '/components/elements/BreadCrumb';
import useLogin from '/hooks/useLogin';
import Router from 'next/router';
import OrderTracking from '/components/partials/account/OrderTracking';


const Ordenes = () => {

    const breadCrumb = [
        {
            text: 'Inicio',
            url: '/',
        },
        {
            text: 'Mi cuenta',
            url: '/account/my-account'
        },
        {
            text: 'Mis ordenes'
        }
    ];

    return (
        <>
            <div className="ps-page--my-account">
                <BreadCrumb breadcrumb={breadCrumb} />
                <section className="ps-my-account ps-page--account">
                    <div className="container">
                        <div className="row">
                            <MyAccount />
                            <div className="col-lg-8">
                                <div className="ps-page__content">
                                    <div className="tab-content" id="v-pills-tabContent">
                                        <div className="tab-pane fade" id="v-pills-order" role="tabpanel" aria-labelledby="v-pills-order-tab">
                                            <OrderTracking/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );

};

export default Ordenes;
