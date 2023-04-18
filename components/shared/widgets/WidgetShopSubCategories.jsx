import React,{useEffect,useState} from 'react'
import useProducts from '/hooks/useProducts';
import Select from 'react-select';
import { FormatoPalabras } from '/utils/utilidades';

const sortByLabel = (a, b) => {

  if ( a.label < b.label ){
      return -1;
  }
  if ( a.label > b.label ){
      return 1;
  }
  return 0;
    
}

const WidgetShopSubCategories = ({items}) => {
  const {subCategoryHook,selectInputRef} = useProducts()
  let subResult = [];
  let finalresult = [];
  const [selectedOption, setSelectedOption] = useState(null);

  if (items && items.length > 0 ) {
      items.map(item => {
        item.accesorio.map(dato => {
          // let object =  {value: dato.idaccesorio, label: FormatoPalabras(dato.nombreaccesorio), rating: dato.cantidad};
          let object =  {value: dato.idaccesorio, label: dato.nombreaccesorio, rating: dato.cantidad};
          subResult.push(object)
        })
      })
      subResult.sort( sortByLabel );
      finalresult = subResult
  }

  function onChange(value) {
    let categories = [];
    if (value && value.length > 0) {
      value.map(item => {
        categories.push(item.value)
      })
      let subCategoryModified = JSON.stringify(categories)
      let subcategories = subCategoryModified.replace(/['"]+/g, '')
      let subCategory = subcategories.substring(1, subcategories.length - 1)
      setSelectedOption(value)
      subCategoryHook(subCategory)
    }else{
      subCategoryHook(null)
    }
  }

  return (
    <aside>
      <Select
        ref={selectInputRef}
        isMulti
        defaultValue={selectedOption}
        onChange={onChange}
        options={finalresult}
        placeholder="Seleccionar"
        isSearchable
        isClearable
      />
    </aside>
  )
}

export default WidgetShopSubCategories;
