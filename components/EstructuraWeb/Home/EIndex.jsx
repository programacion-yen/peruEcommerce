import Enumerable from "linq";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// import useGetProducts from '../../../hooks/useGetProducts';
import useProducts from '../../../hooks/useProducts';
import useGlobal from '../../../hooks/useGlobal';
// import useLogin from "../../../hooks/useLogin";

import { getEstructuraMSitios, getServidorMensaje } from "../../../pages/api/MiniSitios";
// import GroupsHome from '../../layouts/GroupsHome';
// import MarketPlaceHomeBanner from '../../partials/homepage/marketplace/MarketPlaceHomeBanner';
// import ESlider from "./ESlider";
// import Ebaner from './EBanner';
// import SkeletonSinglePost from '/components/elements/skeletons/SkeletonSinglePost';
// import SkeletonProduct from '/components/elements/skeletons/SkeletonProduct';
// import { generateTempArray } from '/utils/common-helpers';
//Componentes de la vista
import { ComponentesVista } from "./Componentes/ComponentesVista";
// import { CompBanner } from "./Componentes/SubComponentes/CompBanner";
// import { CompSlider } from "./Componentes/SubComponentes/CompSlider";
// import Contador from "./Componentes/SubComponentes/Contador";
import { Loading } from "../../elements/Loading";

export default function Eindex({items, idMinisitio = 1}){

	const {hiddenHook,limpiar} = useProducts()
	const {isActive, activehook,keywordhook} = useGlobal();
	// const {isLogged, carthook} = useLogin();

	const Router = useRouter();
	const { query, isReady } = Router;

	// Parametro preview backoffice
	const idPublicacionQuery = query.idPublicacion;
	//Const armado vista
	// const [cabecera, setCabecera] = useState();
	// const [subCabecera, setSubCabecera] = useState();
	// const [banner, setBanner] = useState();

	// const [sliderGropu, setSliderGropu] = useState();

	const [components, setComponents] = useState([]);

	const [loading, setLoading] = useState(true);

	async function getEstructuraWeb(){

		const idPublicacion = sessionStorage.getItem('idPublicacion')

		let s = await getEstructuraMSitios(idMinisitio, idPublicacion);
		let Home = s.data[0].salida;
		let rows =  Enumerable.from(Home.paginas[0].secciones).toArray();
		setComponents(rows);
  }

	useEffect( async () => {
		
		// carthook();
		if(isReady){

			if( idPublicacionQuery ) {
				sessionStorage.setItem('idPublicacion', idPublicacionQuery);
			} 
			// else {
			// 	sessionStorage.removeItem('idPublicacion');
			// }
			
			let s = await getServidorMensaje(1);
			
			if(s == false){
				
				await getEstructuraWeb();
				hiddenHook(true)

				if(isActive){
					activehook(false);
					keywordhook('')
					// limpiar()
				}

				limpiar()
			}
			else{
				Router.push('/503')
			}

			setLoading(false);
		}
		
	}, [isReady]);

	// let group;
	// let recomendamos;
	// let masVendidos;
	// if (categories && categories.length > 0) {
	// 	for (var i = 0; i < categories.length; i++) {
	// 	  categories[i].TipoConsulta = i + 1;
	// 	}
	// 	group = categories.map((item,key) =>{
	// 		recomendamos = item.TipoConsulta
	// 		masVendidos = parseInt(`4${item.TipoConsulta}`)
	// 		return <GroupsHome key={key} items={item} typeRequest={recomendamos} typeSale={masVendidos} data={sliderGropu}/>
	// 	})
	// }else {
	// 	const skeletonItems = generateTempArray(3).map((item, key) => (
	// 		<div className="ps-container" key={key}>
	// 			<SkeletonSinglePost/>
	// 		</div>
	// 	));
	// 	group = <div className='ps-container'>{skeletonItems}</div>;
	// }

	return(
		<>
			{
				loading
					?	
						<div style={{ height: '80vh', width: '100%' }}>
							<Loading />
						</div>
					:
						<div>
							{
								components.map((dato, key) =>(
									<div className="marginBottomVista" key={key} >
										<ComponentesVista items={dato} />
									</div>
								))
							}
						</div>	
			}
			

			{/* <ESlider ListaSlider={cabecera} />
			<Ebaner ListaBanner={banner} />
			{group} */}
		</>
	)
}