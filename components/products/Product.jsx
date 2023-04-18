import React,{useEffect,useState} from 'react'
import ProductSimple from '/components/elements/products/ProductSimple';
import useLogin from '/hooks/useLogin';
import allServices from '../../services/allServices';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonProduct from '../elements/skeletons/SkeletonProduct';
import { generateTempArray } from '../../utils/common-helpers';
import {  List,Alert} from 'antd';

export default function Product(type) {

    const {isLogged} = useLogin()

    const [productos, setProductos] = useState([]);

    const classes = 'col-xl-3 col-lg-2 col-md-3 col-sm-6 col-6';
    const [loading, setLoading] = useState(false);

    // console.log(type.type)
    const Callproducts = async () =>{
        let items = [];
        let dato;

        items = {TipoConsulta:type.type,IDSitio:1,top:36}
        dato = await allServices.getCategoriesProductUser(items);
        // console.log(dato)
        setLoading(true);

        if(dato !== undefined){
            setProductos(dato);
        }
        else{
            setProductos([]);
        }
    }

    useEffect(() => {
        const unsubscribe = Callproducts();
        return unsubscribe;
    }, []);

  let productItemsView;
  if (loading) {
        if (productos && productos.length > 0) {
        const items =
                <List
                    grid={{ column: 4 }}
                    dataSource={productos}
                    pagination={{
                        showSizeChanger: false,
                        pageSize: 8,
                        responsive:true,
                    }}
                    className="m-0"
                    renderItem={item => (
                        <List.Item className="m-0 p-0" style={{height: 451}}>
                            <ProductSimple product={item} key={item.id}/>
                        </List.Item>
                    )}
                />
            productItemsView = items;
        }
        else {
            productItemsView = <p>Sin datos</p>
        }
    }
    else {
        const skeletonItems = generateTempArray(8).map((item) => (
            <div className='col-xl-3 col-lg-2 col-md-3 col-sm-6 col-6 ps-product ps-product--simple m-0' key={item}>
                <div className='ps-product__thumbnail p-0 m-0'>
                    <SkeletonProduct />
                </div>
            </div>
        ));
        productItemsView = skeletonItems;
    }

    return (
        <div className="d-flex flex-wrap">{productItemsView}</div>
        // <></>
    )
}