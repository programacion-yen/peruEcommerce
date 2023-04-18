import { useState } from 'react';
import allServices from '/services/allServices'
import useProducts from '/hooks/useProducts';

export default function useGetProducts() {
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [categories, setCategory] = useState(null)
    const [brandProduct, setBrandProduct] = useState(null)
    const [shopItems , setShopItems] = useState()
    const [total, setTotal] = useState(0);
    const [brandsFooter, setBrandFooter] = useState()
    let datos;

    return {
        loading,
        productItems,
        categories,
        total,
        brandProduct,
        shopItems,
        setShopItems,
        brandsFooter,
        setProductItems: (payload) => {
            setProductItems(payload);
        },

        getProducto: async (params) =>{
            setLoading(true)
            let product = await allServices.getProducts(params)
            setShopItems(product)
            if (product) {
                setTotal(product.length);
                setLoading(false)
            }
        },

        setLoading: (payload) => {
            setLoading(payload);
        },

        getBrandProductDetails: async (payload) => {
            setLoading(true);
            let responseData;
            if (payload) {
                responseData = await allServices.getBrandproductDetail(payload);
            } else {
                const top = 2;
                responseData = await allServices.getBrandproductDetail(top);
            }
            if (responseData) {
                setBrandProduct(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getBrandProductsUser: async (payload) => {
            setLoading(true);
            let responseData;
            if (payload) {
                responseData = await allServices.getBrandproductUser(payload);
            } else {
                const top = 2;
                responseData = await allServices.getBrandproductUser(top);
            }
            if (responseData) {
                setBrandProduct(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductPrice: async (params,paramsPrice) =>{
            setLoading(true)
            let productUserPrice = await allServices.getProductsByPriceRange(params,paramsPrice)
            setShopItems(productUserPrice)
            if (productUserPrice) {
                setTotal(productUserPrice.length);
                setLoading(false)
            }
        },

        getbrandsFooter: async () => {
            setLoading(true)
            let footerbrands = await allServices.getMarcasFooters()
            if (footerbrands) {
                setBrandFooter(footerbrands)
            }
        },

    }
}
