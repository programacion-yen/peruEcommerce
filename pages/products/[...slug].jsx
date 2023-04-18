import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import useLogin from '/hooks/useLogin';
import useGlobal from '/hooks/useGlobal';
import useProducts from '/hooks/useProducts';
import { Alert, Collapse, Input } from 'antd'
import ShopItems from '/components/partials/shop/ShopItems';
import BreadCrumb from '/components/elements/BreadCrumb';
// import ShopSidebarBanner from '/components/partials/shop/ShopSidebarBanner';
import WidgetShopSubCategories from '/components/shared/widgets/WidgetShopSubCategories';
// import WidgetShopCategories from '/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '/components/shared/widgets/WidgetShopBrands';
import WidgetMedidas from '/components/shared/widgets/WidgetMedidas';
import WidgetUse from '/components/shared/widgets/WidgetUse';
import WidgetColor from '/components/shared/widgets/WidgetColor';
import WidgetPeso from '/components/shared/widgets/WidgetPeso';
import WidgetModelo from '/components/shared/widgets/WidgetModelo';
import WidgetProcedenciaOrigen from '/components/shared/widgets/WidgetProcedenciaOrigen';
import allServices from '/services/allServices'
import { getSliderBannerMSitios } from '/pages/api/MiniSitios'
import { ComponentesFila } from '../../components/EstructuraWeb/Home/Componentes/ComponentesFila';
import { useContext } from 'react';
import Context from '../../context/UserContext';

export default function Categoriproducts() {
    const router = useRouter();
    const {hiddenHook,categorias,nameCategory,limpiar} = useProducts()
    const { Panel } = Collapse;
    const { slug } = router.query;
    const {isActive, activehook, maxhook, minhook, min, max,keywordhook} = useGlobal();
    const { idminisitio } = useContext(Context)
    const {isLogged} = useLogin()
    // const [filterCategories,setFilterCategories] = useState()
    const [filterSubCategories,setFilterSubCategories] = useState()
    const [filterBrands,setFilterBrands] = useState()
    const [filterFicha,setFilterFicha] = useState()
    // const [idCategory , setIdCategory] = useState()
    const [nombreCategoria , setNombreCategoria] = useState()
    const [idgrupo, setIdGrupo] = useState()
    const [routes , setRoutes] = useState()
    const [graficas, setGraficas] = useState(null)
    const [valorMin, setValorMin] = useState(0)
    const [valorMax, setValorMax] = useState(10000000)
    const [error, setError] = useState('');

    let allRoute;
    let idcategoria;

    function notPressEnter(e){
        if (e.which == '13') {
            e.preventDefault();
        }
    }

    const submitPrice = (e) => {
        e.preventDefault();

        if( Number(valorMin) > Number(valorMax)) {
            setError('El valor mínimo no puede ser mayor al máximo')
            return
        }
        
        minhook(Number(valorMin || 0));
        maxhook(Number(valorMax || 10000000));
        setError('');
    }

    const getSliderBannerCatalogo = async (groupName, category, subcategoria) => {
        
        // Caso buscador y marca
        // if( slug[0] === 'buscar' || !slug[4] ) {
        if( slug[0] === 'buscar' ) {

            const items = {
                Ubicacion: 80,
                TextoFiltro: slug[1]
            }  

            const resp = await getSliderBannerMSitios(items)

            if(resp){
                if(resp[0].salida){
                    setGraficas(resp[0].salida.paginas[0].secciones[0].filas)
                }
            } else {
                setGraficas(null);
            }
            return
        }

        // Caso grupo/categoría
        if( groupName && category ){
            let groupId
            if(groupName == 'bicicleta') groupId = 732
            else if(groupName == 'fitness') groupId = 725
            else if(groupName == 'accesorios') groupId = 604
            else if(groupName == 'componentes') groupId = 691
            else if(groupName == 'spirit') groupId = 742
            else if(groupName == 'shimano') groupId = 647

            const items = {
                Ubicacion: 5,
                Grupo: groupId,
                Categoria: category
            } 

            if( subcategoria ) items = {...items, subCategorias: subcategoria }

            const resp = await getSliderBannerMSitios(items)
            if(resp){
                if(resp[0].salida){
                    setGraficas(resp[0].salida.paginas[0].secciones[0].filas)
                }
            } else {
                setGraficas(null);
            }
        }
    }

    const getFilter = async (grupo,category,allRoute,subcategoria) =>{
        let numero = parseInt(grupo) ? parseInt(grupo) : null
        // setIdCategory(category)
        setNombreCategoria(grupo)
        setIdGrupo(numero)
        setRoutes(allRoute)
        idcategoria = category !== undefined ? category : categorias
        
        let items;

        if(slug[0] === 'buscar') {

            // Caso buscador
            items = {
                TipoConsulta: 10,
                // IDSitio: 1,
                IDSitio: idminisitio,
                Categorias: idcategoria,
                FiltroTexto: slug[1]
            }    

        } 
        // else if( !slug[3] ) {

        //     // Caso marcas
        //     items = {
        //         TipoConsulta: 7,
        //         IDSitio: idminisitio,
        //         Filtro: slug[2],
        //     } 

        // } 
        else if ( subcategoria ) {

            // Caso subcategoria
            items = {
                TipoConsulta: 5,
                IDSitio: idminisitio,
                Categorias: idcategoria,
                subCategorias: subcategoria
            }

        } else {

            // Caso categoria
            items = {
                TipoConsulta: 4,
                IDSitio: idminisitio,
                Categorias: idcategoria
            }

        }

        let product = await allServices.getFiltros(items)


        if (product) {
            setFilterSubCategories(product.filtroCategorias)
            setFilterBrands(product.filtroMarcas)
            setFilterFicha(product.filtroFichas)
        }
    }

    useEffect(() => {
        setGraficas(null);
        hiddenHook(true)
        maxhook(10000000);
        minhook(0);
        setValorMin(0)
        setValorMax(10000000)
        if(isActive){
            activehook(false)
            keywordhook('')
        }
        if (slug) {
            if(!slug) return;
            let parametros  = slug ?? []
            allRoute = parametros[3] !== undefined ? parametros[1]+' / '+parametros[2]
                : !isNaN(parametros[1]) ? 'Buscar' : parametros[1]
            getFilter(parametros[2],parametros[3],allRoute, parametros[4])
            getSliderBannerCatalogo(parametros[1], parametros[3], parametros[4])
        }
    }, [slug,categorias])

    useEffect(() => {
        limpiar()
    },[slug])

    const breadCrumb = [
        {
            text: 'Inicio',
			url: '/',
        },
        {
            text: routes,
        },
    ];

    return (
        <>
            <BreadCrumb breadcrumb={breadCrumb} />
            <div className="ps-page--shop" id="shop-sidebar">
                <div className="container">
                    {
                        // Renderizado Slider categoria
                        graficas &&
                        graficas.map((item, index) => (
                            <div className='mt-4' key={index}>
                                <ComponentesFila fila={item} />
                            </div>
                        ))
                    }
                    <div className="ps-layout--shop">
                        {
                            filterSubCategories || filterBrands || filterFicha
                                ?
                                    <>
                                        <div className="ps-layout__left">
                                            <Collapse 
                                                defaultActiveKey={['1'] ? ['1'] : ['2']}
                                                expandIconPosition={'end'}
                                                bordered={false}
                                            >
                                                
                                                {
                                                    filterSubCategories && (slug[0] !== 'buscar') &&
                                                        <Panel style={{ textTransform: 'capitalize' }}
                                                            header={
                                                                idgrupo == null 
                                                                ? nombreCategoria || "Accesorio" 
                                                                : nameCategory || "Accesorio"
                                                            } key="3">
                                                            <WidgetShopSubCategories items={filterSubCategories} />
                                                        </Panel>
                                                }
                                                
                                                {
                                                    idgrupo <= 3 && filterBrands &&
                                                    <Panel header="Marcas" key="2">
                                                        <WidgetShopBrands items={filterBrands} />
                                                    </Panel>
                                                }

                                                {
                                                    // Filtros por categoria, segun respuesta API getFiltros
                                                    // idCategory != null && filterFicha != null && 
                                                    filterFicha &&
                                                        filterFicha.map( filter => {
                                                            // if( filter.nombreficha == 'marca') return;
                                                            return (
                                                                <Panel 
                                                                    header={filter.nombreficha} 
                                                                    key={filter.nombreficha} 
                                                                    style={{ textTransform: 'capitalize' }}
                                                                >
                                                                    {
                                                                        filter.idficha == '3' && <WidgetUse items={filterFicha} />
                                                                    }
                                                                    {
                                                                        filter.idficha == '4' && <WidgetModelo items={filterFicha} />
                                                                    }
                                                                    {
                                                                        filter.idficha == '6' && <WidgetMedidas items={filterFicha} />
                                                                    }
                                                                    {
                                                                        filter.idficha == '7' && <WidgetColor items={filterFicha} />
                                                                    }
                                                                    {
                                                                        filter.idficha == '8' && <WidgetPeso items={filterFicha} />
                                                                    }
                                                                    {
                                                                        filter.idficha == '10' && <WidgetProcedenciaOrigen items={filterFicha} />
                                                                    }
                                                                </Panel>
                                                            )
                                                        })
                                                }
                                                {
                                                    // Filtro precio si esta logeado
                                                    isLogged && (filterSubCategories || filterBrands) &&
                                                        <Panel header="Por Precios" key="10">
                                                            <aside style={{ maxWidth: 'fit-content' }}>
                                                                <form onSubmit={(e) => submitPrice(e)}>
                                                                    <div className="row">
                                                                        <div className="col-6 col-sm-12 col-lg-6" style={{ marginBottom: '10px' }}>
                                                                            <label htmlFor="min">Desde </label>
                                                                            <Input 
                                                                                prefix={'$'}
                                                                                value={valorMin}
                                                                                onChange={(e) => setValorMin(Number(e.target.value))}
                                                                                onKeyPress={(e) => notPressEnter(e)}
                                                                                className="form-control rounded"
                                                                                style={{background : 'white',height : '30px'}}
                                                                            />
                                                                        </div>
                                                                        <div className="col-6 col-sm-12 col-lg-6" style={{ marginBottom: '10px' }}>
                                                                            <label htmlFor="max">Hasta </label>
                                                                            <Input 
                                                                                prefix={'$'}
                                                                                value={valorMax}
                                                                                onChange={(e) => setValorMax(Number(e.target.value))}
                                                                                onKeyPress={(e) => notPressEnter(e)}
                                                                                className="form-control rounded"
                                                                                style={{background : 'white',height : '30px'}}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        error && 
                                                                            <div style={{ marginTop: '15px' }}>
                                                                                <Alert message={error} type="error" showIcon />
                                                                            </div>  
                                                                    }
                                                                    <div className="pt-4 text-center">
                                                                        <button className="ps-btn-yellow">Filtrar</button>
                                                                    </div>
                                                                </form>
                                                            </aside>
                                                        </Panel>
                                                }
                                            </Collapse>
                                        </div>
                                        <div className="ps-layout__right">
                                            {/* <ShopItems columns={4} priceLow={min} priceHigh={max} category={idCategory}/> */}
                                            <ShopItems priceLow={min} priceHigh={max} />
                                        </div>
                                    </>
                                :
                                    <ShopItems priceLow={min} priceHigh={max} />
                        }
                        
                    </div>
                </div>
            </div>
        </>
    )
}
