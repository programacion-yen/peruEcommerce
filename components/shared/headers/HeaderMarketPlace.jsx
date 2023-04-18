import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ElectronicHeaderActions from '/components/shared/headers/modules/ElectronicHeaderActions';
import Nav from '/components/navbar/nav'
import SearchHeader from '/components/shared/headers/modules/SearchHeader'
import { getServidorMensaje } from '../../../pages/api/MiniSitios';
import { useRouter } from 'next/router';

export default function HeaderMarketPlace({grupos,item}) {
    // const [ocultar, setOcultar] = useState('');
    // const router = useRouter()

    // useEffect(async () =>{
    //     if(router.isReady) {
    //         // let s = await getServidorMensaje(1);
    //         // if(s){
    //         //     setOcultar('Ocultar');
    //         // }
    //         // TODO: Menu celeste dependiendo del minisitio
    //         // console.log(router.query)
    //     }
        
    // },[router.isReady, router.query])

    return (
        <header
            // className={"header header--standard header--market-place-1 " + ocultar}
            className="header header--standard header--market-place-1"
            id="headerSticky">
            <div className="header__content">

                <div className="container col-8 padding-global-home" style={{ maxWidth: '1200px' }}>

                    <div className="header__content-left">
                        <Link href="/">
                           <a>
                                <img src="/logo/bestbike-logo.png" />
                           </a>
                        </Link>
                    </div>
                    <div className="header__content-center" style={{ margin: '0 20px', display: 'flex', flex: 1}}>
                        <SearchHeader />
                    </div>
                    <div className="header__content-right" style={{ display: 'flex', justifyContent:'flex-end' }}>
                        <ElectronicHeaderActions item={item} />
                    </div>
                    
                </div>
            </div>

            {/* TODO: Renderizado condicional segun minisitio */}
            <Nav grupos={grupos}/>
        </header>
    );
}