import React,{useState} from 'react'
import useProducts from '/hooks/useProducts';
import Select from 'react-select';

const WidgetPeso = ({items}) => {
    const {pesoHook,selectInputRef} = useProducts()
    let pesos = []
    let finalresult = []
    const [selectedOption, setSelectedOption] = useState(null);
    if (items && items.length > 0) {
        items.map(item => {
            if (item.idficha == 8) {
                item.valoresficha.map(dato => {
                    let object = {value: dato.valor, label: dato.valor,item:item.idficha};
                    pesos.push(object)
                })
            }
        })
        finalresult = pesos
    }

    const onChange = (value) => {
      let allpeso = {};
      if (value && value.length > 0) {
        let id = parseInt(value[0].item)
        let valores = '';
        let valoresmodificado =''
        value.forEach(element => {
          valores += `${element.value},`
          valoresmodificado = valores.substring(0, valores.length - 1)
        });
        allpeso =
          {
            "IDFicha": id,
            "valores":valoresmodificado.split(',')
          }
        setSelectedOption(value)
        pesoHook(allpeso)
      }else{
        pesoHook(null)
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

export default WidgetPeso