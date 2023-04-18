import React from 'react';
import Slider from 'react-slick';
import { carouselSingle } from '/utils/carousel-helpers';
import Products from '/components/products/Product'
import Link from 'next/link';
import { FormatoPalabras } from '/utils/utilidades';

const ThumbnailGruposAndCategories = ({items,data,type}) => {
    let categoriesName;
    let imgGroup;

    if (items && data && data.length > 0) {
        categoriesName = items.categoria.map((item) => {
            if(item.idCategoria !== 1055){
                return <li key={item.idCategoria}>
                    <Link href={`/products/catalogo/${items.grupo.toLowerCase()}/${item.nombre.toLowerCase()}/${item.idCategoria}`}>
                        <a key={item.idCategoria}>{FormatoPalabras(item.nombre)}</a>
                    </Link>
                </li>
            }
        });

        imgGroup = data.map((item,key) => {
            if (item.seccionUbicacionGrafica.match(/^Grupo.*$/)) {
                if (item.seccionUbicacionGrafica.slice(6, -1).toUpperCase() == items.grupo.slice(0, -1)) {
                    return <Link href={item.url}>
                        <a key={key}>
                                <img
                                src={item.imagen}
                            />
                        </a>
                    </Link>

                }
            }
        });
    }else{
        categoriesName = <p>Esperando datos</p>;
    }

    return (
        <><div className="ps-block__categories">
            <ul key={items.id}>
                {categoriesName}
            </ul>
        </div>
        <div className="ps-block__slider">
            <Slider {...carouselSingle} className="ps-carousel">
                {imgGroup}
            </Slider>
        </div>
        </>

    );
};

export default ThumbnailGruposAndCategories;
