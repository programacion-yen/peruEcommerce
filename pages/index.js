//import Eindex from '../components/EstructuraWeb/Home/EIndex';
// import Enumerable from "linq";

// import router,{useRouter} from "next/router";
// import useGetProducts from '/hooks/useGetProducts';
// import useProducts from '/hooks/useProducts';
// import useGlobal from '/hooks/useGlobal';
// import { getEstructuraMSitios, getServidorMensaje } from "../pages/api/MiniSitios";
// import GroupsHome from '/components/layouts/GroupsHome';
// import MarketPlaceHomeBanner from '/components/partials/homepage/marketplace/MarketPlaceHomeBanner';
// import ESlider from "/components/EstructuraWeb/Home/ESlider";
// import Ebaner from '/components/EstructuraWeb/Home/EBanner';
// import SkeletonSinglePost from '/components/elements/skeletons/SkeletonSinglePost';
// import SkeletonProduct from '/components/elements/skeletons/SkeletonProduct';
// import { generateTempArray } from '/utils/common-helpers';
// import allServices from '/services/allServices'
import Eindex from "../components/EstructuraWeb/Home/EIndex";

// Dependencias Modal
// import Context from "../context/UserContext";
// import { Modal } from "antd";
// import { useRouter } from "next/router";
// import { useContext, useEffect, useState } from "react";
// import { Loading } from "../components/elements/Loading";

export default function Home({items}) {
	
	// const { modalHomeIsOpen, setModalHomeIsOpen } = useContext(Context)
	// const [loading, setLoading] = useState(true);

	// const router = useRouter();

	// const closeModal = () => {
	// 	setModalHomeIsOpen(false);
	// }

	// Si viene de la página antigua no se tiene que mostrar el modal
	// useEffect(() => {
	// 	if(router.isReady){
	// 		if(router.query?.modal === '0') setModalHomeIsOpen(false)
	// 		setLoading(false)
	// 	}
	// }, [router.isReady])

	return(
		<>
			{/* {
				loading 
					? 
						<div style={{ minHeight: '80vh', width: '100%', display: 'flex', alignItems: 'center' }}>
							<Loading />
						</div>
					:
						<>
							<Modal
								width={'100%'}
								className='p-0'
								style={{ maxWidth: 'unset', maxHeight: 'unset', height: '100%', top: 0, margin: 0 }}
								footer={null}
								visible={modalHomeIsOpen}
								closeIcon={<></>}
								transitionName=''
							>
								<div 
									style={{ 
										backgroundImage: 'url(/logo/modalNuevoSitio/fondo.png)',
										width: '100%',
										height: 'auto',
										minHeight: '100vh',
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'column',
										backgroundSize: 'cover',
									}}
								>
									<img src='/logo/modalNuevoSitio/logo.png' style={{ height: '85px', width: '64px', marginBottom: '40px' }} />
									<img src='/logo/modalNuevoSitio/p1.png' style={{ height: '45px', width: '383px', marginBottom: '30px' }} />
									<img src='/logo/modalNuevoSitio/pc.png' style={{ height: '258px', width: '429px', marginBottom: '30px', padding: '20px' }} />
									<img src='/logo/modalNuevoSitio/btn-nuevo.png' style={{ height: '45px', width: '265px', marginBottom: '30px', cursor: 'pointer' }} onClick={closeModal} />
									<img src='/logo/modalNuevoSitio/p2.png' style={{ height: '24px', width: '230px', marginBottom: '30px' }} />
									<a href='https://www.andesindustrial.cl/' ><img src='/logo/modalNuevoSitio/btn-antiguo.png' style={{ height: '45px', width: '265px', marginBottom: '30px', cursor: 'pointer' }} /></a>
									<img src='/logo/modalNuevoSitio/logo-andes.png' style={{ height: '37px', width: '254px', marginBottom: '30px' }} />
								</div>
							</Modal>

							<Eindex items={items} />
						</>
			} */}
			<Eindex items={items} />
		</>
	)

}
