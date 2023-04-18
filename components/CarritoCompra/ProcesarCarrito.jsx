import { useState,useEffect } from 'react'
import useGlobal from '/hooks/useGlobal'
import {List, Modal, Form, Input, Alert} from 'antd'
// import {LoadingOutlined}from '@ant-design/icons'
import { FormatNumber } from '/utils/utilidades';
import InfiniteScroll from 'react-infinite-scroll-component';
import { procesarCarro } from '../../pages/api/Cart';
import { Success, Warning, MError } from '/utils/Notificaciones';
import allServices from '../../services/allServices';
import { useRouter } from 'next/router';
// import Enumerable from 'linq';
import useLogin from '../../hooks/useLogin'
// import {SpinLoading} from '../../assets/img/index'
// import { FormatoPalabras } from '../../utils/utilidades';
import Select from 'react-select';
import { Loading } from '../elements/Loading';

const Procesarcarrito = () => {
  const {procesar} = useGlobal();
  const {idcontacto, carthook, datacontacto} = useLogin();

  // Instancia de formulario direcciones
  const [form] = Form.useForm();
  const [error, setError] = useState('');

  const [minisitio, setMinisitio] = useState(0);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [productos, setProductos] = useState([]);

  const [listaRegiones, setListaRegiones] = useState([]);
  const [Mostrardirecciones, setMostrardirecciones] = useState([]);//Dropdown direcciones
  const [direcciones, setDirecciones] = useState([]); //lista de direcciones del usuario

  const [mostrarComuna, setMostrarComuna] = useState('');
  const [mostrarCiudad, setMostrarCiudad] = useState('');
  const [mostrarRegion, setMostrarRegion] = useState('');


  const [comuna ,setComuna] = useState([]);
  const [region ,setRegion] = useState([]);
  const [comunaDisable, setComunaDisable] = useState(true);
  const [mostrarDireccion, setmostrarDireccion] = useState('Ocultar');
  // const [first, setfirst] = useState(second)

  const [habilitarModDir, setHabilitarModDir] = useState(false);
  const [dropdownDefaultValue, setDropDownDefaultValue] = useState('');
  const [modalVisible, setModalVisible] = useState("none");
  const [modalVisibleBoleta, setModalVisibleBoleta ] = useState(false);

  //Variables detalle Detalle
  const [detNombreCliente, setDetNombreCliente] = useState('');
  const [detNombreEmp, setDetNombreEmp] = useState('');
  const [detRutEmpresa, setRutEmpresa] = useState('');
  const [detDireccion, setDetDireccion] = useState('');
  const [detFechaIngreso, setDetFechaIngreso] = useState('');
  const [nroPedido, setNroPedido] = useState('');
  const [nroSolicitud, setNroSolicitud] = useState('');

  const Router = useRouter();

  let brandresult = []
  let regionresult = [];
  let finalresultRegion = [];
  let finalresultCommune = [];

  const formInitialValues = {
    ciudad: '',
    direccion: '',
    idComuna: '',
    idDireccion: '',
    idRegion: '',
    localidad: '',
    nroDireccion: '',
  }

  function cargarValores(){

    setSubTotal(procesar[0][0]);
    setIva(procesar[0][1]);
    setTotal(procesar[0][2]);

  }

  async function consultarDirecciones(){

    let dato3 = await allServices.getContact();
    let dato = await allServices.getBusiness();
    let dato2 = await allServices.regions();
    // let allregion = await allServices.regions();

    let ciu = '';
    let com = '';
    let reg = '';
    let def;

    if(dato3[0].siAdmin == 1 || dato3[0].siAdmin == 2){

      setHabilitarModDir(true);

    }
    else{
      setHabilitarModDir(false);
    } 

    setListaRegiones(dato2)

    let dir = dato[0].direccionDespacho;
    setDirecciones(dir);

    // Se inicializa con opción para crear nueva dirección
    let dropdown = [{
      value: 'crearNueva',
      label: 'Crear nueva dirección'
    }];
    let objeto = [];
    let porDefecto = false;

    dir.map((item) =>{

      // Si hay dirección por defecto se deja en el dropdown y se cargan los datos
      if(item.siPorDefecto == 1){

        porDefecto = true
        const defaultObj = {
          value: item.idDireccion,
          label: item.direccion.trim() + ' ' + item.nroDireccion
        }

        setDropDownDefaultValue(defaultObj);
        def = item.idDireccion;

        const region = dato2.find(region => region.idRegion === item.idRegion)

        ciu = item.ciudad;
        com = item.comuna;
        reg = region.region;

      }

      objeto={

        value: item.idDireccion,
        label: item.direccion.trim() + ' ' + item.nroDireccion
      }

      dropdown.push(objeto);
    })

    // Si no hay direccion por defecto
    if(!porDefecto) {

      // Si hay un listado pero ninguna es por defecto, se coloca la primera
      if(dir.length > 0) {

        setDropDownDefaultValue({
          value: dir[0].idDireccion,
          label: dir[0].direccion.trim() + ' ' + dir[0].nroDireccion
        })

        const region = dato2.find(region => region.idRegion === dir[0].idRegion)

        ciu = dir[0].ciudad;
        com = dir[0].comuna;
        reg = region.region;
      }
      
    }

    setMostrarCiudad(ciu);
    setMostrarComuna(com);
    setMostrarRegion(reg);

    setMostrardirecciones(dropdown);
  }

  useEffect(async () => {

    if (procesar.length > 0) {

      await consultarDirecciones();

      setMinisitio(procesar[2]);
      cargarValores();
      setProductos(procesar[1]);
      setDetNombreCliente(datacontacto[0].nombreContacto.toUpperCase());
      setDetNombreEmp(datacontacto[0].razonSocial);
      setRutEmpresa(datacontacto[0].idCliente);

    } else {
      Router.replace('/carritoCompra/cart')
    }

    getRegiones();
    setLoading(false);
    // CargarDireccion(dropdownDefaultValue);

  },[])

  async function EnviarProcesar(){

    setModalVisible("flex");

    let item = {
      "idMiniSitio": minisitio,
      "iDcontacto": idcontacto,
      "addressDespachoDef": dropdownDefaultValue.value,
      "comentarios": '',
    }
  
    let res = await procesarCarro(item);

    if(res.status == 200){

      Success(res.data[0].msgMessage);
      carthook();

      Mostrardirecciones.map((item) =>{

        if(dropdownDefaultValue.value === item.value){
          setDetDireccion(item.label);
        }

      })

      const now = new Date();
      // Fecha formato dd/mm/yyyy hh:mm:ss
      const date = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      setDetFechaIngreso(date);

      setNroPedido(res.data[0].numWebPedido)
      setNroSolicitud(res.data[0].numPedido)

      setModalVisible("none");
      setModalVisibleBoleta(true);
    }
    else{
      Warning(res.data.mensaje);
      setModalVisible("none");
      // console.log('Retorno de la api error', res);
    }

  }

  function CargarDireccion(e){

    let ciu = '';
    let com = '';
    let reg = '';

    setError('')
    setDropDownDefaultValue(e);

    // Crear o Editar
    if( e.value === 'crearNueva' ) {

      form.resetFields();
      if(mostrarDireccion == 'Ocultar'){
        setmostrarDireccion('');
      }

    } else {

      // Se busca la direccion que haga match con el id seleccionado
      direcciones.map( direccion => {

        if(direccion.idDireccion == e.value){
          ciu = direccion.ciudad;
          com = direccion.comuna;

          listaRegiones.map( region => {

            if(direccion.idRegion == region.idRegion){

              reg = region.region;

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

    setMostrarCiudad(ciu);
    setMostrarComuna(com);
    setMostrarRegion(reg);

  }

  const getRegiones = async () =>{
    let allregion = await allServices.regions();
    if (allregion) {
        setRegion(allregion);
    }
  }

  if (region && region.length > 0) {
    region.map(item => {
        let object = {value: item.idRegion, label: item.region};
        brandresult.push(object)
    })
    finalresultRegion = brandresult;
  }

  const getCommune = async (selectedRegion) =>{
    let allcomunne = await allServices.communes(selectedRegion)
    if (allcomunne) {
        setComuna(allcomunne)
    }
  }

  if(comuna && comuna.length > 0) {
    comuna.map(item => {
          let object = {value: item.idComuna, label: item.comuna};
          regionresult.push(object)
      })
      finalresultCommune = regionresult
  }

  const validarrengion = (e) => {

    let valor = e == null ? '': e.value
    getCommune(valor);

    if(valor != null){
      setComunaDisable(false);
    }
  }

  const validarcomuna = (e) => {
    // if(!comunaDisable){
    //   let valor = editData?.idRegion == null ? '': editData?.idRegion;
    //   getCommune(valor);
  }

  const MostrarDireccion = (e) =>{

    e.preventDefault();
    setError('');
    if(mostrarDireccion == 'Ocultar'){

      // Carga de info al formulario si el formulario está cerrado
      direcciones.map( direccion => {

        if(direccion.idDireccion == dropdownDefaultValue.value){

          listaRegiones.map( region => {

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

      setmostrarDireccion('');
    }

    

  }

  const OcultarDireccion = (e) =>{

    e.preventDefault();
    setError('');
    if(mostrarDireccion == ''){
      setmostrarDireccion('Ocultar');
      form.resetFields();
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

    if( dropdownDefaultValue.value === 'crearNueva' ) {

      // Validacion id nueva direccion no puede repetirse con una existente
      const direccionIgualId = direcciones.find( direccion => direccion.idDireccion === values.idDireccion ); 

      if( direccionIgualId ) {
        setError('No puede repetir el nombre de una dirección');
        return
      }

      // API Agregar Direccion
      res = await allServices.postCreateDireccion(data);

    } else {

      // Validación direccionId no puede repetirse, a menos que sea la misma
      const direccionOriginal = direcciones.find( direccion => direccion.idDireccion === dropdownDefaultValue.value )
      const direccionIgualId = direcciones.find( direccion => direccion.idDireccion === values.idDireccion );
      
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
        async() => {
          let business = await allServices.getBusiness();
          let dir = business[0].direccionDespacho;
          setDirecciones(dir);
        }
      
        const newDir = { value: values.idDireccion, label: values.direccion.trim() + ' ' + values.nroDireccion }
        setDropDownDefaultValue(newDir)
      }
      else if(res.status == 404){
        Warning(res.data);
      }
      else{
        MError(res.data);
      }
    }
    
  }

  function Redireccionar(){

    Router.push('/account/my-account');
  }

  return (
    <div className="ps-block--shopping-total">
      <h4 className="resumenCompraTitle">Resumen de compra</h4>
      <div className="row">
        <div className="col-sm-6">
          <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>{`Productos (${productos.length})`}</strong>
                    </figcaption>
                </figure>
                <div 
                  id="scrollableDiv"
                  style={{
                    overflow: 'auto',
                  }}>
                  <InfiniteScroll
                      dataLength={productos.length}
                      hasMore={productos.length < 50}
                      scrollableTarget="scrollableDiv"
                    >
                      <List
                        size="small"
                        bordered={false}
                        itemLayout="vertical"
                        dataSource={productos}
                        loading={loading}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={
                                <img 
                                  className='m-0' 
                                  src={item.imagen} 
                                  height="100px" width="100px"
                                  onError={(e) => (e.target.onerror = null, e.target.src = '/static/img/slider/andes/85182.jpeg')} 
                                />
                              }
                              title={
                                <div >
                                  <h6 className="m-0">{item.nombre.toUpperCase()}</h6>
                                </div>
                              }
                              description={
                                <>
                                  <p className='m-0' style={{ color: '#003399', lineHeight: 1.3, fontSize: '13px' }}>SKU : {item.idArticulo}</p>
                                  
                                  {
                                    item.descuento !== 0 
                                      ?
                                        <>
                                          <p className="m-0" style={{ color: '#003399', lineHeight: 1.3, fontSize: '13px' }}>
                                            Precio Anterior: <span style={{ textDecoration: 'line-through' }}>{FormatNumber(item.precioVenta)}</span>
                                          </p>
                                          <p className="m-0" style={{ color: '#003399', lineHeight: 1.3, fontSize: '13px' }}>
                                            Precio Final : <span className='newPrice'>{FormatNumber(item.precioVentaFinal)}</span>
                                          </p>
                                        </>
                                      :
                                        <p className="m-0" style={{ color: '#003399', lineHeight: 1.3, fontSize: '13px' }}>
                                          Precio : {FormatNumber(item.precioVenta)}
                                        </p>
                                      
                                  }

                                  <p className="m-0" style={{ color: '#003399', lineHeight: 1.3, fontSize: '13px' }}>Cantidad : {item.cantidad}</p>

                                  {
                                    item.cantidad > 1 &&
                                      <p className="m-0" style={{ color: '#003399', lineHeight: 1.3, fontSize: '13px' }}>
                                        Total : {FormatNumber(item.totalVentaLinea)}
                                      </p>
                                  }

                                </>

                              }
                            />
                          </List.Item>
                        )}
                      />
                  </InfiniteScroll>
                </div>
                <figure></figure>

                {/*Total Sub total e Iva y procesar carrito web*/}
                <div className='procesarValorWeb'>

                  {
                    subtotal < 80000 &&
                      <div style={{ padding: '0 10%' }}>
                        <h4 style={{ margin: 0, textAlign: 'center', fontWeight: 600, color: 'red' }}>Recuerde que para realizar una compra debe ser mínimo de $80.000 neto</h4>
                      </div>
                  }
                  
                  <div className="d-flex align-items-end flex-column bd-highlight pt-2">
                    <div className='col-5 p-0 py-3'>

                      <p className='d-flex justify-content-between'>
                        <strong className="col-6 p-0 pl-4">Subtotal </strong>
                        <span className="col-6 text-dark p-0 text-right pr-4">{FormatNumber(subtotal)}</span>
                      </p>

                      <p className='d-flex justify-content-between'>
                        <strong className="col-6 p-0 pl-4">Iva </strong>
                        <span className="col-6 text-dark p-0 text-right pr-4">{FormatNumber(iva)}</span>
                      </p>
                    </div>
                  </div>

                  <figure></figure>
                  
                  <div className="d-flex justify-content-end bd-highlight mb-3">
                    <div className="col-5 py-3">
                      <h3 className='m-0'><strong>Total </strong><span>{FormatNumber(total)}</span></h3>
                    </div>
                  </div>

                  {
                    subtotal > 80000 &&
                      <div>
                        {
                          mostrarDireccion === '' &&
                            <h4 style={{ textAlign: 'center', color: 'red' }}>Debe terminar de editar su dirección para seguir con el proceso</h4>
                        }
                        {
                          dropdownDefaultValue.value === 'crearNueva' && mostrarDireccion === 'Ocultar' &&
                            <h4 style={{ textAlign: 'center', color: 'red' }}>Debe seleccionar una dirección para seguir con el proceso</h4>
                        }
                        <button className="ps-btn ps-btn--fullwidth text-white" onClick={() => EnviarProcesar()} disabled={ (mostrarDireccion === '') || (dropdownDefaultValue.value === 'crearNueva') }>Terminar Proceso</button>
                      </div>
                  }
                  
                </div>
                
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="ps-block--checkout-order">


            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Direcciones</strong>
                    </figcaption>
                </figure>
                <div className="p-5" style={{ backgroundColor: '#F5F5F5',borderRadius:'10px' }}>

                  {/* Direccion web */}
                  <div className='procesarDireccionWeb'>
                    <div className="row">
                      {
                          habilitarModDir == true ? 
                          <div className='col-4 py-4 text-center'>
                            <a href="#" className="text-primary" onClick={ (e) => MostrarDireccion(e)}>Modificar dirección</a>
                          </div>
                        :
                        <div className='col-4 py-4 text-center'>

                        </div>
                      }

                      <div className='col-8 p-0'>
                        <Select
                          value={dropdownDefaultValue}
                          // defaultValue={dropdownDefaultValue}
                          showSearch
                          style={{ width: '100%' }}
                          placeholder="Seleccione dirección"
                          onChange={(e) => CargarDireccion(e)}
                          options={Mostrardirecciones}
                        ></Select>
                      </div>

                    </div>

                    <div className="row mt-4">

                      <div className="col-4 p-0 text-center py-4">
                          <i className="fa fa-map-marker fa-3x icon-locate" style={{ color: '#418BFA' }}></i>
                      </div>

                      <div className="col-8 p-0">
                          <p>Region: {mostrarRegion.toUpperCase()}</p>
                          <p>Ciudad: {mostrarCiudad.toUpperCase()}</p>
                          <p>Comuna: {mostrarComuna.toUpperCase()}</p>
                      </div>

                    </div>
                  </div>
                  
                  {/* DireccionMobile */}
                  <div className='procesarDireccionMobile'>
                    <div style={{ display: 'flex' }}>
                      {
                          habilitarModDir == true 
                            ? 
                              <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                <a href="#" className="text-primary" onClick={ (e) => MostrarDireccion(e)}>Modificar dirección</a>
                              </div>
                            :
                              <div className='col-6 py-4 text-center'></div>
                      }

                      <div className="p-0 text-end">
                        <i className="fa fa-map-marker" style={{ color: '#418BFA', borderRadius: '100%', backgroundColor: 'white', padding: '10px 15px', fontSize: '16px'}}></i>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                      
                      <Select
                        value={dropdownDefaultValue}
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Seleccione dirección"
                        onChange={(e) => CargarDireccion(e)}
                        options={Mostrardirecciones}
                      ></Select>

                      <div style={{ marginTop: '20px'}}>
                          <p style={{ fontSize: '13px' }}>Región: {mostrarRegion.toUpperCase()}</p>
                          <p style={{ fontSize: '13px' }}>Ciudad: {mostrarCiudad.toUpperCase()}</p>
                          <p style={{ fontSize: '13px' }}>Comuna: {mostrarComuna.toUpperCase()}</p>
                      </div>

                    </div>
                  </div>
                  
                </div>

                {/* Form Direcciones */}
                <div className={'mt-5 ' + mostrarDireccion}  style={{border: '1px solid #F5F5F5', borderRadius:'10px' }}>
                  <div style={{ padding: '10px 0' }}>
                    <Form 
                      layout="vertical" 
                      form={form}
                      initialValues={formInitialValues} 
                      onFinish={onFinishDireccion}
                      style={{ marginTop: '20px' }} 
                    >
                      <div className='row' style={{ padding: '0 15px' }}>
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
                                      placeholder="Nombre dirección"
                                  />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-12 col-sm-9">
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
                        <div className="col-12 col-sm-3">
                            <div className="form-group">
                                <Form.Item
                                    label="Número"
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
                                      placeholder="Número"
                                  />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
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
                                      showSearch
                                      style={{ width: '100%' }}
                                      placeholder="Seleccione region"
                                      optionFilterProp="children"
                                      onChange={(e) => validarrengion(e)}
                                      options={finalresultRegion}
                                  />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6">
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
                                      showSearch
                                      style={{ width: '100%' }}
                                      placeholder="Seleccione comuna"
                                      optionFilterProp="children"
                                      onClick={(e) => validarcomuna(e)}
                                      options={finalresultCommune}
                                      disabled={comunaDisable}
                                  />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
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
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Ciudad"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6">
                            <div className="form-group">
                                <Form.Item
                                    label="Localidad"
                                    name="localidad"
                                    className="blue"
                                    rules={[
                                    {
                                        required: false,
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

                      <div className='col-12 text-right'>
                        {/* <button type='submit' className='btn btn-primary' style={{width: '120px', fontWeight: '600', height: '40px', fontSize: '12px' }} onClick={(e) => AgregarDireccion(e)}>Agregar</button> */}
                        <button type='submit' className='btn btn-primary' style={{width: '120px', fontWeight: '600', height: '40px', fontSize: '12px' }}>{ dropdownDefaultValue.value === 'crearNueva' ? 'Agregar' : 'Modificar' }</button>
                        <button type='button' className='btn btn-secondary ml-4' style={{width: '120px', fontWeight: '600', height: '40px', fontSize: '12px' }} onClick={ (e) => OcultarDireccion(e) }>Cerrar</button>
                      </div>
                    </Form>

                  </div>
                </div>

            </div>
          </div>
        </div>


        {/*Total Sub total e Iva y procesar carrito movil*/}
        <div className='procesarValorMobil'>
          <div style={{ padding: '0 5%'}}>
            <div style={{ padding: '10px 20px' }}>

              {
                subtotal < 80000 &&
                  <p style={{ margin: 0, textAlign: 'center', fontWeight: 600, color: 'red', marginBottom: '3%' }}>Recuerde que para realizar una compra debe ser mínimo de $80.000 neto</p>
              }

              <p style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: 'black' }}>Subtotal <span style={{ float: 'right'}}><b>{FormatNumber(subtotal)}</b></span></p>
              <p style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: 'black' }}>Iva <span style={{ float: 'right'}}><b>{FormatNumber(iva)}</b></span></p>
              <hr />
              <h3 style={{ fontSize: '18px' }}>Total <span style={{ float: 'right', color: 'red', fontWeight: 600 }}>{FormatNumber(total)}</span></h3>

              {
                mostrarDireccion === '' &&
                  <h4 style={{ textAlign: 'center', color: 'red', fontSize: '1.7rem', margin: '20px 0 10px 0' }}>Debe terminar de editar su dirección para seguir con el proceso</h4>
              }
              {
                dropdownDefaultValue.value === 'crearNueva' && mostrarDireccion === 'Ocultar' &&
                  <h4 style={{ textAlign: 'center', color: 'red', fontSize: '1.7rem', margin: '20px 0 10px 0' }}>Debe seleccionar una dirección para seguir con el proceso</h4>
              }
              {
                subtotal > 80000 &&
                  <button type='button' className='btn btn-lg btn-block mt-4 procesarCarritobtn' onClick={() => EnviarProcesar(procesar)} disabled={ (mostrarDireccion === '') || (dropdownDefaultValue.value === 'crearNueva') }>Terminar Proceso</button>
              }

            </div>
          </div>
        </div>

      </div>
      {/*Modal de carga */}
      <div className='modalSpinner2 justify-content-flex' style={{display:modalVisible}}>
        <div className='modal-contentSpinner2'>
            <Loading />
        </div>
      </div>

      {/*Modal de Detalle*/}
      <Modal
        open={modalVisibleBoleta}
        okButtonProps={{hidden:true}}
        cancelButtonProps={{hidden: true}}
        centered={true}
        className='modalBoleta'
        // width={1000}
        closable={false}
        footer={false}
        bodyStyle={{backgroundColor:'#EEEEEE'}}
      >
        <section className='row p-0 m-0 d-flex justify-content-center' style={{backgroundColor:'#EEEEEE'}}>

          <div className='col-12 m-0 p-0' style={{backgroundColor : '#FFFFFF'}}>
              
            {/*Head*/}
            <div className='m-0 d-flex align-items-center justify-content-center' style={{ backgroundColor:'#003399', height:'100px' }}>
              <img src='/logo/Logo-andes-50-wh.svg' style={{ height: '70%' }} />
            </div>

            {/*Body*/}
            <div className='px-4'>
              <div>
                <div className='text-center py-5'>
                  <img src="/logo/compra_exitosa.svg" alt="" height='130' />
                </div>
                <div>
                  <h2 className='boletaTitulo'>¡Gracias por su compra!</h2>
                  <h3 className='boletaSubTitulo' style={{ margin: '10px 0 15px'}}>Su orden ha sido ingresada con exito</h3>
                </div>
                <div>
                  <p className='text-left' style={{ fontWeight: 600, color: 'black' }}>
                    Estimado {detNombreCliente}, ha realizado un pedido a nombre de la
                    empresa {detNombreEmp} con RUT: {detRutEmpresa}
                  </p>
                  <p className='text-left' style={{ fontWeight: 600, color: '#003399' }}>Para más información consulte a su ejecutivo de ventas.</p>
                </div>
                <div className='my-4'>
                    <h4 className='boletaConfirmacion' style={{ margin: 0 }}>CONFIRMACIÓN DEL PEDIDO #{ nroSolicitud }</h4>
                    {/* El otro nro es nroPedido */}
                    {/* <p style={{ textAlign: 'center', color: 'black', fontSize: '15px' }}>Su número de solicitud es { nroSolicitud }</p> */}
                </div>
                <div>
                    <table className='col-12 m-0 p-0'>
                      <thead className='p-0 m-0'>
                        <tr className='col-12 p-0 m-0'>
                          <th className='col-5 col-sm-6 p-0 m-0 font-weight-bold'>Nombre</th>
                          <th className='col-2 col-sm-2 p-0 m-0 text-right font-weight-bold'>Código</th>
                          <th className='col-2 col-sm-2 p-0 m-0 text-right font-weight-bold'>Cant</th>
                          <th className='col-3 col-sm-2 p-0 m-0 text-right font-weight-bold'>Total</th>
                        </tr>
                      </thead>
                      <tbody className='p-0 m-0' style={{ borderTop: '10px solid transparent' }}>
                          {
                            productos.map( (item, key) =>
                                <tr className='p-0 m-0' style={{ borderTop: '5px solid transparent' }} key={key}>
                                  <td className='p-0 m-0 font-weight-bold'>{item.nombre}</td>  
                                  <td className='p-0 m-0 text-right font-weight-bold'>{item.idArticulo}</td>
                                  <td className='p-0 m-0 text-right font-weight-bold'>{item.cantidad}</td>
                                  <td className='p-0 m-0 text-right font-weight-bold'>{FormatNumber(item.precioVentaFinal)}</td> 
                                </tr>
                              )
                          }
                      </tbody>
                    </table>
                </div>
                
                <hr />

                <div className='col-12 p-0 m-0'>
                  <table className='col-12 p-0 m-0'>
                    <tbody>
                      <tr>
                        <td className='col-6 p-0 m-0 font-weight-bold'>Neto</td>
                        <td className='col-6 p-0 m-0 text-right font-weight-bold'>{FormatNumber(subtotal)}</td>
                      </tr>
                      <tr>
                        <td className='col-6 p-0 m-0 font-weight-bold'>IVA</td>
                        <td className='col-6 p-0 m-0 text-right font-weight-bold'>{FormatNumber(iva)}</td>
                      </tr>
                      <tr>
                        <td className='col-6 p-0 m-0 font-weight-bold'>TOTAL</td>
                        <td className='col-6 p-0 m-0 text-right font-weight-bold'>{FormatNumber(total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className='mt-5'>
                      <table className='col-12'>
                        <tbody>
                          <tr>
                            <td className='col-6 p-0 m-0 font-weight-bold'>Dirección de despacho</td>
                            <td className='col-6 p-0 m-0 text-right font-weight-bold'>Fecha de ingreso</td>
                          </tr>
                          <tr>
                            <td className='col-6 p-0 m-0'>{detDireccion}</td>
                            <td className='col-6 p-0 m-0 text-right'>{detFechaIngreso}</td>
                          </tr>
                        </tbody>
                      </table>
                </div>

              </div>
            </div>

            {/*Footer*/}
            <div className='mt-5'>
              <button className='col-12 BotonCerrar' ><h3 style={{ color:'#FFFFFF', margin: 0 }} onClick={() => Redireccionar()}>Cerrar</h3></button>
            </div>

          </div>
        </section>
        
          
      </Modal>

    </div>
  )
};

export default Procesarcarrito;