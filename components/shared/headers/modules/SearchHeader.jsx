import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Spin } from 'antd';
import ProductSearchResult from '/components/elements/products/ProductSearchResult';
import allServices from '/services/allServices'
import useLogin from '/hooks/useLogin';
import useGlobal from '/hooks/useGlobal';
import useProducts from '/hooks/useProducts';

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

const SearchHeader = () => {
    const inputEl = useRef(null);
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const {isActive, activehook,keywordhook,keyword} = useGlobal();
    const debouncedSearchTerm = useDebounce(keyword, 100);
    const {limpiar} = useProducts()

    function handleClearKeyword() {
        keywordhook('');
        activehook(false)
        setLoading(false);
        limpiar()
    }

    function handleSubmit(e) {
        e.preventDefault();

        const keywordLowerCase = keyword.toLowerCase()

        switch (keywordLowerCase) {
            case 'scott':
                keywordhook('')
                Router.push('/miniSitios/Scott/12/');
                break;
        
            default:
                Router.push(`/products/buscar/${keyword}`);
                break;
        }
        
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            // console.log('Termino', debouncedSearchTerm);
            // console.log('KeyWord', keyword);
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
        e.preventDefault();
        //keywordhook('');
        limpiar()
    }
    // Views
    let productItemsView,
        clearTextView,
        selectOptionView,
        loadingView,
        loadMoreView;
    if (!loading) {
        if (resultItems) {
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

    return (
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
                    // onInput={(e) => RedirectMinisitio(e)}
                    // onKeyDown = {(e) => onEnter(e)}
                />
                {clearTextView}
                {loadingView}
            </div>
                {keyword != '' ?
                <button>
                    <Link href={`/products/buscar/${keyword}`}>
                        <i className="fa fa-search"></i>
                    </Link>
                </button> :
                <button onClick={(e) => LimpiarTexto(e)}>
                    <i className="fa fa-search"></i>
                </button>}
         
            {
                keyword.length >= 3 && productItemsView &&
                    <div className={`ps-panel--search-result${isActive ? ' active ' : ''}`}>

                        <div className="ps-panel__content" onClick={(e) => LimpiarTexto(e)}>
                            {productItemsView}
                        </div>
                        {loadMoreView}

                    </div>
            }
        </form>
    );
};

export default SearchHeader;
