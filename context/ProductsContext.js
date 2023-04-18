import { createContext, useState,useEffect,useRef} from 'react';

const Context = createContext({});

export function ProductsContext({ children }) {
    const [brand, setBrand] = useState(null)
    const [subCategory,setSubCategory] = useState(null)
    const [brandData, setBrandData] = useState(null)
    const [scottProd, setScottProd] = useState([])
    const [contact,setContact] = useState(false)
    const [buscador,setBuscardor] = useState(null)
    const [size,setSize] = useState()
    const [usos,setUsos] = useState()
    const [hidden,setHidden] = useState(false)
    const [refresh,setFresh] = useState(false)
    const [categorias, setCategorias] = useState(null);
    const [nameCategory,setNameCategory] = useState(null);
    const [marcas, setMarcas] = useState(null);
    const [grupo, setGrupo] = useState(null);
    const [idfiltro, setIdFiltro] = useState(null);
    const [color,setColor] = useState(null)
    const [peso,setPeso] = useState(null)
    const [procedencia,setProcedencia] = useState(null)
    const [modelo,setModelo] = useState(null)
    const [precio,setPrecio] = useState(null)
    const selectInputRef = useRef()
    const [region ,setRegion] = useState()
    const [commune ,setCommune] = useState()
    const [cargos ,setCargos] = useState()
    const [inputValue,setinputValue] = useState('')

    useEffect(() => {},[]);
    return <Context.Provider
      value={{
        brand, setBrand,brandData, setBrandData,scottProd, setScottProd,
        contact,setContact,subCategory,setSubCategory,size,setSize,
        usos,setUsos,hidden,setHidden,buscador,setBuscardor,refresh,setFresh,
        categorias, setCategorias,marcas, setMarcas,grupo, setGrupo,
        idfiltro, setIdFiltro,color,setColor,peso,setPeso,procedencia,setProcedencia,
        modelo,setModelo,precio,setPrecio,selectInputRef,inputValue,setinputValue,
        nameCategory,setNameCategory,region ,setRegion,commune ,setCommune,cargos ,setCargos
        }}>
      {children}
    </Context.Provider>
}

export default Context;