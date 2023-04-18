import Context from '../context/UserContext'
import {useCallback,useContext,useState} from 'react'
import loginservices from '../services/login'
import Router, { useRouter } from 'next/router';
import {getProductosFavAPI} from '../pages/api/WishList';
import {getProductosAPI, getCarritoDisponible} from '../pages/api/Cart';
import allServices from '../services/allServices';

export default function useLogin ()
{
    const {token, setToken, isLogged, setIsLogged, checkingToken, setCheckingToken, 
            fav,setFavs, premium,setPremium,scott,setScott, setSiDatosActualizados,
            cart, setCart, idContacto, setIdContacto,createContact,
            setCreateContact,cargo, setCargo,recordar,setRecordar,
            datacontacto, setContacto,executive, setExecutive, setMiniSitios} =
    useContext(Context)

    const [state, setState] = useState({loading: false, error: false})
    const router = useRouter();

    const loginhook = useCallback(({email,pass}) => {
        loginservices({email,pass})
            .then(data => {
                window.localStorage.setItem('token',data.token)
                
                // TODO: Eliminar y usar valores de context
                window.localStorage.setItem('siPremium',data.siPremium)
                window.localStorage.setItem('siScott',data.siScott)
                window.localStorage.setItem('idContacto', data.idContacto)
                window.localStorage.setItem('carco', data.carco)

                setState({loading: false,error: false})
                setToken(data.token)
                setPremium(data.siPremium)
                setScott(data.siScott)
                setIdContacto(data.idContacto);
                setCargo(data.idCargo);
                setSiDatosActualizados(data.siDatosActualizados);

                // TODO: Login si viene sin datos actualizados, no hacer logged true, hasta que el usuario le de al boton de actualizar datos
                // if(data.siDatosActualizados === 0) return setCheckingToken(false)
                // else if( data.siDatosActualizados === 1) {
                //     setIsLogged(true);
                //     setCheckingToken(false)
                // }
                setIsLogged(true);
                setCheckingToken(false)

            }).catch(error => {
                window.localStorage.removeItem('token')

                // TODO: Eliminar y usar valores de context
                window.localStorage.removeItem('siPremium')
                window.localStorage.removeItem('siScott')
                window.localStorage.removeItem('idContacto')
                window.localStorage.removeItem('carco')

                setState({loading: false,error: true})

                setIsLogged(false);
                setCheckingToken(false)

                console.log(error)
            })
    },[setToken,setPremium,setScott, setIdContacto,setCargo])

    const initialLoginWithToken = useCallback((token) => {

        if(!token) return setCheckingToken(false)
        
        loginservices({token})
            .then(data => {

                if(!data) return setCheckingToken(false)

                // if(data.siDatosActualizados === 0){
                //     setCheckingToken(false)
                //     router.push('/loginpage/login_page')
                //     return
                // }

                // TODO: Eliminar y usar valores de context
                window.localStorage.setItem('siPremium',data.siPremium)
                window.localStorage.setItem('siScott',data.siScott)
                window.localStorage.setItem('idContacto', data.idContacto)
                window.localStorage.setItem('carco', data.carco)

                setToken(data.token);
                setPremium(data.siPremium);
                setScott(data.siScott);
                setIdContacto(data.idContacto);
                setCargo(data.idCargo);  

                setIsLogged(true);
                setCheckingToken(false)
            })
            .catch(error => {
                setCheckingToken(false)
                window.localStorage.removeItem('token')
                window.localStorage.removeItem('siPremium')
                window.localStorage.removeItem('siScott')
                window.localStorage.removeItem('idContacto')
                window.localStorage.removeItem('carco')
            })

    },[])

    const logout = useCallback(() => {
        window.localStorage.removeItem('token')

        // TODO: Eliminar y usar valores de context
        window.localStorage.removeItem('siPremium')
        window.localStorage.removeItem('siScott')
        window.localStorage.removeItem('idContacto')
        window.localStorage.removeItem('carco')

        setToken(null)
        setPremium(null)
        setScott(null)
        setIdContacto(null);
        setFavs(0);
        setCart(0);
        setCargo(null)
        setContacto(null)
        setMiniSitios([]);
        setSiDatosActualizados(null);

        Router.push('/')
        setIsLogged(false)
        
        // Router.push('/loginpage/login_page')
    },[setToken,setPremium,setScott, setIdContacto, setFavs, setCart,setCargo,setContacto])

    const favhook = useCallback(async () =>{

        if(isLogged) {
            const response = await getProductosFavAPI();
            if(response) setFavs(response.length)
        }

    },[setFavs])

    const carthook = useCallback(async () =>{

        if(isLogged) {
            let carritoDisponible = await getCarritoDisponible();
            if( carritoDisponible ) {
                const cantidadTotal = carritoDisponible.data.reduce((acc, el) => {
                    return acc + el.cantidadCarrito
                }, 0)
                setCart(cantidadTotal)
            }
        }

    },[setCart])

    const contactHook = useCallback((dato) => {
        setCreateContact(dato)
    },[setCreateContact])


    const contactoHook = useCallback( async () => {
        let contacts = await allServices.getContact()
        if (contacts) {
            setContacto(contacts)
        }
    },[setContacto])

    const ejecutivoHook = useCallback( async () => {
        let datos = await allServices.getExecutiveSales()
        if (datos) {
            setExecutive(datos)
        }
    },[setExecutive])

    return {
        isLogged,
        checkingToken,
        premium: Number(premium),
        scott: Number(scott),
        loading: state.loading,
        errorLoading: state.error,
        loginhook,
        initialLoginWithToken,
        logout,
        favhook,
        carthook,
        favoritos: Number(fav),
        ContCart: Number(cart),
        idcontacto: String(idContacto),
        contactHook,
        createContact,
        token,
        cargo,
        recordar,
        setRecordar,
        datacontacto,
        contactoHook,
        executive,
        ejecutivoHook
    }
}