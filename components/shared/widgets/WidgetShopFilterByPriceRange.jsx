import React, { useState } from 'react';
import { Slider, Checkbox } from 'antd';
import { useRouter } from 'next/router';

const WidgetShopFilterByPriceRange = () => {
    const Router = useRouter();
    const { query } = Router;
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(500000);

    function handleChangeRange(value) {

        setMin(value[0]);
        price_lt: value[1], setMax(value[1]);

        let priceLow = value[0]
        let priceHigth = value[1]

        if (query) {
            if(!query.categoriproducts) return;
            let bodyProduct  = query.categoriproducts ?? []
            let keyword, category, rest;
            [keyword, category, rest] = bodyProduct;

            if(category == undefined){
                Router.push(`/products/${keyword}?priceLow=${priceLow}&priceHigth=${priceHigth}`);
            }else{
                Router.push(`/products/${keyword}/${category}/${rest}?priceLow=${priceLow}&priceHigth=${priceHigth}`);
            }
        }
        //Router.push(`/products/${group}/${category}/${rest}?price_gt=${value[0]}&price_lt=${value[1]}`);
        //this.props.dispatch(getProductsByPrice(params));
    }

    return (
        <aside className="widget widget_shop">
            <figure>
                <h4 className="widget-title">Por Precio</h4>
                <Slider
                    range
                    defaultValue={[0, 500000]}
                    max={500000}
                    onChange={(e) => handleChangeRange(e)}
                />
                <p>
                    Precio: ${min} - $ {max}
                </p>
            </figure>
        </aside>
    );
};

export default WidgetShopFilterByPriceRange;
