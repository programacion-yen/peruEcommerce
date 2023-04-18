import Context from '../context/UserContext'
import {useCallback, useContext, useState} from 'react'

export default function useGlobal(){

	const {isActive, setIsActive,max, setMax,min, setMin,keyword, setKeyword,
			iconHeart, setIconHeart,iconCart, setIconCart,procesar,setProcesar,
			carrito,setCarrito,iva,setIva,minisitios, setMiniSitios,
			idminisito,setIdminisitio, resCarro, setResCarro} = useContext(Context);

	const activehook = useCallback((estado) =>{
		setIsActive(estado);
	},[setIsActive])

	const keywordhook = useCallback((word) =>{
		setKeyword(word);
	},[setKeyword])


	const maxhook = useCallback((valor) =>{
		setMax(valor);
	},[setMax]);

	const minhook = useCallback((valor) =>{
		setMin(valor);
	},[setMin]);

	const IconHearthook = useCallback((valor) =>{
		setIconHeart(valor);
	},[setIconHeart])

	const IconCarthook = useCallback((valor) =>{
		setIconCart(valor);
	},[setIconCart])

	const procesarCarritoHook = useCallback((productos) =>{
		setProcesar(productos)
	},[setProcesar,setCarrito,setIva])

	const DatosMiniSitios = useCallback((sitio) =>{
		setMiniSitios(sitio);
	},[setMiniSitios])

	const idMinisitoHook = useCallback((id) => {
		setIdminisitio(id)
	},[setIdminisitio])

	const ResumenCarroGlobal = useCallback((Resumen) =>{
		setResCarro(Resumen);
	}, [setResCarro]) 

	

	return{
		isActive: Boolean(isActive),activehook,maxhook,minhook,
		min, max,keyword,keywordhook,iconHeart,IconHearthook,
		iconCart,IconCarthook,procesar,procesarCarritoHook,
		carrito,iva,DatosMiniSitios,minisitios,idMinisitoHook,idminisito, ResumenCarroGlobal, resCarro
	}

}