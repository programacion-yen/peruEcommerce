import Context from '../context/ProductsContext'
import {useCallback, useContext, useState} from 'react'
import allServices from '/services/allServices'

export default function useProducts(){

	const {brand, setBrand,brandData, setBrandData,scottProd, setScottProd,
            contact,setContact,subCategory,setSubCategory,size,setSize,usos,setUsos,
            hidden,setHidden,refresh,setFresh,categorias, setCategorias,marcas,setMarcas,
            grupo, setGrupo,idfiltro, setIdFiltro,color,setColor,peso,setPeso,procedencia,
            setProcedencia,modelo,setModelo,precio,setPrecio,selectInputRef,buscador,setBuscardor,
            nameCategory,setNameCategory,cargos ,setCargos,region ,setRegion,commune ,setCommune,
            inputValue,setinputValue} =
    useContext(Context);

	const brandHook = useCallback((item) =>{
		setBrand(item);
	},[setBrand])

	const subCategoryHook = useCallback((item) =>{
		setSubCategory(item);
	},[setSubCategory])


    const databrandHook = useCallback((data) =>{
        setBrandData(data);
    },[setBrandData])

    const productScottHook = useCallback((dato) =>{
        setScottProd(dato)
    },[setScottProd])


    const contactHook = useCallback((dato) =>{
        setContact(dato)
    },[setContact])

    const refreshHook = useCallback((dato) =>{
        setFresh(dato)
    },[setFresh])


    const hiddenHook = useCallback((dato) => {
        setHidden(dato)
    },[setHidden])

    const categoriasHook = useCallback((dato,name) => {
		setCategorias(dato)
        setNameCategory(name)
	},[setCategorias,setNameCategory])

	const marcasHook = useCallback((dato) => {
		setMarcas(dato)
	},[setMarcas])

	const grupoHook = useCallback((dato) => {
		setGrupo(dato)
	},[setGrupo])

	const filtroHook = useCallback((dato) => {
		setIdFiltro(dato)
	},[setIdFiltro])

    const sizesHook = useCallback((dato) => {
        setSize(dato)
    },[setSize])

    const usosHook = useCallback((dato) => {
        setUsos(dato)
    },[setUsos])

    const colorHook = useCallback((dato) => {
        setColor(dato)
    },[setColor])

    const pesoHook = useCallback((dato) => {
        setPeso(dato)
    },[setPeso])

    const procedenciaHook = useCallback((dato) => {
        setProcedencia(dato)
    },[setProcedencia])

    const modeloHook = useCallback((dato) => {
        setModelo(dato)
    },[setModelo])

    const precioHook = useCallback((dato) => {
        setPrecio(dato)
    },[setPrecio])

    const buscadorHook = useCallback((dato) => {
        setBuscardor(dato)
    },[setBuscardor])

    let options = [
        {value: 0, label : 'Ordenar por precio: menor a mayor'},
        {value: 1, label : 'Ordenar por precio: mayor a menor'},
        {value: 2, label : 'Ordenar A-Z'},
        {value: 3, label : 'Ordenar Z-A'},
    ]
    let option = [
        {value: 2, label : 'Ordenar A-Z'},
        {value: 3, label : 'Ordenar Z-A'},
    ]

    const limpiar = useCallback(() => {
        if (selectInputRef.current != null) {
            selectInputRef.current.clearValue();
            categoriasHook(null)
        }
        // categoriasHook(null)
        subCategoryHook(null); modeloHook(null)
        colorHook(null); procedenciaHook(null); usosHook(null); pesoHook(null)
        sizesHook(null); brandHook(null);buscadorHook(null)
    },[])

    const limpiarBuscador = useCallback(() => {
        if (selectInputRef.current != null) {
            selectInputRef.current.clearValue();
            buscadorHook(null)
        }
    },[])



    const getcargo = useCallback( async () => {
        let cargo = await allServices.getCargos()
        if (cargo) {
            setCargos(cargo)
        }
    },[setCargos])


    const getRegiones = useCallback(async () =>{
        let allregion = await allServices.regions()
        if (allregion) {
            setRegion(allregion)
        }
	},[setRegion])

    const getCommune = useCallback(async (dato) =>{
        let allcomunne = await allServices.communes(dato)
        if (allcomunne) {
            setCommune(allcomunne)
        }
	},[setCommune])


    const respuestas = useCallback((dato) =>{
        setinputValue(dato)
    },[setinputValue])


	return{brandHook,brand,databrandHook,brandData,productScottHook,
        scottProd,contactHook,contact,subCategoryHook,subCategory,
        sizesHook,size,usosHook,usos,hiddenHook,hidden,refresh,refreshHook,
        categoriasHook,categorias,marcasHook,marcas,grupoHook,grupo,filtroHook,
        idfiltro,colorHook,color,pesoHook,peso,procedenciaHook,procedencia,modeloHook,
        modelo,precioHook,precio,selectInputRef,options,option,limpiar,getcargo,cargos,
        region,getRegiones,commune,getCommune,nameCategory,buscadorHook,buscador,limpiarBuscador,
        respuestas,inputValue
	}

}