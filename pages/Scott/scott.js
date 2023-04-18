import React,{useState,useEffect,useRef} from 'react';
import allServices from '../../services/allServices';
import useProducts from '/hooks/useProducts';
import MartketPlace2Banner from '/components/partials/homepage/marketplace2/MartketPlace2Banner'
import SkeletonProduct from '/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '/utils/common-helpers';
import ProductSimple from '/components/elements/products/ProductSimple';
import ProductWide from '/components/elements/products/ProductWide';
import useLogin from '/hooks/useLogin';
import AutopartPromotions from '/components/partials/homepage/autopart/AutopartPromotions';
import { carouselStandard } from '/utils/common-helpers';
import ProductDealHot from '/components/elements/products/ProductDealHot';
import ProductHorizontal from '/components/elements/products/ProductHorizontal';
import SkeletonProductDetail from '/components/elements/skeletons/SkeletonProductDetail';
import Slider from 'react-slick';
import { useRouter } from 'next/router';


export default function Scott({columns = 5}) {


    const sliderRef = useRef(null);
    const {productScottHook,scottProd,hiddenHook} = useProducts();
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState('col-xl-3 col-lg-2 col-md-3 col-sm-6 col-6');
    const [listView, setListView] = useState(true);
    const [total, setTotal] = useState(0);
    const {isLogged} = useLogin();

  const Router = useRouter();

  //Cambia la vista de cuadrito a listas los productos
  function handleChangeViewMode(e) {
      e.preventDefault();
      setListView(!listView);
  }

      //Esto no va
      const handleCarouselPrev = (e) => {
        e.preventDefault();
        sliderRef.current.slickPrev();
    };

    //Esto no va
    const handleCarouselNext = (e) => {
        e.preventDefault();
        sliderRef.current.slickNext();
    };

//Para ordenar por precio
  function orderPrice(e) {
      setLoading(true);
      let newSortedList = [...scottProd].sort((a, b) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
      if(e == 0 ) {
          productScottHook(newSortedList)
      }else if (e == 1 ) {
          newSortedList = [...scottProd].sort((b,a) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
          productScottHook(newSortedList)
      }

      let orderAlfavetico = [...scottProd].sort((a,b) => a.nombreWeb.localeCompare(b.nombreWeb))
      if(e == 2){
          productScottHook(orderAlfavetico)
      }else if (e == 3) {
          orderAlfavetico = [...scottProd].sort((b,a) => a.nombreWeb.localeCompare(b.nombreWeb))
          productScottHook(orderAlfavetico)
      }
  }

  //Carga productos Scott
  const productScotts = async () =>{
    let dato = await allServices.getProductScott();
    productScottHook(dato);
    if (dato) {
      setLoading(true);
      setTotal(dato.length);
    }
  }

  //No va
  function handleSetColumns() {
      switch (columns) {
          case 2:
              setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
              return 3;
              break;
          case 4:
              setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
              return 4;
              break;
          case 5:
              setClasses('col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6');
              return 5;
              break;

          default:
              setClasses('col-xl-3 col-lg-4 col-md-3 col-sm-6 col-6');
      }
  }

  useEffect(() => {

    if(!isLogged){

        return Router.push('../loginpage/login_page')
    }
    hiddenHook(false)
    productScotts()
    handleSetColumns()
  },[])

  let productItemsView;
  let productItemsViewHot, relatedView;
  if (loading) {
    if (scottProd && scottProd.length > 0) {
        const slideItems = scottProd.map((item) => (
            <ProductDealHot products={item} key={item.id} />
        ));
        const relatedItems = scottProd.map((item, index) => {
            if (index > 1 && index < 6) {
                return <ProductHorizontal products={item} key={item.id} />;
            }
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
            <Slider {...carouselStandard}>
                <div className="ps-product-group" key="group-1">
                    {relatedItems}
                </div>
            </Slider>
        );
        if (listView) {
            const items = scottProd.map((item) => (
                <div className={classes} key={item.id}>
                    <ProductSimple product={item} />
                </div>
            ));

            productItemsView = (
                <div className="ps-shop-items">
                    <div className="row">{items}</div>
                </div>
            );
        } else {
          productItemsView = scottProd.map((item) => (
              <ProductWide product={item} key={item}/>
          ));
        }
      } else {
        productItemsView = <p>Sin datos</p>
        productItemsViewHot =<p>Sin datos.</p>;
      }
    } else {
        const skeletonItems = generateTempArray(12).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
        productItemsViewHot = <SkeletonProductDetail />;
    }

  return (
    <>
        {/* <MartketPlace2Banner/>
        <AutopartPromotions/> */}
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
                                        href=".ps-carousel--deal-hot"
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
                            className="widget widget_best-sale"
                            data-mh="dealhot">
                            <h3 className="widget-title">Ver Productos Scott</h3>
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
                  <div className="ps-shopping__actions">
                      {isLogged ? <select
                          className="ps-select form-control"
                          onChange={(e) => {orderPrice(e.target.value)}}
                          defaultValue="">
                          <option value="" disabled>Seleccione una opción</option>
                          <option value='0'>Ordenar por precio: menor a mayor</option>
                          <option value='1'>Ordenar por precio: mayor a menor</option>
                          <option value='2'>Ordenar A-Z</option>
                          <option value='3'>Ordenar Z-A</option>
                      </select> : ''}
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
              <div className="ps-shopping__content">{productItemsView}</div>
          </div>
        </div>
    </>
  )
};
