import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import DefaultDescription from '../elements/detail/description/DefaultDescription';
import ModuleDetailShoppingActions from '../elements/detail/modules/ModuleDetailShoppingActions';
import BreadCrumb from '../elements/BreadCrumb';
import ModuleDetailTopInformation from '../elements/detail/modules/ModuleDetailTopInformation';
import ModuleProductDetailSpecification from '../elements/detail/modules/ModuleProductDetailSpecification';
import ThumbnailDefault from '../elements/detail/thumbnail/ThumbnailDefault';
import ProductWidgets from '../partials/product/ProductWidgets';
import ProductWidgetsResponsive from '../partials/product/ProductWidgetsResponsive';
// import ModuleDetailActionsMobile from '../elements/detail/modules/ModuleDetailActionsMobile';
import allServices from '/services/allServices'
// import ModuleProductDetailDescription from '../elements/detail/modules/ModuleProductDetailDescription'
import useProducts from '/hooks/useProducts';
import RecommendItems from '/components/partials/shop/modules/RecommendItems'
import SalesItems from '/components/partials/shop/modules/SalesItems'
import { Loading } from '../elements/Loading';

export default function Details() {
	const router = useRouter();
	const { details } = router.query;
	const [productoDetalle, setProductoDetalle] = useState();
	const {refresh,refreshHook} = useProducts()
	const [loading, setLoading] = useState(true)

	const detail = async () =>{
		let parametros  = details ?? []
		let temp1 = parametros[1].split('-');
		let detail = await allServices.getDetailproduct(temp1[1],parametros[0]);
		setProductoDetalle(detail)
		if(refresh) refreshHook(false)
		setLoading(false)
	}

	let nameGroup;
	let nameCategory;
	let nameSubCategory;
	let url;
	let urlCategory;
	let urlSub;
	let name;
	let cuerpo

	if (productoDetalle && productoDetalle.length > 0) {
		productoDetalle.map((item) => {
			cuerpo = item.categorizacion[0]
			name = item.nombreWeb.toLowerCase()
		})
		nameGroup = cuerpo.grupo.toLowerCase()
		nameCategory = cuerpo.categoria.toLowerCase()
		nameSubCategory = cuerpo.accesorio
		url = `${nameGroup}/${cuerpo.idGrupo}`
		urlCategory = `${nameGroup}/${nameCategory}/${cuerpo.idcategoria}`
		urlSub = `${nameGroup}/${nameCategory}/${cuerpo.idcategoria}/${nameSubCategory}/${cuerpo.idaccesorio}`
	}

	const breadCrumb = [
		{
			text: 'Inicio',
			url: '/',
		},
		{
			text: nameGroup,
			url: `/products/catalogo/${url}`
		},
		{
			text: nameCategory,
			url: `/products/catalogo/${urlCategory}`
		},
		{
			text: nameSubCategory,
			url: `/products/catalogo/${urlSub}`
		},
		{
			text: name
		}
	];

	// Cada vez que se pide un refresh desde los componentes hijo
	useEffect(() => {
		// console.log({ready: router.isReady, refresh})
		// if((router.isReady && !productoDetalle) || (router.isReady && refresh) ) {
		// 	console.log('llamada API')
		// 	detail()
		// }
		if(router.isReady && refresh) {
			detail()
		}
	}, [router.isReady, refresh])

	// Cada vez que cambia url
	useEffect(() => {
		if(router.isReady){
			setLoading(true)
			detail()
		}
	}, [details])
	
	return (
		<>
			{
				loading
					? 
						<div style={{ height: '80vh', width: '100%' }}>
							<Loading />
						</div>
					:
						<>
							<div className="ps-page--my-account">
								<BreadCrumb breadcrumb={breadCrumb} />
							</div>
							<div className="ps-page--product">
								<div className="ps-container" style={{ maxWidth: '1200px', padding: 0 }}>
									<div className="ps-page__container" style={{ justifyContent: 'center' }}>
										<div className="ps-page__left">
											<div className="ps-product--detail ps-product--fullwidth">
												<div className="ps-product__header">
													<ThumbnailDefault product={productoDetalle} />
													<div className="ps-product__info">
														<ModuleDetailTopInformation product={productoDetalle}/>
														<ModuleDetailShoppingActions product={productoDetalle} />
														{/* <ModuleProductDetailSpecification product={productoDetalle}/> */}
														{/* <ModuleDetailActionsMobile/> */}
													</div>
												</div>
												<DefaultDescription product={productoDetalle}/>
											</div>

											{
												productoDetalle.bannerLateral &&
													<div className='responsiveAside'>
														<ProductWidgetsResponsive product={productoDetalle}/>
													</div>
											}

											{
												productoDetalle[0].productosMasVistos && <RecommendItems product={productoDetalle}/>
											}
											
											{/* <SalesItems product={productoDetalle}/> */}
										</div>
										{/* <div className="ps-page__right">
											<ProductWidgets product={productoDetalle}/>
										</div> */}
									</div>
								</div>
							</div>
						</>
			}
		</>
	)
}