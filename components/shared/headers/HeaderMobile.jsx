import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Drawer, Menu, Spin } from 'antd';
import ProductSearchResult from '/components/elements/products/ProductSearchResult';
import allServices from '/services/allServices'
import MobileHeaderActions from '/components/shared/headers/modules/MobileHeaderActions';
import useGlobal from '/hooks/useGlobal';
import useProducts from '/hooks/useProducts';
import { FormatoPalabras } from '../../../utils/utilidades';


function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// const HeaderMobile = () => {
const HeaderMobile = ({grupos, item}) => {
    const inputEl = useRef(null);
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const {isActive, activehook,keywordhook,keyword} = useGlobal();
    const debouncedSearchTerm = useDebounce(keyword, 100);
    const {limpiar} = useProducts()

    const [sideMenuOpen, setSideMenuOpen] = useState(false);

    const onOpenSideMenu = () => {
        setSideMenuOpen(true);
    };

    const onCloseSideMenu = () => {
        setSideMenuOpen(false);
    };

    function handleClearKeyword() {
        keywordhook('');
        activehook(false)
        setLoading(false);
        limpiar()
    }

    function handleSubmit(e) {
        e.preventDefault();
        Router.push(`/products/buscar/${keyword}`);
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword) {
                const products = allServices.getSearchProduct(keyword)
                products.then((result) => {
                    setLoading(false);
                    setResultItems(result);
                    activehook(true)
                });
            } else {
                activehook(false)
                keywordhook('');
            }
            if (loading) {
                activehook(false)
            }
        } else {
            setLoading(false);
            activehook(false)
        }
    }, [debouncedSearchTerm]);


    function LimpiarTexto(e){
        // e.preventDefault();
        //keywordhook('');
        limpiar()
    }
    let productItemsView,
        clearTextView,
        selectOptionView,
        loadingView,
        loadMoreView;
    if (!loading) {
        if (resultItems && resultItems) {
            productItemsView = <ProductSearchResult product={resultItems} keyword={keyword}/>
        }
        
        if (keyword != '') {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }


    let menuItems;
    // Renderizado categorias
    if(grupos){
        menuItems = grupos.map( item => ({
            label: FormatoPalabras(item.grupo),
            key: item.grupo,
            children: item.categorias.map( categoria => {

                if(!categoria.subCategorias) {
                    return ({
                        label: 
                            <Link href={`/products/catalogo/${item.grupo.toLowerCase()}/${categoria.categoria.toLowerCase()}/${categoria.idCategoria}`}>
                                <div onClick={onCloseSideMenu}>
                                    <a key={categoria.idCategoria}>{FormatoPalabras(categoria.categoria)}</a>
                                </div>
                            </Link>,
                        key: categoria.idCategoria,
                    })
                } else {
                    return ({
                        label: FormatoPalabras(categoria.categoria),
                        key: categoria.idCategoria,
                        children: categoria.subCategorias.map( subcategoria => ({
                            label: 
                                <Link href={`/products/catalogo/${item.grupo.toLowerCase()}/${categoria.categoria.toLowerCase()}/${categoria.idCategoria}/${subcategoria.idSubCategoria}`}>
                                    <div onClick={onCloseSideMenu}>
                                        <a key={subcategoria.idSubCategoria}>{FormatoPalabras(subcategoria.subCategoria)}</a>
                                    </div>
                                </Link>,
                            key: subcategoria.idSubCategoria
                        }))
                    })
                }

            })
        }))
    }

    // Blog
    menuItems = [
        ...menuItems,
        {
            label: 
            <Link href={'/blog'}>
                <div onClick={onCloseSideMenu}>
                    <a>Blog</a>
                </div>
            </Link>,
            key: 'blog'
        }
    ]

    // Fin Items Menu Drawer
    
    return (
        <>
            <header className="header header--mobile">
                <div className="navigation--mobile">
                    <div className="navigation__left">
                        
                        {/* Boton Menu SM */}
                        <div className='botonMenuResponsivesm' onClick={onOpenSideMenu}>
                            <i className="icon-menu" style={{ fontSize: '30px', color: '#fee01e' }}></i>
                        </div>

                        <Link href="/">
                            <a style={{ padding: '0 5%'}}>
                                <img src="/logo/bestbike-logo.png" height='42px' />
                            </a>
                        </Link>
                    </div>
                    <div className="ps-search--mobile">
                    <form
                        className="ps-form--quick-search"
                        method="get"
                        action="/"
                        onSubmit={handleSubmit}>
                        <div className="ps-form__input">
                            <input
                                ref={inputEl}
                                className="form-control rounded-1"
                                type="text"
                                value={keyword}
                                placeholder="Buscar"
                                onChange={(e) => keywordhook(e.target.value)}
                            />
                            {clearTextView}
                            {loadingView}
                        </div>
                            {
                                keyword != '' 
                                    ?
                                        <Link href={`/products/buscar/${keyword}`}>
                                            <button onClick={(e) => LimpiarTexto(e)}>
                                                <i className="fa fa-search" style={{ color: '#000' }}></i>
                                            </button>
                                        </Link> 
                                    :
                                        <button onClick={(e) => LimpiarTexto(e)}>
                                            <i className="fa fa-search" style={{ color: '#000' }}></i>
                                        </button>
                            }

                            {
                                keyword.length >= 3 
                                    ?
                                        <div className={`ps-panel--search-result${isActive ? ' active ' : ''}`}>
                                            <div className="ps-panel__content" onClick={(e) => LimpiarTexto(e)}>
                                                {productItemsView}
                                            </div>
                                            {loadMoreView}
                                        </div>
                                    : ''
                            }
                    </form>
                    </div>
                    <MobileHeaderActions />
                </div>

                <div style={{display: 'flex'}}>
                    {/* Boton Menu XS */}
                    <div className='botonMenuResponsivexs' onClick={onOpenSideMenu}>
                        <i className="icon-menu" style={{ fontSize: '30px', color: '#fee01e' }}></i>
                    </div>

                    {/* Buscador */}
                    <div className="ps-search--mobile-xs">
                        <form
                            className="ps-form--quick-search"
                            method="get"
                            action="/"
                            onSubmit={handleSubmit}>
                            <div className="ps-form__input">
                                <input
                                    ref={inputEl}
                                    className="form-control rounded-1"
                                    type="text"
                                    value={keyword}
                                    placeholder="Buscar"
                                    onChange={(e) => keywordhook(e.target.value)}
                                />
                                {clearTextView}
                                {loadingView}
                            </div>

                            {
                                keyword != '' 
                                    ?
                                        <Link href={`/products/buscar/${keyword}`}>
                                            <button onClick={(e) => LimpiarTexto(e)}>
                                                <i className="fa fa-search" style={{ color: '#000' }}></i>
                                            </button>
                                        </Link> 
                                    :
                                        <button onClick={(e) => LimpiarTexto(e)}>
                                            <i className="fa fa-search" style={{ color: '#000' }}></i>
                                        </button>
                            }

                            {
                                keyword.length >= 3  && productItemsView &&
                                    <div className={`ps-panel--search-result${isActive ? ' active ' : ''}`}>
                                        <div className="ps-panel__content" onClick={(e) => LimpiarTexto(e)}>
                                            {productItemsView}
                                        </div>
                                        {loadMoreView}
                                    </div>
                            }
                        </form>
                    </div>
                </div>
            </header>

            <Drawer
                title="Categorías"
                closable={true}
                placement='left'
                onClose={onCloseSideMenu}
                open={sideMenuOpen}
                size='default'
            >
                {
                    <Menu 
                        mode='inline'
                        items={menuItems} 
                    />
                }
            </Drawer>
        </>
    );
}

export default HeaderMobile;
