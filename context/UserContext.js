import { createContext, useState,useEffect} from 'react';

const Context = createContext({});

export function UserContextProvider({ children }) {
    const [fav, setFavs] = useState(0)
    const [token, setToken] = useState(null)
    const [checkingToken, setCheckingToken] = useState(true)
    const [isLogged, setIsLogged] = useState(false);
    // const [isLogged, setIsLogged] = useState({isLogged: false, checkingToken: true});
    const [premium,setPremium] = useState(null)
    const [scott,setScott] = useState(null)
    const [cart, setCart] = useState(null);
    const [idContacto, setIdContacto] = useState(null);
    const [cargo, setCargo] = useState();
    const [isActive, setIsActive] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [max, setMax] = useState(null);
    const [min, setMin] = useState(null);
    const [iconHeart, setIconHeart] = useState(null);
    const [iconCart, setIconCart] = useState(null);
    const [createContact, setCreateContact] = useState(null)
    const [procesar,setProcesar] = useState([])
    const [carrito,setCarrito] = useState()
    const [iva,setIva] = useState(0)
    // minisitios a los que puede acceder el usuario
    const [minisitios, setMiniSitios] = useState([]);
    // minisitio actual, a usar en buscador y catalogo
    const [idminisitio,setIdminisitio] = useState(1);
    const [recordar,setRecordar] = useState(false)
    const [datacontacto, setContacto] = useState(null)
    const [executive, setExecutive] = useState(null)
    const [resCarro, setResCarro] = useState([]);
    const [siDatosActualizados, setSiDatosActualizados] = useState(null)
    const [modalHomeIsOpen, setModalHomeIsOpen] = useState(true);
    // Listado minisitios que la empresa tiene acceso
    const [minisitiosEmpresa, setMinisitiosEmpresa] = useState([])

  return (
    <Context.Provider
      value={{token,setToken, isLogged, setIsLogged, checkingToken, setCheckingToken,
      // value={{token,setToken, isLogged, setIsLogged,
        fav, setFavs,premium,setPremium,scott,setScott,cart, siDatosActualizados, setSiDatosActualizados,
        setCart,idContacto, setIdContacto,isActive, setIsActive,max, setMax,min, minisitiosEmpresa, setMinisitiosEmpresa,
        setMin,keyword, setKeyword,iconHeart, setIconHeart,iconCart, setIconCart,
        createContact, setCreateContact,procesar,setProcesar,carrito,setCarrito,
        iva,setIva,cargo, setCargo,minisitios, setMiniSitios,idminisitio,setIdminisitio,
        recordar,setRecordar,datacontacto, setContacto,executive, setExecutive, resCarro, setResCarro, modalHomeIsOpen, setModalHomeIsOpen
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context;