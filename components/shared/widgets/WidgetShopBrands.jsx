import React, { useEffect, useState } from 'react';
import useLogin from '/hooks/useLogin';
import useProducts from '/hooks/useProducts';
import Select from 'react-select';

const WidgetShopBrands = ({items}) => {
    const {brandHook,selectInputRef} = useProducts()
    let brandresult = []
    let finalresult = []
    const [selectedOption, setSelectedOption] = useState(null);

    function onChange(value) {
        let brands = [];
        if (value && value.length > 0) {
          value.map(item => {
            brands.push(item.value)
          })
          let brandModified = JSON.stringify(brands)
          let brandAll = brandModified.replace(/['"]+/g, '')
          let subCategory = brandAll.substring(1, brandAll.length - 1)
          setSelectedOption(value)
          brandHook(subCategory)
        }else{
          brandHook(null)
        }
    }

    if (items && items.length > 0) {
        items.map(item => {
            let object = {value: item.idmarca, label: item.nombreamarca};
            brandresult.push(object)
        })
        finalresult = brandresult
    }

    return (
        <aside>
            <Select
                ref={selectInputRef}
                isMulti
                instanceId="marca"
                placeholder="Seleccionar"
                defaultValue={selectedOption}
                onChange={onChange}
                options={finalresult}
                isSearchable
                isClearable
                isDisabled={finalresult === []} />
        </aside>
    );
};

export default WidgetShopBrands;
