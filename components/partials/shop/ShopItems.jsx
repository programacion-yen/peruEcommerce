import { useContext, useEffect, useState } from 'react';
import { List, Alert } from 'antd';
import { useRouter } from 'next/router';
import useLogin from '/hooks/useLogin';
import useProducts from '/hooks/useProducts';
import ProductSimple from '/components/elements/products/ProductSimple';
import ProductWide from '/components/elements/products/ProductWide';
import allServices from '/services/allServices'
import SkeletonProduct from '/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '/utils/common-helpers';
// import useGlobal from '/hooks/useGlobal';
import Select from 'react-select';
import Context from '../../../context/UserContext';

const ShopItems = ({ priceHigh, priceLow }) => {

    let topPage = 1000;
    let params;
    
    const Router = useRouter();
    const { query } = Router;

    const {isLogged} = useLogin()
    const { idminisitio } = useContext(Context)

    const [loading, setLoading] = useState(false)
    
    // Catalogo completo
    const [products, setProducts] = useState([]);

    // Productos a renderizar
    const [shopItems, setShopItems] = useState([]);

    const [total,setTotal] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null);
    const {brand,subCategory,size,usos,categorias,modelo,peso,
            color,procedencia,selectInputRef,option,options,buscadorHook} = useProducts()
    let brands = brand != '' ? brand : null

    const [listView, setListView] = useState(true);

    function handleChangeViewMode(e) {
        e.preventDefault();
        setListView(!listView);
    }

    const getProducto = async (params) =>{
        setLoading(true)
        let product = await allServices.getProducts(params)

        if (product) {
            setProducts(product)
            setShopItems(product)
            setTotal(product.length)
            setLoading(false)
        }
    }

    const filtroPrecio = (product) => {

        let productsFiltered

        if( priceLow > 0 || priceHigh < 10000000 ) {
            productsFiltered = product.filter( producto => producto.precio >= priceLow && producto.precio <= priceHigh)
        }

        return productsFiltered || product
    }

    const order = (e, productosaOrdenar = [...shopItems]) => {
        setSelectedOption(e)
        try {
            let newSortedList = [...productosaOrdenar].sort((a, b) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
            if(e && e.value == 0 ) {
                setShopItems(newSortedList)
            }else if (e && e.value == 1 ) {
                newSortedList = [...productosaOrdenar].sort((b,a) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0))
                setShopItems(newSortedList)
            }

            let orderAlfavetico = [...productosaOrdenar].sort((a,b) => a.nombreWeb.localeCompare(b.nombreWeb))
            if(e && e.value == 2){
                setShopItems(orderAlfavetico)
            }else if (e && e.value == 3) {
                orderAlfavetico = [...productosaOrdenar].sort((b,a) => a.nombreWeb.localeCompare(b.nombreWeb))
                setShopItems(orderAlfavetico)
            }
        } catch(error) {
            console.log('error', error);
        }

    }

    // useEffect(() => {
        
        // const filtered = filtroPrecio(products)
        // setShopItems(filtered)
        // setTotal(filtered.length)

    // }, [priceHigh, priceLow])

    // const getProductPrice = async (params,paramsPrice) =>{
    //     setLoading(true)
    //     let productUserPrice = await allServices.getProductsByPriceRange(params,paramsPrice)
    //     setShopItems(productUserPrice)
    //     if (productUserPrice) {
    //         setTotal(productUserPrice.length);
    //         setLoading(false)
    //     }
    // }

    // function getApisProduct(params,paramsPrice) {
    //     if (priceLow > 0) {
    //         getProductPrice(params,paramsPrice);
    //     }else if(priceHigh < 10000000){
    //         getProductPrice(params,paramsPrice);
    //     }
    // }

    const querys  = () => {
        if (query) {
            if(!query.slug) return;
            let parametros  = query.slug ?? []
            let grupos = parametros[2] == 2 ? 11 : parametros[2] == 1 ? 22 : parametros[2] == 3 ? 33 : null
            let tipo = 4
            let numero = [1, 2, 3].includes(parametros[2]) ? null : parseInt(parametros[2])

            // Si catalogo marcas y categoría
            if( parametros[3] === undefined && categorias !== null ) {
                tipo = 17
                return tipo
            }

            if(size != null || usos != null || color != null ||
                modelo != null || procedencia != null || peso != null ){
                tipo = 17
                return tipo
            }

            if (numero > 3 && categorias != null && subCategory !== null) {
                return tipo = 5
            }

            if (numero > 3 && categorias != null) {
                return tipo
            }

            if( brands !== null && parametros[3] != undefined) {
                return tipo = 17
            }

            if(brands != null || numero > 3){
                tipo = 7
                return tipo
            }

            if(subCategory !== null || parametros[4] != undefined) {
                tipo = 5
                return tipo
            }

            if(parametros[3] != undefined || categorias != null){
                return tipo
            }

            if (parametros[0] === 'buscar') {
                tipo = 10
                
                return tipo
            }

            if(grupos != null){
                tipo = grupos
                return tipo
            }
        }
    }

    useEffect(() => {
        if (query) {
            if(!query.slug) return;
            let parametros  = query.slug ?? []
            // let numero = [1, 2, 3].includes(parametros[2]) ? null : parseInt(parametros[2])

            // let filtros = []
            // filtros.push(usos, size, color, modelo, procedencia, peso)
            // const results = filtros.filter(element => {
            //     return (element != null);
            // });

            params = {
                categorias: parametros[3] != undefined ? parametros[3] : (categorias != null && categorias),
                subCategorias:subCategory != null ? subCategory : parametros[4] != null ? parametros[4] : null,
                // marca:  brands !== null ? brands : numero > 3 ? numero : null,
                marca: !parametros[3] ? parametros[2] : null,
                TipoConsulta:querys(),
                // IDSitio:1,
                IDSitio: idminisitio,
                FiltroTexto: parametros[0] == 'buscar' ? parametros[1] : null,
            };

            // if( results.length > 0 ) {
            //     params = {
            //         ...params,
            //         FichaFiltro: JSON.stringify(results)
            //     }
            // }

        } else {
            params = {
                top: topPage,
            };
        }

        getProducto(params);

    }, [query]);
    // }, [query,subCategory,brands,categorias]);
    // }, [query,subCategory,brands,usos,size,categorias,modelo,color,procedencia,peso]);
    // }, [query,priceLow,priceHigh,subCategory,brands,usos,size,categorias,modelo,color,procedencia,peso]);

    // Filtro lateral, categoría no se debe tomar en cuenta
    useEffect(() => {

        if ( subCategory || brands || usos || size || categorias || modelo || color || procedencia || peso ) {
            
            let filtroSubCategoria = []
            if(subCategory) {
                if(subCategory.includes(',')) {
                    filtroSubCategoria = subCategory.split(',')
                } else {
                    filtroSubCategoria = [subCategory]
                }
            }

            let filtroMarca = []
            if(brands) {
                if(brands.includes(',')) {
                    filtroMarca = brands.split(',')
                } else {
                    filtroMarca = [brands]
                }
            }

            const filtered = products.map(producto => {

                // Si hay un filtro marca seleccionado pero no cumple, retorna null
                if( filtroMarca.length > 0 && !filtroMarca.includes(String(producto.idMarca)) ) {
                    return
                }

                // Si hay un filtro uso seleccionado y no cumple, retorna null
                if( usos && !usos.valores.includes(producto.fichaTecnica?.uso) ) {
                    return
                }

                // Si hay un filtro modelo seleccionado y no cumple, retorna null
                if( modelo && !modelo.valores.includes(producto.fichaTecnica?.modelo) ) {
                    return
                }

                // Si hay un filtro size seleccionado y no cumple, retorna null
                if( size && !size.valores.includes(producto.fichaTecnica?.talla_medida) ) {
                    return
                }

                // Si hay un filtro material/color seleccionado y no cumple, retorna null
                if( color && !color.valores.includes(producto.fichaTecnica?.material_color) ) {
                    return
                }
                
                // Si hay un filtro material/color seleccionado y no cumple, retorna null
                if( peso && !peso.valores.includes(producto.fichaTecnica?.peso) ) {
                    return
                }

                // Si hay un filtro peso seleccionado y no cumple, retorna null
                if( peso && !peso.valores.includes(producto.fichaTecnica?.peso) ) {
                    return
                }

                // Si hay un filtro procedencia seleccionado y no cumple, retorna null
                if( procedencia && !procedencia.valores.includes(producto.fichaTecnica?.procedencia_origen) ) {
                    return
                }

                // Filtro subCategoria, al final porque es el mas pesado
                if(filtroSubCategoria.length > 0) {

                    // Si el producto no tiene categorizacion, se retorna null
                    if( producto.categorizacion ) {
                        
                        // Retorna true si la subcategoria se encuentra en el producto
                        const result = producto.categorizacion.map(categorizacion => {
                            return filtroSubCategoria.includes(String(categorizacion.idaccesorio))
                        })

                        // Si el producto no tiene la subcategoria retorna null
                        if(!result.includes(true)) return 

                    } else {
                        return
                    }
                    
                }

                // Significa que cumple todos los filtros, retorna el producto
                return producto
                
            })
            
            const filteredProducts = filtered.filter(producto => producto)

            // Si hay filtro de precio
            if( priceLow > 0 || priceHigh < 10000000 ) {
                const filteredPrice = filtroPrecio(filteredProducts)
                setShopItems(filteredPrice)
                setTotal(filteredPrice.length)

                // Ordenar
                if(selectedOption) {
                    order(selectedOption, filteredPrice)
                } else {
                    setShopItems(filteredPrice)
                }
                return
                
            } else {

                // Ordenar
                if(selectedOption) {
                    order(selectedOption, filteredProducts)
                } else {
                    setShopItems(filteredProducts)
                }

                setTotal(filteredProducts.length)
            }

        } else if ( shopItems.length <= products.length ) {

            // Si hay que filtrar por precio
            if( priceLow > 0 || priceHigh < 10000000 ) {
                const filteredPrice = filtroPrecio(products)
                setShopItems(filteredPrice)
                setTotal(filteredPrice.length)

                // Ordenar
                if(selectedOption) {
                    order(selectedOption, filteredPrice)
                } else {
                    setShopItems(filteredPrice)
                }
                return

            } else {

                // Ordenar
                if(selectedOption) {
                    order(selectedOption, products)
                } else {
                    setShopItems(products)
                }

                setTotal(products.length)
            }

        }

    }, [subCategory, brands, usos,size,categorias,modelo,color,procedencia,peso, priceHigh, priceLow])
    

    let productos;
        if (!loading) {
            if (listView) {
                productos = <List
                    grid={{ gutter: 16, xs: 2, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3, }}
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
                productos = (<List
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
                
                {
                    products.length > 0 &&
                        <div className="ps-shopping__actions">
                            <div style={{ width: '19rem' }}>
                                <Select
                                    ref={selectInputRef}
                                    instanceId="precio"
                                    placeholder="Seleccionar"
                                    // defaultValue={selectedOption}
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
                }
                
            </div>
            {productos}
        </div>
    )
};

export default ShopItems;
