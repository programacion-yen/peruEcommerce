import { useState, useEffect } from 'react'
import { Alert, Form, Input} from 'antd'
import Select from 'react-select';
import allServices from '/services/allServices'
import useProducts from '/hooks/useProducts';
import { Success, Warning, MError } from '/utils/Notificaciones';

export const DetallesEmpresaMobile = ({ items }) => {

  let finalresultDirecciones = [];
  // Se inicializa con opción para crear nueva dirección
  let result = [{
    value: 'crearNueva',
    label: 'Crear nueva dirección'
  }];
  let communeresult = []
  let regionresult = []
  let finalresultRegion = []
  let finalresultCommune = []

  const [selectedOption, setSelectedOption] = useState({
    value: 'crearNueva',
    label: 'Crear nueva dirección'
  });
  const [executive, setExecutive] = useState()
  const [error, setError] = useState('');

  const {region,getRegiones,commune,getCommune} = useProducts()

  const [form] = Form.useForm();

  const formInitialValues = {
    ciudad: '',
    direccion: '',
    idComuna: '',
    idDireccion: '',
    idRegion: '',
    localidad: '',
    nroDireccion: '',
  }

  const getExecutiveSale = async () => {
    let datos = await allServices.getExecutiveSales()
    setExecutive(datos)
  }

  if(items) {
    items.direccionDespacho.map(item => {
      let object = {value: item.idDireccion, label: item.direccion};
      result.push(object)
    })
    finalresultDirecciones = result
  }

  if (region && region.length > 0) {
    region.map(item => {
      let object = {value: item.idRegion, label: item.region};
      regionresult.push(object)
    })
    finalresultRegion = regionresult
  }

  if(commune && commune.length > 0) {
    commune.map(item => {
      let object = {value: item.idComuna, label: item.comuna};
      communeresult.push(object)
    })
    finalresultCommune = communeresult
  }

  const validarrengion = (e) => {
    let valor = e == null ? '':e.value
    
    // Eliminacion de valor comuna al cambiar de región
    form.setFieldsValue({
      ...form.getFieldsValue(),
      idComuna: null,
    })

    getCommune(valor)
  }

  const getData = () => {
    getExecutiveSale()
    getRegiones();
  }

  useEffect(() => {
    getData()
  }, []);

  function CargarDireccion(e){

    setError('')
    setSelectedOption(e);

    // Crear o Editar
    if( e.value === 'crearNueva' ) {
      form.resetFields();
    } else {

      // Se busca la direccion que haga match con el id seleccionado
      items.direccionDespacho.map( direccion => {
        if(direccion.idDireccion == e.value){
          region.map( region => {
            if(direccion.idRegion == region.idRegion){
              // Se carga la información de la dirección para editar
              form.setFieldsValue({
                ...direccion,
                idRegion: { value: region.idRegion, label: region.region },
                idComuna: { value: direccion.idComuna, label: direccion.comuna }
              })
            }
          })
        }
      })

    }

  }

  const onFinishDireccion = async(values) =>{

    setError('')

    let res;
    const data = {
      ...values,
      idComuna: values.idComuna.value,
      idRegion: values.idRegion.value,
      tipoDireccion: 'S',
      codigoPostal: '',
    }

    if( selectedOption.value === 'crearNueva' ) {

      // Validacion id nueva direccion no puede repetirse con una existente
      const direccionIgualId = items.direccionDespacho.find( direccion => direccion.idDireccion === values.idDireccion ); 

      if( direccionIgualId ) {
        setError('No puede repetir el nombre de una dirección');
        return
      }

      // API Agregar Direccion
      res = await allServices.postCreateDireccion(data);

    } else {

      // Validación direccionId no puede repetirse, a menos que sea la misma
      const direccionOriginal = items.direccionDespacho.find( direccion => direccion.idDireccion === selectedOption.value )
      const direccionIgualId = items.direccionDespacho.find( direccion => direccion.idDireccion === values.idDireccion );

      if( direccionIgualId && direccionOriginal.linea !== direccionIgualId.linea ) {

        setError('No puede repetir el nombre de una dirección');

      } else {

        data = {
          ...data,
          linea: direccionOriginal.linea
        }

        // API Modificar direccion
        res = await allServices.updateDireccion(data);

      }

    }

    if( res ) {
      if( res.status == 200){
        Success(res.data);
        form.resetFields();
      }
      else if(res.status == 404){
        Warning(res.data);
      }
      else{
        MError(res.data);
      }
    }
    
  }

  return (
    <div>
      <div style={{ border: '1px solid #001E8F', borderRadius: '10px', marginBottom: '10px' }}>
          <p style={{ color: '#001E8F', lineHeight: 1.3, textAlign: 'center', fontSize: '13px', margin: 0, padding: '5px 15px', fontWeight: 600 }}>
            Desde el panel de su cuenta, puede ver sus
            órdenes reciente, administre sus
            direcciones de envío y facturación,
            y edite su contraseña y los detalles de su cuenta.
          </p>
      </div>

        <div className="col-12 formDetailsTitle">Razón Social</div>
        <div className="w-100"></div>
        <div className='col-12'><p>{items.razonSocial}</p></div>

        <div className="col-12 formDetailsTitle">RUT</div>
        <div className="col-12"><p>{items.idCliente}</p></div>
        <div className="col-12 formDetailsTitle">Teléfono</div>
        <div className="col-12"><p>{items.celular}</p></div>
        <div className="col-12 formDetailsTitle">Email</div>
        <div className="col-12"><p>{items.eMail}</p></div>
        <div className="col-12 formDetailsTitle">Dirección de facturación</div>
        <div className="col-12"><p>{items.direccionFactura}</p></div>
        <div className="col-12 formDetailsTitle">Facebook</div>
        <div className="col-12"><p>{items.facebook ? items.facebook : 'Sin información'}</p></div>
        <div className="col-12 formDetailsTitle">Twitter</div>
        <div className="col-12"><p>{items.twitter  ? items.twitter : 'Sin información'}</p></div>
        <div className="col-12 formDetailsTitle">Instagram</div>
        <div className="col-12"><p>{items.instagram  ? items.instagram : 'Sin información'}</p></div>
        <div className="col-12 formDetailsTitle">Página Web</div>
        <div className="col-9"><p>{items.paginaWeb ? items.paginaWeb : 'Sin información'}</p></div>

        <div className='col-12' style={{ color: '#003399', fontSize: '1.5rem', fontWeight: 600, textAlign: 'center', paddingBottom: '15px' }}>* Si alguno de los datos de la empresa no corresponde, contacte a su ejecutivo.</div>

        <h4 className="formDetailsTitleMenu">Datos Ejecutivo</h4>
        {executive && executive.map((item, key) => (
          <div className="my-4" key={key}>
            <div className="col-12 formDetailsTitle">Nombre</div>
            <p className="col-12">{item.nombre}</p>
            <div className="col-12 formDetailsTitle">Correo Electrónico</div>
            <p className="col-12">{item.email}</p>
            <div className="col-12 formDetailsTitle">Anexo</div>
            <p className="col-12">{item.anexo}</p>
            <div className="col-12 formDetailsTitle">Celular</div>
            <p className="col-12">{item.celular}</p>
          </div>
        ))}
        
        <h4 className="formDetailsTitleMenu">Crear dirección de despacho</h4>
        <Form 
          layout="vertical" 
          form={form}
          initialValues={formInitialValues} 
          style={{ marginTop: '20px' }} 
          onFinish={onFinishDireccion}
        >
          <div>
            <div className="col-12">
                <div className="form-group">
                  <label htmlFor="" style={{ fontWeight: 600, color: '#003399', fontSize: '16px' }}>Direcciones de despacho</label>
                  <Select
                    value={selectedOption}
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Seleccione dirección"
                    onChange={(e) => CargarDireccion(e)}
                    options={finalresultDirecciones}
                  />
                </div>
            </div>
            <div className="col-12">
                <div className="form-group">
                    <Form.Item
                        label="Nombre dirección"
                        name="idDireccion"
                        className="blue"
                        rules={[
                        {
                            required: true,
                            message: 'Campo requerido!',
                        },
                        ]}>
                      <input
                          className="form-control"
                          type="text"
                          placeholder="Nombre Dirección"
                      />
                    </Form.Item>
                </div>
            </div>
            <div className="col-12">
                <div className="form-group">
                    <Form.Item
                        label="Dirección de despacho"
                        name="direccion"
                        className="blue"
                        rules={[
                        {
                            required: true,
                            message: 'Campo requerido!',
                        },
                        ]}>
                      <input
                          className="form-control"
                          type="text"
                          placeholder="Dirección de despacho"
                      />
                    </Form.Item>
                </div>
            </div>
            <div className="col-12">
                <div className="form-group">
                    <Form.Item
                        label="Número de dirección"
                        name="nroDireccion"
                        className="blue"
                        rules={[
                        {
                            required: true,
                            message: 'Campo requerido!',
                        },
                        ]}>
                      <input
                          className="form-control"
                          type="text"
                          placeholder="Número de dirección"
                      />
                    </Form.Item>
                </div>
            </div>
            <div className="col-12">
                <div className="form-group">
                    <Form.Item
                        label="Región"
                        name="idRegion"
                        className="blue"
                        rules={[
                        {
                            required: true,
                            message: 'Campo requerido!',
                        },
                        ]}
                    >
                      <Select
                          // instanceId="region"
                          // defaultValue={selectedOption}
                          name="idRegion"
                          options={finalresultRegion}
                          onChange={(e) => validarrengion(e)}
                          isClearable
                      />
                    </Form.Item>
                </div>
            </div>

            <div className="col-12">
                <div className="form-group">
                  <Form.Item
                        label="Comuna"
                        name="idComuna"
                        className="blue"
                        rules={[
                        {
                            required: true,
                            message: 'Campo requerido!',
                        },
                        ]}
                    >
                      <Select
                          // instanceId="commune"
                          // defaultValue={selectedOption}
                          name="idComuna"
                          options={finalresultCommune}
                          isSearchable
                          isClearable
                      />
                    </Form.Item>
                </div>
            </div>
            <div className="col-12">
                <div className="form-group">
                    <Form.Item
                        label="Ciudad"
                        name="ciudad"
                        className="blue"
                        rules={[
                        {
                            required: true,
                            message: 'Campo requerido!',
                        },
                        ]}
                    >
                        <Input
                            className="form-control"
                            type="text"
                            name="ciudad"
                            placeholder="Ciudad"
                        />
                    </Form.Item>
                </div>
            </div>

            <div className="col-12">
                <div className="form-group">
                    <Form.Item
                        label="Localidad"
                        name="localidad"
                        className="blue"
                        rules={[
                        {
                            required: true,
                            message: 'Campo requerido!',
                        },
                        ]}
                    >
                        <Input
                            className="form-control"
                            type="text"
                            name="localidad"
                            placeholder="Localidad"
                        />
                    </Form.Item>
                </div>
            </div>
          </div>

          {
            error &&
              <div style={{ marginBottom: '20px', padding: '0 15px' }}>
                <Alert
                  message="Error en el formulario"
                  description={error}
                  type="error"
                  showIcon
                />
              </div>
          }

          <div className="d-flex justify-content-center">
            <Form.Item className="">
                <button type="submit" className="btn btn-lg btnSubmitMyAccount" style={{ padding: '2px 40px'}}>{ selectedOption.value === 'crearNueva' ? 'Agregar' : 'Modificar' }</button>
            </Form.Item>
          </div>
        </Form>
    </div>
  )
}
