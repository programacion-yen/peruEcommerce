import React,{useEffect} from 'react';
import MyAccount from '/components/partials/account/MyAccount';
import BreadCrumb from '/components/elements/BreadCrumb';
import useLogin from '/hooks/useLogin';
import Router from 'next/router';
import FormChangeContactInformation from '/components/shared/FormChangeContactInformation';


const Formcreatecontacts = () => {

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
            text: 'Contactos',
            url: '/account/Contacts/contacts'
        },
        {
            text: 'Crear Contacto'
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
                                    <FormChangeContactInformation />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );

};

export default Formcreatecontacts;
