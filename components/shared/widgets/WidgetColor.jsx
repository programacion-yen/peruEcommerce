import React,{useState} from 'react'
import useProducts from '/hooks/useProducts';
import Select from 'react-select';

const WidgetColor = ({items}) => {
    const {colorHook,selectInputRef} = useProducts()
    let colores = []
    let finalresult = []
    const [selectedOption, setSelectedOption] = useState(null);
    if (items && items.length > 0) {
        items.map(item => {
            if (item.idficha == 7) {
                item.valoresficha.map(dato => {
                    let object = {value: dato.valor, label: dato.valor,item:item.idficha};
                    colores.push(object)
                })
            }
        })
        finalresult = colores
    }

    const onChange = (value) => {
      let allcolor = {};
      if (value && value.length > 0) {
        let id = parseInt(value[0].item)
        let valores = '';
        let valoresmodificado =''
        value.forEach(element => {
          valores += `${element.value},`
          valoresmodificado = valores.substring(0, valores.length - 1)
        });
        allcolor =
          {
            "IDFicha": id,
            "valores":valoresmodificado.split(',')
          }
        setSelectedOption(value)
        colorHook(allcolor)
      }else{
        colorHook(null)
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

export default WidgetColor