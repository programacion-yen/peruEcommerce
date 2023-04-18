import React,{useState} from 'react'
import useProducts from '/hooks/useProducts';
import Select from 'react-select';

const WidgetModelo = ({items}) => {
    const {modeloHook,selectInputRef} = useProducts()
    let modelos = []
    let finalresult = []
    const [selectedOption, setSelectedOption] = useState(null);
    if (items && items.length > 0) {
        items.map(item => {
            if (item.idficha == 4) {
                item.valoresficha.map(dato => {
                    let object = {value: dato.valor, label: dato.valor,item:item.idficha};
                    modelos.push(object)
                })
            }
        })
        finalresult = modelos
    }

    const onChange = (value) => {
      let allmodelo = {};
      if (value && value.length > 0) {
        let id = parseInt(value[0].item)
        let valores = '';
        let valoresmodificado =''
        value.forEach(element => {
          valores += `${element.value},`
          valoresmodificado = valores.substring(0, valores.length - 1)
        });
        allmodelo =
          {
            "IDFicha": id,
            "valores":valoresmodificado.split(',')
          }
        setSelectedOption(value)
        modeloHook(allmodelo)
      }else{
        modeloHook(null)
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

export default WidgetModelo