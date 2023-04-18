import React,{useState} from 'react'
import useProducts from '/hooks/useProducts';
import Select from 'react-select';
import {Input,Tree,Checkbox} from 'antd'

const WidgetMedidas = ({items}) => {
    const { Search } = Input;
    const {sizesHook,selectInputRef} = useProducts()
    let medidas = []
    let finalresult = []
    const [selectedOption, setSelectedOption] = useState(null);

    if (items && items.length > 0) {
        items.map(item => {
            if (item.idficha == 6) {
                item.valoresficha.map(dato => {
                    let object = {value: dato.valor, label: dato.valor,item:item.idficha};
                    medidas.push(object)
                })
            }
        })
        finalresult = medidas
    }

    const onChange = (value) => {
      let allmedidas = {};
      if (value && value.length > 0) {
        let id = parseInt(value[0].item)
        let valores = '';
        let valoresmodificado =''
        value.forEach(element => {
          valores += `${element.value},`
          valoresmodificado = valores.substring(0, valores.length - 1)
        });
        allmedidas =
          {
            "IDFicha": id,
            "valores":valoresmodificado.split(',')
          }

        setSelectedOption(value)
        sizesHook(allmedidas)
      }else{
        sizesHook(null)
      }
    };


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
            isClearable />
    </aside>
  )
}

export default WidgetMedidas;