import React,{useEffect} from 'react';
import BreadCrumb from '/components/elements/BreadCrumb';
import Wishlist from '/components/partials/account/Wishlist';
import useLogin from '/hooks/useLogin';
import Router from 'next/router';
import useGlobal from '/hooks/useGlobal'
import useProducts from '/hooks/useProducts';


const WishlistPage = () => {
    const {isLogged} = useLogin();
    const {isActive, activehook,keywordhook} = useGlobal();
	const {limpiar} = useProducts()

    useEffect(() => {
        if(isActive){
			activehook(false);
            keywordhook('')
            limpiar()
		}
    }, []);

    const breadCrumb = [
        {
            text: 'Inicio',
            url: '/',
        },
        {
            text: 'Lista de Favoritos',
        },
    ];

    return (
        <>
            {/* <div className="ps-page--simple"> */}
                <BreadCrumb breadcrumb={breadCrumb} />
                <div className="ps-section--shopping ps-whishlist d-flex justify-content-center">
                    <div className="col-sm-12 col-md-11 col-lg-12" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <h4 className="formDetailsTitleMenu favoritosTitulo">
                                Tus favoritos <img src='/logo/favorite.svg' className='svgIconYellow' height='30px' style={{ marginLeft: '4px' }} />
                            </h4>
                        </div>
                        <div>
                            <Wishlist />
                        </div>
                    </div>
                </div>
            {/* </div> */}
            
        </>
    );
};

export default WishlistPage;
