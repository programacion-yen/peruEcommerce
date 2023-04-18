import React,{useEffect,useState} from 'react'
import useProducts from '/hooks/useProducts';
import Select from 'react-select';
import { FormatoPalabras } from '/utils/utilidades';


const WidgetShopCategories = ({items,grupo}) => {
  const {categoriasHook,selectInputRef} = useProducts()
  let result = [];
  let finalresult = [];
  let group;
  let categorias = [];
  const [selectedOption, setSelectedOption] = useState(null);

  if (items && items.length > 0 ) {
    categorias = items.filter(element => element.idGrupo == grupo)
    categorias.map((item,key) =>{
        group = item.categoria.map((data,key) => {return data})
        group.map(dato => {
            let object =  {value: dato.idCategoria, label: FormatoPalabras(dato.nombre)};
            result.push(object)
        })
    })
    if (categorias.length == 0) {
      items.map((item,key) =>{
          group = item.categoria.map((data,key) => {return data})
          group.map(dato => {
              let object =  {value: dato.idCategoria, label: FormatoPalabras(dato.nombre)};
              result.push(object)
          })
      })
    }
    finalresult = result
  }

  function onChange(value) {
    if (value && value.value) {
      setSelectedOption(value.value)
      categoriasHook(value.value,value.label)
    }else{
      categoriasHook(null)
    }
  }

  return (
    <aside>
      <Select
        ref={selectInputRef}
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

export default WidgetShopCategories;
