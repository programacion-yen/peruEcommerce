import { useState } from 'react'

import { Tabs } from 'antd';
import Slider from 'react-slick';

import NextArrow from '../../../../elements/carousel/NextArrow';
import PrevArrow from '../../../../elements/carousel/PrevArrow';
import ProductSimple from '../../../../elements/products/ProductSimple';
import SkeletonProduct from '../../../../elements/skeletons/SkeletonProduct';

const { TabPane } = Tabs;

const carouselSettings = {
	autoplay: true,
	autoplaySpeed: 6000,
	speed: 500,
	dots: false,
	arrows: true,
	infinite: true,
	slidesToShow: 5,
	slidesToScroll: 5,
	nextArrow: <NextArrow />,
	prevArrow: <PrevArrow />,
	responsive: [
		{
			breakpoint: 1600,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			}
		},
		{
			breakpoint: 900,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			}
		},
		{
			breakpoint: 650,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			}
		}
	]
};

export function CompProductos({prod}){

	// Nombre y data del carrusel
	const { nombre } = prod[0]
	const [data1, data2] = prod[0].data;
	
	const [loading, setLoading] = useState(false)

	const onTabChange = (key) => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 100);
		// console.log(key);
	}

  return (
		<Tabs 
			defaultActiveKey="1" 
			onChange={onTabChange} 
			tabBarStyle={{ display: 'flex', justifyContent: 'flex-end' }} 
			tabBarExtraContent={{ left: <h4 className='carrouselTitle' style={{ marginBottom: 0, flex: 1 }}>{nombre}</h4>}}
			items={[
				{
					label: 'Te Recomendamos',
					key: '1',
					children: (
						<Slider {...carouselSettings} className="ps-carousel">
							{
								loading
									?	
										Array.from(Array(5).keys()).map(item => <SkeletonProduct key={item} />)
									:
										data1.datos.map(product => (
											<ProductSimple product={product} key={product.id} />
										))
							}
						</Slider>
					)
				},
				{
					label: 'Más Vendidos',
					key: '2',
					children: (
						<Slider {...carouselSettings} className="ps-carousel">
							{
								loading
									?
										Array.from(Array(5).keys()).map(item => <SkeletonProduct key={item} />)
									:
										data2.datos.map(product => (
											<ProductSimple product={product} key={product.id} />
										))
							}
						</Slider>
					)
				}
			]}
		/>
  )
}