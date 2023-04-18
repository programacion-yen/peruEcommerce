import React,{useState,useEffect,useRef} from 'react';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import useLogin from '/hooks/useLogin';
import useProducts from '/hooks/useProducts';
import SkeletonProduct from '/components/elements/skeletons/SkeletonProduct';
import {generateTempArray} from '/utils/common-helpers';
import ProductSimple from '/components/elements/products/ProductSimple';
import ProductWide from '/components/elements/products/ProductWide';
import carouselStandard from '/utils/common-helpers';
import ProductDealHot from '/components/elements/products/ProductDealHot';
import ProductHorizontal from '/components/elements/products/ProductHorizontal';
import SkeletonProductDetail from '/components/elements/skeletons/SkeletonProductDetail';
import { getProductosMinistios,getServidorMensaje } from '../../../pages/api/MiniSitios';
import {  Input, List, Skeleton} from 'antd';
import Select from 'react-select';
import { useContext } from 'react';
import Context from '../../../context/UserContext';
import { Loading } from '../../elements/Loading';

export default function Ebody({productos}){

	const sliderRef = useRef(null);
	const {productScottHook,scottProd,hiddenHook,option,options,selectInputRef,limpiar} = useProducts();
	const { isLogged } = useContext(Context)
	const [loading, setLoading] = useState(true);
	// const [classes, setClasses] = useState('col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6');
	const [listView, setListView] = useState(true);
	const [selectedOption, setSelectedOption] = useState(null);
	const [total, setTotal] = useState(0);
	const [MinisitioProducts, setMinisitioProducts] = useState([])

	// const {isLogged} = useLogin();
	const Router = useRouter();

  	//Cambia la vista de cuadrito a listas los productos
  	function handleChangeViewMode(e) {
		e.preventDefault();
		setListView(!listView);
	}

	const handleCarouselPrev = (e) => {
		e.preventDefault();
		sliderRef.current.slickPrev();
	};

	const handleCarouselNext = (e) => {
		e.preventDefault();
		sliderRef.current.slickNext();
	};

	//Para ordenar por precio
	function orderPrice(e) {
		try {
            let newSortedList = [...MinisitioProducts].sort((a, b) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
            if(e && e.value == 0 ) {
							setMinisitioProducts(newSortedList)
            }else if (e && e.value == 1 ) {
							newSortedList = [...MinisitioProducts].sort((b,a) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
							setMinisitioProducts(newSortedList)
            }

            let orderAlfavetico = [...MinisitioProducts].sort((a,b) => a.nombreWeb.localeCompare(b.nombreWeb))
            if(e && e.value == 2){
							setMinisitioProducts(orderAlfavetico)
            }else if (e && e.value == 3) {
							orderAlfavetico = [...MinisitioProducts].sort((b,a) => a.nombreWeb.localeCompare(b.nombreWeb))
							setMinisitioProducts(orderAlfavetico)
            }
        } catch(error) {
            console.log('error', error);
        }
	}

	useEffect(async () => {
		if(isLogged) {
			let s = await getServidorMensaje(1);
			hiddenHook(false);
			limpiar()
			if(s) Router.push('/503')
		}
	},[])

	useEffect(() => {
		setLoading(true)
	},[Router.query.slug])

	useEffect(() => {
		if (productos.length > 0) {
			setMinisitioProducts(productos);
			setTotal(productos.length);
		}
		setLoading(false);
	},[productos])

  	let productItemsView;
  	let productItemsViewHot, relatedView;
	  if (!loading) {
			if (MinisitioProducts && MinisitioProducts.length > 0) {
				// const slideItems = scottProd.map((item) => (
				// 	<ProductDealHot products={item} key={item.id} item={Msitio}/>
				// ))
				const scottSlider = MinisitioProducts.slice(0,4)

				// Temporal, se necesita productos destacados, maximo 4-5
				const slideItems = scottSlider.map((item) => (
					<ProductDealHot products={item} key={item.id} />
				))

				const relatedItems = scottSlider.map((item, index) => {
					return <ProductHorizontal products={item} key={item.id} />;
				});
				productItemsViewHot = (
					<Slider
						ref={(slider) => (sliderRef.current = slider)}
						{...carouselStandard}
						arrows={false}
						className="ps-carousel outside">
						{slideItems}
					</Slider>
				);
				relatedView = (
					<Slider {...carouselStandard} arrows={true}>
						<div className="ps-product-group" key="group-1">
							{relatedItems}
						</div>
					</Slider>
				);
				if (listView) {
					productItemsView = <List
						grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6, }}
						dataSource={MinisitioProducts}
						pagination={{
							showSizeChanger: false,
							pageSize: 12,
							responsive:true
						}}
						renderItem={item => (
							<List.Item>
								<ProductSimple product={item} key={item.id}/>
							</List.Item>
						)}
					/>
				}else{
					productItemsView = (<List
						dataSource={MinisitioProducts}
						pagination={{
							showSizeChanger: false,
							pageSize: 12,
							responsive:true
						}}
						renderItem={item => (
							<List.Item>
								<ProductWide product={item} key={item.id}/>
							</List.Item>
						)}
					/>)
				}
			} else {
				productItemsView = <p>Sin datos</p>
				productItemsViewHot =<p>Sin datos.</p>;
			}
		} else {
			productItemsViewHot = <div style={{ height: '100%', width: '100%' }}><Loading /></div>
			// const skeletonItems = generateTempArray(12).map((item) => (
			// 	<div className={classes} key={item}>
			// 		<SkeletonProduct />
			// 	</div>
			// ));
			// productItemsView = <div className="row">{skeletonItems}</div>;
			// productItemsViewHot = <SkeletonProductDetail />;
		}

	return(
		<>
			<div className="ps-deal-hot">
				<div className="ps-container">
					<div className="row">
						<div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12 ">
							<div className="ps-block--deal-hot" data-mh="dealhot">
								<div className="ps-block__header">
									<h3>Productos</h3>
									<div className="ps-block__navigation">
										<a
											className="ps-carousel__prev"
											href="#"
											onClick={(e) => handleCarouselPrev(e)}>
											<i className="icon-chevron-left"></i>
										</a>
										<a
											className="ps-carousel__next"
											href="#"
											onClick={(e) => handleCarouselNext(e)}>
											<i className="icon-chevron-right"></i>
										</a>
									</div>
								</div>
								<div className="ps-product__content">
									{productItemsViewHot}
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 ">
							<aside
								className="widget widget_best-sale pb-0"
								data-mh="dealhot">
								<h3 className="widget-title">Ver Productos</h3>
								<div className="widget__content">{relatedView}</div>
							</aside>
						</div>
					</div>
				</div>
			</div>

			<div className="ps-shopping py-5">
			  <div className="ps-container">
				  <div className="ps-shopping__header">
					  <p>
						  <strong className="mr-2">{total}</strong>
						  Productos encontrados
					  </p>
						{/* <div style={{ width: '30%' }}>
							<Input 
								placeholder='Buscar'
							/>
						</div> */}
					  <div className="ps-shopping__actions">
							<div style={{ width: '19rem' }}>
								<Select
									ref={selectInputRef}
									instanceId="precio"
									placeholder="Seleccionar"
									defaultValue={selectedOption}
									onChange={(e) => {orderPrice(e)}}
									options={isLogged ? options : option}
									/>
							</div>
						  <div className="ps-shopping__view">
							  <p>Ver</p>
							  <ul className="ps-tab-list">
								  <li className={listView === true ? 'active' : ''}>
									  <a
										  href="#"
										  onClick={(e) => handleChangeViewMode(e)}>
										  <i className="icon-grid"></i>
									  </a>
								  </li>
								  <li className={listView !== true ? 'active' : ''}>
									  <a
										  href="#"
										  onClick={(e) => handleChangeViewMode(e)}>
										  <i className="icon-list4"></i>
									  </a>
								  </li>
							  </ul>
						  </div>
					  </div>
				  </div>
				  <div className="ps-shopping__content">
				  		{productItemsView}
					</div>
			  </div>
			</div>
		</>
	)



}







