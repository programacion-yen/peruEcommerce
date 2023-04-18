import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import Link from 'next/link';
import NextArrow from '../../../../elements/carousel/NextArrow';
import PrevArrow from '../../../../elements/carousel/PrevArrow';
// import { ClaseUbicacionHorizontal, ClaseColumnas, ArrayImagenes } from '../../../../../utils/utilidades';

export const CompSlider = ({sl}) => {

	//Configuracion del Slider
	const carouselSettings = {
    autoplaySpeed: 4000,
    speed: 500,
    dots: false,
    arrows: true,
    infinite: true,
    // fade: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const [imagenes, setimagenes] = useState([]);
  const [windowWidth, setWindowWidth] = useState(600)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
	}

	useEffect(() => {
		window.addEventListener("resize", handleResize, false);
    setWindowWidth(window.innerWidth)

    return () => {
      window.removeEventListener("resize", handleResize, false);
    }
	}, [])

  //Cargar el slide y sus ubicaciones si son mas de 1
  function CargarSliders(){
    let item = sl[0];
    let img = item.imgs;
    setimagenes(img);
  }

  useEffect(() =>{
    CargarSliders();
  },[sl])

  return(
    <>
        <div>
            {imagenes != undefined && 

              <Slider {...carouselSettings} className="ps-carousel slider-principal">
                {
                  imagenes.map((item, key) =>
                    <div key={key}>
                      <Link href={item.url} target="_blank" key={key}>
                        <a>
                            <img src={windowWidth <= 576 && !!item.imgMobile ? item.imgMobile : item.img} alt={item.nombre} style={{ width: '100%' }} />
                        </a>
                      </Link>
                    </div>
                  )
                } 
              </Slider> 
            }
        </div>
    </>
  )
}