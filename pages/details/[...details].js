import React, {useEffect} from 'react'
import Details from '/components/products/Details'
import useGlobal from '/hooks/useGlobal'
import useProducts from '/hooks/useProducts';

export default function DetailsProduct() {

    const {isActive, activehook,keywordhook} = useGlobal();
	const {limpiar} = useProducts()

    useEffect(() => {
        if(isActive){
			activehook(false);
            keywordhook('')
            limpiar()
		}
    }, []);

	return (
		<Details />
	)
}
