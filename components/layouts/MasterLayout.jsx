import {useEffect,useState, useContext} from 'react';
import { BackTop } from 'antd';
import HeaderMarketPlace from '/components/shared/headers/HeaderMarketPlace';
import HeaderMobile from '/components/shared/headers/HeaderMobile';
import MarketPlacePromotionHeader from '/components/partials/homepage/marketplace/MarketPlacePromotionHeader';
// import NavigationList from '/components/navbar/NavigationList';
import useLogin from '/hooks/useLogin';
// import useGlobal from '../../hooks/useGlobal';
import { getMiniSitios } from '../../pages/api/MiniSitios';
import Context from '../../context/UserContext';
import { useRouter } from 'next/router';
import allServices from '../../services/allServices';

const MasterLayout = () => {
    const {token,datacontacto,contactoHook,ejecutivoHook,executive, initialLoginWithToken, isLogged, checkingToken} = useLogin();
    // const [miniSitios ,setMiniSitios] = useState();
    // const {DatosMiniSitios, minisitios} = useGlobal();

    const { idContacto, minisitios, setMiniSitios, setIdminisitio, idminisitio, setMinisitiosEmpresa } = useContext(Context);
    const router = useRouter();

    // async function Minisitios () {
    //     let resp = await getMiniSitios(idContacto);
    //     if (resp) setMiniSitios(resp);
    // }

    // const getMinisitiosEmpresa = async() => {
    //     const resp = await getMiniSitios(idContacto, 3)
    //     setMinisitiosEmpresa(resp)
    // }

    // useEffect( async () =>  {

    //     if(isLogged && !checkingToken){
    //         await Minisitios()
    //         await contactoHook()
    //         await ejecutivoHook()
    //         await getMinisitiosEmpresa()
    //     }
        
    // }, [isLogged, checkingToken, idContacto]);

	useEffect(() => {
        const token = window.localStorage.getItem('token')
        initialLoginWithToken(token)
	}, [])

    // Cambio de idminisitio cuando se entra a un minisitio y cambio a 1 cuando sale
    // useEffect(() => {
    //     const path = router.asPath.split('/').filter(item => item)
    //     if(path[0] === 'products' || path[0] === 'details' || path[0] === 'ofertas') return
    //     if(path[0] === 'miniSitios') return setIdminisitio(Number(path[2]))
    //     if(idminisitio !== 1) return setIdminisitio(1)
    // }, [router])

    const [grupos, setGrupos] = useState([]);

    useEffect(async() => {
      const res = await allServices.getMenu();
      if(res.status === 200) setGrupos(res.data)
    }, [])
    

    return (
        <>
            {/* {
                minisitios.length > 0 &&
                    <MarketPlacePromotionHeader items={minisitios} />
            } */}

            <HeaderMarketPlace grupos={grupos} item={datacontacto} />
            <HeaderMobile grupos={grupos} item={datacontacto} />
            {/* <NavigationList items={items} /> */}
            <BackTop>
                <button className="ps-btn--backtop">
                    <i className="icon-arrow-up"></i>
                </button>
            </BackTop>
        </>
    );
};

export default MasterLayout;
