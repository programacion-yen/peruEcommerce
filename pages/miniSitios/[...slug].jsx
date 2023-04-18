import {useEffect, useState} from "react";
import { getServidorMensaje, getEstructuraMSitios, getProductosMinistios, getMiniSitios } from "../api/MiniSitios";
import { useRouter } from 'next/router'
import Enumerable from 'linq';
import Eslider from "../../components/EstructuraWeb/Minisitios/Eslider";
import Ebanner from "../../components/EstructuraWeb/Minisitios/Ebanner";
import Ebody from "../../components/EstructuraWeb/Minisitios/Ebody";
import { useContext } from "react";
import Context from "../../context/UserContext";
import Eindex from "../../components/EstructuraWeb/Home/EIndex";
import { Loading } from "../../components/elements/Loading";

const MiniSitios = () => {
	const Router = useRouter();
	const { slug } = Router.query;

	const {isLogged, checkingToken, idContacto} = useContext(Context)

	const [encabezado, setEncabezado] = useState([]);
	const [secundario, setSecundario] = useState([]);

	const [productos, setProductos] = useState([])
	const [loading, setLoading] = useState(true)

	async function OrganizarEstructura(){

		const idPublicacion = sessionStorage.getItem('idPublicacion');
		let s =  await getEstructuraMSitios(slug[1], idPublicacion);

		let res = await getProductosMinistios(slug[1]);
		setProductos(res[0].data)

		//Saco todos los elementos que van en la cabecera
		let cabecera = Enumerable.from(s.data)
		.where(w => w.idSeccionUbicacionGrafica == 1 )
		.toArray();
		// console.log(cabecera)
		setEncabezado(cabecera);

		//Saco todos los elementos que van en el sub encabezado
		let secundario = Enumerable.from(s.data)
		.where(w => w.idSeccionUbicacionGrafica == 5 )
		.toArray();
		// console.log(secundario)
		setSecundario(secundario);

		setLoading(false)
	}

	useEffect(async() => {

		if(Router.isReady) {
			if(!isLogged && !checkingToken){
				return Router.push('../loginpage/login_page')
			} else if(isLogged) {

				const res = await getMiniSitios(idContacto);
				const minisitios = res.map(item => item.idMiniSitio)

				// Si usuario no tiene acceso a minisitio
				if(!minisitios.includes(Number(slug[1]))) Router.push('/')

				// Se excluyen minisitios con otra estructura
				if(slug[1] !== '12') await OrganizarEstructura();
			}
			setLoading(false)
		}
		
	}, [isLogged, checkingToken, Router.isReady, slug])

	return (
		<>
			{
				loading
					? 
						<div style={{ height: '80vh', width: '100%' }}>
							<Loading />
						</div>
					:
						// Si es minisitio 12 (Scott) se presenta como home
						slug[1] === '12' 
							?	<Eindex idMinisitio={12} />
							:
								<div className="ps-container">
									<section>
										<Eslider ListaSlider={encabezado}/>
									</section>
									<section>
										<Ebanner ListaBanner={secundario} />
									</section>
									<section>
										<Ebody listabody={''} productos={productos}/>
									</section>
								</div>
			}
		</>
	)
  };
  
  export default MiniSitios;