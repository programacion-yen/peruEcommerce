import {useEffect, useState} from "react";
import '/public/static/fonts/Linearicons/Font/demo-files/demo.css';
import '/public/static/fonts/font-awesome/css/font-awesome.min.css';
import '/public/static/css/bootstrap.min.css';
import '/public/static/css/slick.min.css';
import '../scss/style.scss';
import '../scss/home-default.scss';
import '../scss/market-place-1.scss';
import '../scss/CartStyle.css';
import '../styles/globals.css';
import '../scss/IconosEstilo/EstiloIcono.css';
import '../scss/cajaProducto/cajaProducto.css';
import '../styles/banners.css';
import {UserContextProvider} from '../context/UserContext'
import {ProductsContext} from '../context/ProductsContext'
import { wrapper } from '/store/store';
import MasterLayout from '/components/layouts/MasterLayout';
// import { getServidorMensaje } from "./api/MiniSitios";
// import useGetProducts from '/hooks/useGetProducts';
import FooterDefault from "../components/shared/footers/FooterDefault";

function MyApp({Component, pageProps}) {
    // const [ocultar, setOcultar] = useState(true);

    useEffect(async () =>{
        // let s = await getServidorMensaje(1);
        // if(s){
        //     setOcultar(false)
        // }
        import ('bootstrap/dist/js/bootstrap');
    }, [])

    return (
        <UserContextProvider>
            <ProductsContext>
                <MasterLayout />
                <Component {...pageProps} />
                <FooterDefault />
                {/* {ocultar == true ? <FooterDefault /> : <></>} */}
            </ProductsContext>
        </UserContextProvider>
    )
}

export default wrapper.withRedux(MyApp);