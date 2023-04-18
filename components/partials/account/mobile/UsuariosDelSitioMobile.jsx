import { useState, useEffect, useContext } from 'react'
import { Table, Space, Modal, Input, Select, DatePicker, Form, Switch } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Success, Warning, MError } from '/utils/Notificaciones';
import moment from 'moment';

import useLogin from '/hooks/useLogin';
import useProducts from '/hooks/useProducts';
import allServices from '/services/allServices';
// import { getNotificationStyle } from '/utils/utilidades'
import { FormNuevoUsuarioMobile } from './';
import Context from '../../../../context/UserContext';

const { Option } = Select

export const UsuariosDelSitioMobile = () => {

    const {idcontacto} = useLogin();

    const [form] = Form.useForm();

    const [edit, setEdit] = useState(false);

    const [errorFecha , setErrorFecha] = useState(false)
    const [errorLoading , setErrorLoading] = useState(false)
    const [errorLoadingActual , setErrorLoadingActual] = useState(false)
    
    const {contact,contactHook,getcargo,cargos,region,getRegiones,commune,getCommune} = useProducts()

    const [data, setData] = useState();
    const [claveAntigua, setClaveAntigua] = useState('');

    const { minisitiosEmpresa } = useContext(Context)

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    let type;
    let brandresult = []
    let regionresult = []
    let finalresultRegion = []
    let finalresultCommune = []
    let cargoresult = []
    let finalcargoresult = []

  const getContact = async () => {
    let contacts = await allServices.getContacts()
    if (contacts) {
      const contactsWithKey = contacts.map( (item, i) => ({ ...item, key: i }))
      setData(contactsWithKey)
    }
  }

  let direccionFactura;
  data && data.map((item) => {
    direccionFactura = item.direccionFacturacion
  })

  if (contact) {
		setTimeout(
			function () {
				getContact()
				contactHook(false)
			}.bind(),
			200
		)
	}

    const columns = [
        {
            title: 'NOMBRE',
            defaultSortOrder: 'descend',
            dataIndex: 'nombreContacto',
            key: 'nombreContacto',
            render: text => <a style={{ textTransform: 'capitalize' }}>{text.toLowerCase()}</a>,
        },
        {
            title: 'CARGO',
            key: 'cargo',
            dataIndex: 'cargo',
            sorter: (a, b) => a.cargo.length - b.cargo.length,
            render: text => <a className={text.length == 13 ? 'text-success' : 'text-primary'}>{text.toUpperCase()}</a>,
        },
        {
            title: 'ACCIONES',
            key: 'action',
            width: 100,
            render: (text, record) => (
                <>
                    {
                        record.siActivo == 1 
                        ?
                            <Space size="large">
                                <EditOutlined className="text-primary" onClick={() => {onEdit(record)}}/>
                                <DeleteOutlined className="text-danger" onClick={() => {onDelete(record) }}/>
                            </Space> 
                        : 
                            <span className="text-muted">Por validar</span>
                    }
                </>
            ),
        },
    ];

    const onDelete = (record) => {
      Modal.confirm({
        title:`¿Seguro desea eliminar al usuario "${record.nombreContacto}"?`,
        okText:"Borrar",
        cancelText:"Cancelar",
        okButtonProps:{ className: 'ant-btn-danger' },
        cancelButtonProps : { style: { background: '#DAD8DB', color: '#666565'}},
        centered: true,
        onOk: async () => {

          let temp = {
            "idContactoAdmin": idcontacto,
            "IdContacto": record.idContacto
          }

          let res = await allServices.postContactsDelete(temp)

          if(res.status === 200) {
            getContact();
            Success(res.data);
          } else {
            MError(res.data);
          }

        }
      })
    }

    const onEdit = (record) => {
      setEdit(true)

      form.setFieldsValue({ 
          ...record,
          fechaNacimiento: moment(record.fechaNacimiento)
      })

      setClaveAntigua(record?.clave)

      getCommune(record.idRegion)
    }

    const resetEDIT = () => {
      setEdit(false);

      setErrorFecha(false);
      setErrorLoading(false);
      setErrorLoadingActual(false);

      form.resetFields();
    }

    const Updateuser = async (e) =>{

        let temp = {
            "idContactoAdmin": idcontacto,
            "idContacto": e.idContacto,
            "eMailContacto": e.eMailContacto,
            "nombreContacto": e.nombreContacto,
            "apellidoPaternoContacto":e.apellidoPaternoContacto,
            "apellidoMaternoContacto":e.apellidoMaternoContacto,
            "celularContacto": e.celularContacto,
            "fechaNacimiento": e.fechaNacimiento.format("DD/MM/YYYY"),
            "idCargo": e.idCargo,
            "sucursal": e.sucursal,
            "clave": e.nuevaclave ? e.nuevaclave : claveAntigua,
            "direccion": e.direccion,
            "idRegion": e.idRegion,
            "idComuna": e.idComuna,
            "ciudad": e.ciudad,
            "localidad": e.localidad,
            "facebook": e.facebook,
            "twitter": e.twitter,
            "instagram": e.instagram,
            "miniSitios": e.miniSitios || [],
        }
        console.log({temp})

        // let res = await allServices.postContactsEdit(temp);

        // if(res.status === 200)
        // {
        //     form.resetFields();
        //     Success('Usuario modificado correctamente')
        //     setEdit(false)
        //     getContact();
        // }
        // else{
        //     MError(res.data);
        // }

    }

    if (cargos && cargos.length > 0) {
      cargos.map(item => {
        if (item.siActivo == 1) {
          let object = {value: item.idCargo, label: item.cargo};
          cargoresult.push(object)
        }
      })
      finalcargoresult = cargoresult
    }

    if (region && region.length > 0) {
      region.map(item => {
        let object = {value: item.idRegion, label: item.region};
        brandresult.push(object)
      })
      finalresultRegion = brandresult
    }

    if(commune && commune.length > 0) {
      commune.map(item => {
        let object = {value: item.idComuna, label: item.comuna};
        regionresult.push(object)
      })
      finalresultCommune = regionresult
    }

    function onChangedate(dateString) {
      // let selectDate = dateString == null ? '' : dateString.format('DD/M/YYYY')
      let ageDifMs = Date.now() - dateString;
      let ageDate = new Date(ageDifMs);
      let validator =  Math.abs(ageDate.getUTCFullYear() - 1970);

      if (validator < 18) {
          setErrorFecha(true)
      } else {
          setTimeout(function() {
              setErrorFecha(false)
          }, 200);
      }
    }

    function validatePasswords(e) {
        e.preventDefault();

        let pass1 = form.getFieldValue('nuevaclave');
        let pass2 = form.getFieldValue('nuevaclave2');

        if (pass1 != pass2) {
            setErrorLoading(true)
        } else {
            setTimeout(function() {
                setErrorLoading(false)
            }, 200);
        }
    }

    function validatePasswordsActual(e) {
        e.preventDefault();
        
        let pass1 = form.getFieldValue('clave');
        let pass2 = e.target.value;

        if (pass1 != pass2) {
            setErrorLoadingActual(true)
        } else {
            setTimeout(function() {
                setErrorLoadingActual(false)
            }, 200);
        }
    }

    const validarrengion = (e) => {

        // Eliminacion de valor comuna al cambiar de región
        form.setFieldsValue({
            ...form.getFieldsValue(),
            idComuna: null,
        })

        getCommune(e)
    }

    useEffect(() => {

      getcargo()
      getContact()
      getRegiones()

    },[direccionFactura])


    return (
        <>
            <div className="row pt-lg-5 mt-lg-4">
                <div className='col-12'>
                  <h4 className="formDetailsTitleMenu" style={{ flex: 1 }}>Usuarios</h4>
                </div>
                <div className='col-12' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <FormNuevoUsuarioMobile admin={idcontacto} invoice={direccionFactura} getContact={getContact} />
                </div>
                
                <div className="col-12">
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 6, showSizeChanger: false,responsive:true }}/>
                    <Modal
                        width={1300}
                        style={{ maxWidth: '95%' }}
                        footer={null}
                        open={edit}
                        onCancel={() => {resetEDIT()}}
                        closeIcon={ <i className="icon-cross icon-close-modal" style={{ fontSize: '25px' }}></i> }
                    >
                        <Form
                            form={form}
                            name='crearUsuario'
                            className="ps-form--account-setting blue"
                            autoComplete="off"
                            layout="vertical"
                            onFinish={Updateuser}
                        >
                            <div className="ps-form__content">
                                <h4 className="formDetailsTitleMenu" style={{ flex: 1, marginBottom: '30px' }}>Modificar contacto</h4>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="ps-form__header" style={{ border: 0, margin: 0, paddingBottom: 0 }}>
                                            <h4 className="formDetailsTitleMenu">Información del Contacto</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Correo electrónico"
                                                name="eMailContacto"
                                                rules={[
                                                    {
                                                        type: 'email',
                                                        message: 'Por favor, ingrese un Email correcto. Ej. mail@mail.com',
                                                    },
                                                    {
                                                        required: true,
                                                        message: 'Campo requerido!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="eMailContacto"
                                                    placeholder="mail@mail.com"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Identificador (rut o alias)"
                                                name="idContacto"
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
                                                    name="rut"
                                                    maxLength="12"
                                                    placeholder="Identificador"
                                                    disabled
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Nombre"
                                                name="nombreContacto"
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
                                                    name="nombreContacto"
                                                    placeholder="Nombre"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Apellido Paterno"
                                                name="apellidoPaternoContacto"
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="apellidoPaternoContacto"
                                                    placeholder="Apellido Paterno"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Apellido Materno"
                                                name="apellidoMaternoContacto"
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="apellidoMaternoContacto"
                                                    placeholder="Apellido Materno"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Numero de Celular"
                                                name="celularContacto"
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Campo requerido!',
                                                }
                                                ]}
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    maxLength={11}
                                                    name="celularContacto"
                                                    placeholder="56912345678"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                        }
                                                    }}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Cargo"
                                                name="idCargo"
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Campo requerido!',
                                                },
                                                ]}
                                            >
                                                <Select
                                                    // instanceId="cargo"
                                                    // defaultValue={selectedOption}
                                                    name="idCargo"
                                                    options={finalcargoresult}
                                                    // isSearchable
                                                    // isClearable
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                className="mb-0"
                                                label="Fecha de nacimiento"
                                                name="fechaNacimiento"
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Campo requerido!',
                                                },
                                                ]}
                                            >
                                                <DatePicker
                                                    style={{ height: '40px !important' }}
                                                    className="form-control"
                                                    onChange={(e) => onChangedate(e)}
                                                    format={dateFormatList}
                                                />
                                            </Form.Item>
                                            {
                                                errorFecha && (
                                                    <div className="text-danger">Debe ser mayor de edad</div>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <Form.Item
                                                label="Facebook"
                                                name="facebook"
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="facebook"
                                                    placeholder="Facebook"
                                                />
                                            </Form.Item>
                                    </div>

                                    <div className="col-12">
                                        <Form.Item
                                                label="Instagram"
                                                name="instagram"
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="instagram"
                                                    placeholder="Instagram"
                                                />
                                            </Form.Item>
                                    </div>

                                    <div className="col-12">
                                            <Form.Item
                                                label="Twitter"
                                                name="twitter"
                                            >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="twitter"
                                                    placeholder="Twitter"
                                                />
                                            </Form.Item>
                                    </div>

                                    <div className="col-12">
                                        <div className="ps-form__header" style={{ border: 0, margin: 0, paddingBottom: 0 }}>
                                            <h4 className="formDetailsTitleMenu">Dirección del Contacto</h4>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Dirección"
                                                name="direccion"
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
                                                    name="direccion"
                                                    placeholder="Dirección"
                                                    // onChange={(e) =>
                                                    //     setForm(pre => {
                                                    //         return {...pre, direccion:e.target.value}
                                                    //     })
                                                    // }
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Región"
                                                name="idRegion"
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
                                                    // isClearable
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                         <Form.Item
                                                label="Comuna"
                                                name="idComuna"
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
                                                    // isSearchable
                                                    // isClearable
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Ciudad"
                                                name="ciudad"
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
                                    
                                    {/* TODO: Toggle Scott */}
                                    {/* {
                                        (cargo === 'Dueño Empresa' || cargo === 'Administrador') && isScott && 
                                            <div className="col-12">
                                                <div className="ps-form__header" style={{ border: 0, margin: 0 }}>
                                                    <h4 className="formDetailsTitleMenu">Acceso Minisitios</h4>
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                                    <label style={{ color: '#003399', fontSize: '16px', fontWeight: '600' }}>Acceso minisitio Scott</label>
                                                    <Switch onChange={() => setScott(!scott)} checked={scott} />
                                                </div>
                                            </div>
                                    } */}

                                    <div className='col-12'>
                                        <div className="ps-form__header" style={{ border: 0, paddingBottom: 0 }}>
                                            <h4 className="formDetailsTitleMenu">Acceso a minisitios</h4>
                                        </div>
                                    </div>

                                    <div className='col-12'>
                                        <Form.Item
                                            name="miniSitios"
                                        >
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                style={{ width: '100%' }}
                                                placeholder="Seleccione los minisitios a los que desea dar acceso"
                                            >
                                                {
                                                    minisitiosEmpresa.map(minisitio => 
                                                        <Option 
                                                            key={minisitio.idMiniSitio}
                                                            value={minisitio.idMiniSitio}
                                                        >
                                                            { minisitio.nombre }
                                                        </Option>
                                                    )
                                                }
                                            </Select>
                                        </Form.Item>
                                    </div>

                                </div>
                                
                                <div className="ps-form__header pt-4" style={{ border: 0, paddingBottom: 0 }}>
                                    <h4 className="formDetailsTitleMenu">Cambio de contraseña</h4>
                                </div>
                                <div className="row">
                                    
                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Contraseña actual"
                                                name="claveInput"
                                                rules={[
                                                {
                                                    required: false,
                                                    message: 'Campo requerido!',
                                                },
                                                ]}
                                            >
                                                <Input.Password
                                                    className="form-control"
                                                    type="text"
                                                    name="clave"
                                                    placeholder="Contraseña"
                                                    onChange={(e) => validatePasswordsActual(e)}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    
                                    <div className='col-12'>
                                        {
                                            errorLoadingActual && (
                                                <div className="className alert alert-danger">
                                                    La contraseña no coincide con la actual
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Contraseña de usuario"
                                                name="nuevaclave"
                                                rules={[
                                                {
                                                    required: false,
                                                    message: 'Campo requerido!',
                                                },
                                                ]}
                                            >
                                                <Input.Password
                                                    className="form-control"
                                                    type="text"
                                                    name="clave"
                                                    placeholder="Contraseña"
                                                    onChange={(e) => validatePasswords(e)}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Repetir Contraseña"
                                                name="nuevaclave2"
                                                rules={[
                                                {
                                                    required: false,
                                                    message: 'Campo requerido!',
                                                },
                                                ]}
                                            >
                                                <Input.Password
                                                    className="form-control"
                                                    type="text"
                                                    name="nuevaclave2"
                                                    placeholder="Repetir Contraseña"
                                                    onChange={(e) => validatePasswords(e)}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        {
                                            errorLoading && (
                                                <div className="className alert alert-danger">
                                                    La contraseña nueva debe coincidir
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer" style={{ border: 0, justifyContent: 'space around', padding: 0 }}>
                                <button type="button" className="btn btn-lg btnCloseMyAccount" onClick={resetEDIT}>Cerrar</button>
                                <Form.Item className="m-0">
                                    <button types="submit" className="btn btn-lg btnSubmitMyAccount"  disabled={errorLoading || errorFecha || errorLoadingActual}>Modificar contacto</button>
                                </Form.Item>
                            </div>

                        </Form>
                    </Modal>
                </div>
            </div>
        </>
    )                               
}
