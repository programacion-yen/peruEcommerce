import React, { useEffect, useState } from "react";
import useGlobal from "../../hooks/useGlobal";

export default function ResumenCarrito(){

	const {resCarro} = useGlobal();

	useEffect(()=>{

		if(resCarro.length > 0){

			//Datos
			console.log('Resumen', resCarro)
		}

	}, [resCarro])

	return(

		<div></div>

	)

}