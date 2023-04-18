import { useEffect, useState } from 'react';
import MyAccount from '/components/partials/account/MyAccount';
import BreadCrumb from '/components/elements/BreadCrumb';
import useLogin from '/hooks/useLogin';
import { useRouter } from 'next/router';
import { MyAccountMobile } from '../../components/partials/account/mobile/MyAccountMobile';
import { Loading } from '../../components/elements/Loading';
import allServices from '../../services/allServices';

const breadCrumb = [
    {
        text: 'Inicio',
        url: '/',
    },
    {
        text: 'Mi cuenta',
    },
];

const MyAccountPage = () => {
 
    const Router = useRouter();
    const { isLogged, checkingToken } = useLogin();

    const [loading, setLoading] = useState(true)
    const [windowWidth, setWindowWidth] = useState(600)

    const [orders, setOrders] = useState([]);
    const [dataBusiness, setDataBusiness] = useState({});

    const getBusiness = async () =>{
        let business = await allServices.getBusiness()
        if (business) {
            setDataBusiness(business)
            const idCliente = business[0].idCliente.trim();
            getOrders(idCliente)
        }
	}

    const getOrders = async (idCliente) =>{
        const resp = await allServices.getOrdersT(idCliente);
        if(resp) {

            resp.map(orden => {
                orden['key'] = orden.nroDocumento
            })

            setOrders(resp)
        }
    }

    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

	useEffect(async() => {

        if(Router.isReady){

            if(!isLogged && !checkingToken){
				return Router.push('../loginpage/login_page')
			}

            if(!checkingToken) {
                window.addEventListener("resize", handleResize, false);
                setWindowWidth(window.innerWidth)
    
                await getBusiness()
    
                setLoading(false);
            }
            
        }

        return () => {
            window.removeEventListener("resize", handleResize, false);
        }
		
	}, [Router.isReady, isLogged, checkingToken])

    return (
        <>
            {
                loading
                    ?   <div style={{ height: '80vh', width: '100%' }}>
                            <Loading />
                        </div>
                    :
                        <div className="ps-page--my-account">
                            <BreadCrumb breadcrumb={breadCrumb} />
                            <section className="ps-my-account ps-page--account d-flex justify-content-center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                                <div className="myAccountContainer">
                                    <div className="row m-0 p-0">
                                        {
                                            windowWidth < 576
                                                ? <MyAccountMobile dataBusiness={dataBusiness} orders={orders} />
                                                : <MyAccount dataBusiness={dataBusiness} orders={orders} />
                                        }
                                    </div>
                                </div>
                            </section>
                        </div>
            }
            
        </>
    );

};

export default MyAccountPage;
