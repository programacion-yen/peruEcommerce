import { useEffect, useState } from "react"

import { Alert, List } from "antd"
import Select from 'react-select';

import BreadCrumb from "../../components/elements/BreadCrumb"
import ProductSimple from "../../components/elements/products/ProductSimple"
import ProductWide from "../../components/elements/products/ProductWide"
import SkeletonProduct from "../../components/elements/skeletons/SkeletonProduct"

import useLogin from "../../hooks/useLogin"
import useProducts from "../../hooks/useProducts"
import allServices from "../../services/allServices"
import Context from "../../context/UserContext";
import { useContext } from "react";
import { useRouter } from "next/router";

const breadcrumb = [{
  text: 'Inicio',
  url: '/'
},{
  text: 'Ofertas'
}]

const OfertasPage = () => {

  const router = useRouter()

  const { selectInputRef, option, options } = useProducts();
  const {isLogged} = useLogin()

  const {idminisitio} = useContext(Context)

  const [shopItems, setshopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listView, setListView] = useState(true);

  const getProductosOferta = async() => {
    try {
      const products = await allServices.getProductsOferta(idminisitio);
      setshopItems(products);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  
  useEffect(() => {
    if(idminisitio === 1){
      router.push('/')
    }
    getProductosOferta();
  }, [])

  const handleChangeViewMode = (e) => {
    e.preventDefault();
    setListView(!listView);
  }
  
  const order = (e) => {
    try {
      let newSortedList = [...shopItems].sort((a, b) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
      if(e && e.value == 0 ) {
        setshopItems(newSortedList)
      } else if (e && e.value == 1 ) {
        newSortedList = [...shopItems].sort((b,a) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
        setshopItems(newSortedList)
      }

      let orderAlfavetico = [...shopItems].sort((a,b) => a.nombreWeb.localeCompare(b.nombreWeb))
      if(e && e.value == 2){
        setshopItems(orderAlfavetico)
      } else if (e && e.value == 3) {
        orderAlfavetico = [...shopItems].sort((b,a) => a.nombreWeb.localeCompare(b.nombreWeb))
        setshopItems(orderAlfavetico)
      }
    } catch(error) {
      console.log('error', error);
    }
  }

  let productos;
    if (!loading) {
      if (listView) {
        productos = <List
          grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
          dataSource={shopItems}
          pagination={{
            showSizeChanger: false,
            pageSize: 12,
            responsive:true
          }}
          locale={{ emptyText: <Alert message="Sin datos para mostrar" type="info" showIcon /> }}
          renderItem={item => (
            <List.Item>
              <ProductSimple product={item} key={item.id}/>
            </List.Item>
          )}
        />
      }else{
        productos = (
          // <div style={{ margin: '0 10%'}}>
            <List
              dataSource={shopItems}
              locale={{ emptyText: <Alert message="Sin datos para mostrar" type="info" showIcon /> }}
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
            />
          // </div>
        )
      }
    }else{
      const skeletons = Array.from(Array(12).keys()).map((item) => (
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6" key={item}>
              <SkeletonProduct />
          </div>
      ));
      productos = <div className="row">{skeletons}</div>;
    }

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <div className="ps-page--shop" id="shop-sidebar">
        <div className="container">
          <div className="ps-layout--shop" >
            <div className="ps-shopping">
              <div className="ps-shopping__header">
                <p>
                  <strong className="mr-2">{shopItems.length}</strong>
                    Productos encontrados
                </p>
                <div className="ps-shopping__actions">
                    <div style={{ width: '19rem' }}>
                      <Select
                        ref={selectInputRef}
                        instanceId="precio"
                        placeholder="Seleccionar"
                        onChange={(e) => {order(e)}}
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
              { productos }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OfertasPage