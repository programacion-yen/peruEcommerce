import { useRouter } from 'next/router';
import { useContext } from 'react';
import Context from '../../../../../context/UserContext';
import Slider from 'react-slick';

import NextArrow from '../../../../elements/carousel/NextArrow';
import PrevArrow from '../../../../elements/carousel/PrevArrow';
import ProductSimple from '../../../../elements/products/ProductSimple';

import Contador from './Contador';

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

export function CompProdOfertas({ofer}) {

	// Nombre y data del carrusel
	const { nombre, fechaTermino } = ofer[0]
	const { datos, idMiniSitio } = ofer[0].data[0]

	const router = useRouter();

	const { setIdminisitio } = useContext(Context)

	const onMoreClick = async() => {
		await setIdminisitio(idMiniSitio)
		router.push('/ofertas');
	}

	const fechaSplitted = fechaTermino.split('/')
	const fecha = new Date(`${fechaSplitted[2]}, ${fechaSplitted[1]}, ${fechaSplitted[0]}`)

  return (
		<>
			<div className="carouselOfertas">

				<h4 className='carrouselTitle' style={{ marginBottom: 0, marginRight: '2vw' }}>{nombre}</h4>
				<Contador color='red' termino={fecha} />

				<div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
					<h5 className='verMasOferta' onClick={onMoreClick}>Ver Más</h5>
				</div>
				
			</div>

			<hr style={{ marginBottom: '16px'}} />

			<Slider {...carouselSettings} className="ps-carousel">
				{
					datos.map(product => (
						<ProductSimple product={product} key={product.id} />
					))
				}
			</Slider>
		</>
  )
}