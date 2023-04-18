import React,{useState,useEffect} from 'react'
import MarketPlace2Promotions from '/components/partials/homepage/marketplace2/MarketPlace2Promotions'
import SkeletonProduct from '/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '/utils/common-helpers';
import ProductSimple from '/components/elements/products/ProductSimple';
import ProductWide from '/components/elements/products/ProductWide';
import useLogin from '/hooks/useLogin';
import allServices from '../../services/allServices';

export default function Booking({columns = 5}) {
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState('col-xl-3 col-lg-2 col-md-3 col-sm-6 col-6');
    const [listView, setListView] = useState(true);
    const [total, setTotal] = useState(0);
    const [productBooking , setProductBooking] = useState()
    const {isLogged} = useLogin()


    function order(e) {
        setLoading(true);
        let newSortedList = [...productBooking].sort((a, b) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
        if(e == 0 ) {
            setProductBooking(newSortedList)
        }else if (e == 1 ) {
            newSortedList = [...productBooking].sort((b,a) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
            setProductBooking(newSortedList)
        }
  
        let orderAlfavetico = [...productBooking].sort((a,b) => a.nombreWeb.localeCompare(b.nombreWeb))
        if(e == 2){
            setProductBooking(orderAlfavetico)
        }else if (e == 3) {
            orderAlfavetico = [...productBooking].sort((b,a) => a.nombreWeb.localeCompare(b.nombreWeb))
            setProductBooking(orderAlfavetico)
        }
    }
  

    function handleChangeViewMode(e) {
        e.preventDefault();
        setListView(!listView);
    }

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

    const productReserva = async () =>{
        let dato = await allServices.reservas();
        setProductBooking(dato);
        if (dato) {
          setLoading(true);
          setTotal(dato.length);
        }
      }

    useEffect(() => {
        productReserva()
        handleSetColumns()
    },[])
    let productItemsView;
    if (loading) {
    if (productBooking && productBooking.length > 0) {
        if (listView) {
            const items = productBooking.map((item) => (
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
        productItemsView = productBooking.map((item) => (
            <ProductWide product={item} key={item}/>
        ));
        }
    } else {
        productItemsView = <p>Sin datos</p>
    }
    } else {
        const skeletonItems = generateTempArray(12).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    }
  return (
    <><MarketPlace2Promotions />
        <div className="ps-shopping py-5">
          <div className="ps-container">
              <div className="ps-shopping__header">
                  <p>
                      <strong className="mr-2">{total}</strong>
                      Productos encontrados
                  </p>
                  <div className="ps-shopping__actions">
                      <select
                          className="ps-select form-control"
                          onChange={(e) => {order(e.target.value)}}
                          defaultValue="">
                          <option value="" disabled>Seleccione una opción</option>
                          {isLogged && <>
                            <option value='0'>Ordenar por precio: menor a mayor</option>
                            <option value='1'>Ordenar por precio: mayor a menor</option></>}
                            <option value='2'>Ordenar A-Z</option>
                            <option value='3'>Ordenar Z-A</option>
                      </select>
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
}
