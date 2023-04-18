import React,{useState} from 'react'
import useLogin from '/hooks/useLogin';
import ProductSimple from '/components/elements/products/ProductSimple';
import ProductWide from '/components/elements/products/ProductWide';
import {  List, Skeleton} from 'antd';
import useGetProducts from '/hooks/useGetProducts';
import SkeletonProduct from '/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '/utils/common-helpers';


const ShopProducts = ({total,shopItems,loading}) => {
    const {isLogged} = useLogin()
    const [listView, setListView] = useState(true);

    function handleChangeViewMode(e) {
        e.preventDefault();
        setListView(!listView);
    }

    const order = (e) => {
        let newSortedList = [...shopItems].sort((a, b) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
        if(e == 0 ) {
            setShopItems(newSortedList)
        }else if (e == 1 ) {
            newSortedList = [...shopItems].sort((b,a) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
            setShopItems(newSortedList)
        }

        let orderAlfavetico = [...shopItems].sort((a,b) => a.nombreWeb.localeCompare(b.nombreWeb))
        if(e == 2){
            setShopItems(orderAlfavetico)
        }else if (e == 3) {
            orderAlfavetico = [...shopItems].sort((b,a) => a.nombreWeb.localeCompare(b.nombreWeb))
            setShopItems(orderAlfavetico)
        }
    }

    let productos;
        if (!loading) {
            if (listView) {
                productos = <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={shopItems}
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
                productos = (<List
                    dataSource={shopItems}
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
        }else{
            const skeletons = generateTempArray(12).map((item) => (
                <div className="col-xl-4 col-lg-3 col-sm-3 col-6" key={item}>
                    <SkeletonProduct />
                </div>
            ));
            productos = <div className="row">{skeletons}</div>;
        }

    return (
        <div className="ps-shopping">
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
            {productos}
        </div>
    );
}

export default ShopProducts