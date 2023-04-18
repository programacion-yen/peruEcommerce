import { useState,useEffect, useContext } from 'react';
// import Select from 'react-select';
import { DatePicker,Form, Input, message, Switch, Table, Select } from 'antd';
// import useLogin from '/hooks/useLogin';
import allServices from '/services/allServices'
import { Success, Warning, MError } from '/utils/Notificaciones';
// import {getNotificationStyle} from '/utils/utilidades'
import useProducts from '/hooks/useProducts';
import Context from '../../context/UserContext';
// import { SoloNumeros } from '/utils/utilidades';

const { Option } = Select;

const FormChangeContactInformation = ({invoice,admin, getContact}) => {
    const [form] = Form.useForm();

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    const [errorLoading , setErrorLoading] = useState(false)
    const [errorFecha , setErrorFecha] = useState(false)
    const [dismiss , setDismiss] = useState()
    const [disabled , setDisabled] = useState('')

    const { getcargo,cargos,region,getRegiones,commune,getCommune } = useProducts()

    const { minisitiosEmpresa } = useContext(Context)

    let brandresult = []
    let regionresult = []
    let finalresultRegion = []
    let finalresultCommune = []
    let cargoresult = []
    let finalcargoresult = []

    let type;

    // const tbMinisitiosColumns = [
    //     {
    //         title: 'Minisitio',
    //         dataIndex: 'nombre',
    //         key: 'nombre',
    //         // render: text => <a style={{ textTransform: 'capitalize' }}>{text.toLowerCase()}</a>,
    //     },
    //     {
    //         title: 'Acceso',
    //         dataIndex: 'idMiniSitio',
    //         key: 'idMiniSitio',
    //         render: (text, record) => <Switch onChange={(e) => onAccesoMinisitioChange(e, text, record)} />
    //     },
    // ]

    // const onAccesoMinisitioChange = (e, text, record) => {
    //     setAccesoMinisitios({
    //         ...accesoMinisitios,
    //         [text]: e
    //     })
    // }

    // const onMinisitioSelected = (arrayIds, selectedOptions) => {
        
    //     if(selectedOptions.length === 0) return setAccesoMinisitios([])

    //     const data = selectedOptions.map(option => ({
    //         idMiniSitio: option.idMiniSitio,
    //         nombre: option.nombre
    //     }))

    //     setAccesoMinisitios(data)

    // }

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
            setDisabled('none')
        } else {
            setTimeout(function() {
                setErrorFecha(false)
                setDisabled('initial')
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
    
    const validationForm = async (e) => {

        const newContact = {
            idContactoAdmin: admin,
            eMailContacto: e.eMailContacto,
            nombreContacto: e.nombreContacto,
            apellidoPaternoContacto:e.apellidoPaternoContacto,
            apellidoMaternoContacto:e.apellidoMaternoContacto,
            celularContacto: e.celularContacto,
            fechaNacimiento: e.fechaNacimiento.format('DD/MM/YYYY'),
            idCargo: e.idCargo,
            sucursal: e.sucursal,
            rut: e.rut,
            clave: e.clave,
            direccion: e.direccion,
            idRegion: e.idRegion,
            idComuna: e.idComuna,
            ciudad: e.ciudad,
            localidad: e.localidad,
            facebook: e.facebook,
            twitter: e.twitter,
            instagram: e.instagram,
            miniSitios: e.miniSitios || []
        };
        console.log({newContact})
        // let res = await allServices.postContactsCreate(newContact);

        // if(res.status === 200)
        // {
        //     form.resetFields();
        //     Success('Usuario creado correctamente')
        //     getContact();
        // }
        // else{
        //     MError('Error al crear el usuario')
        // }
    }

    const onFinishFailed = () => {
        setDismiss()
        message.error('Submit failed!');
    };

    function validatePasswords() {

        let pass1 = form.getFieldValue('clave');
        let pass2 = form.getFieldValue('claverepetir')

        if (pass1 != pass2) {
            setErrorLoading(true)
            setDisabled('none')
        } else {
            setTimeout(function() {
                setDisabled('initial')
                setDismiss('modal')
                setErrorLoading(false)
            }, 200);
        }
    }

    // function valida(e){
    //     let valor = e.replace(/[\.-]/g, "")
    //     e = valor

    //     valor = valor.replace('-','')

    //     let cuerpo = valor.slice(0,-1);
    //     let dv = valor.slice(-1).toUpperCase();

    //     if(cuerpo.length < 7) {
    //         serErrorRut('rut incompleto')
    //         return false
    //     }

    //     e = cuerpo + '-' + dv

    //     let suma = 0;
    //     let multiplo = 2;

    //     for(let i=1;i<=cuerpo.length;i++) {
    //         let index = multiplo * valor.charAt(cuerpo.length - i);
    //         suma = suma + index;
    //         if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    //     }

    //     let dvEsperado = 11 - (suma % 11);

    //     dv = (dv == 'K')?10:dv;
    //     dv = (dv == 0)?11:dv;

    //     if(dvEsperado != dv) {
    //         serErrorRut('rut invalido')
    //         return false
    //     }

    //     if (e) {
    //         serErrorRut('')
    //         return true
    //     }
    // }

    const getData = () => {
        getcargo()
        getRegiones()
    }

    const Close = () => {
        form.resetFields();
    }

    useEffect(() => {
        form.setFieldsValue({
            invoice: invoice,
        });
        if (invoice !== undefined){ return}
        const unsubscribe = getData();
        return unsubscribe;
    }, [invoice]);

    return (
        <>
        {/* <button type="button" className="ps-btn py-3" style={{ paddingRight : '40px !important'  }} data-bs-toggle="modal" data-bs-target="#exampleModal"> */}
        <button type="button" className="btn btnSubmitMyAccount" style={{ marginBottom: '10px', fontSize: '20px', display: 'flex', alignItems: 'center', borderRadius: '8px' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i className='fa fa-plus' style={{ marginRight: '10px', fontSize: '16px'}}></i>Crear Nuevo
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" >
                <div className="modal-content">
                    <div className="modal-header" style={{ border: 0, padding: '15px', paddingBottom: 0, justifyContent: 'flex-end' }}>
                        {/* <h4 className="modal-title" id="exampleModalLabel">Crear usuario</h4> */}
                        
                        <a data-bs-dismiss="modal" aria-label="Close" className="d-flex justify-content-end">
                            <i className="icon-cross icon-close-modal" style={{ fontSize: '2.5rem' }}></i>
                        </a>
                    </div>
                    <div className="modal-body px-4">
                        <Form
                            form={form}
                            name='crearUsuario'
                            className="ps-form--account-setting blue"
                            autoComplete="off"
                            layout="vertical"
                            onFinish={validationForm}
                            onFinishFailed={onFinishFailed}
                        >
                            <div className="ps-form__content">
                                <h4 className="formDetailsTitleMenu" style={{ flex: 1, marginBottom: '30px' }}>Modificar contacto</h4>

                                <div className="row">

                                    {/* Información del contacto */}
                                    <div className='col-6'>
                                        <div className="ps-form__header" style={{ border: 0, margin: 0, paddingBottom: 0 }}>
                                            <h4 className="formDetailsTitleMenu">Información del Contacto</h4>
                                        </div>

                                        <div className='row'>

                                            <div className="col-6">
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

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <Form.Item
                                                        label="Identificador (rut o alias)"
                                                        name="rut"
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
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="col-6">
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

                                            <div className="col-6">
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

                                            <div className="col-6">
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
                                            
                                            <div className="col-6">
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

                                            <div className="col-6">
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
                                                            placeholder='Cargo'
                                                            name="idCargo"
                                                            options={finalcargoresult}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="col-6">
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

                                            <div className="col-6">
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

                                            <div className="col-6">
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

                                            <div className="col-6">
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

                                        </div>

                                    </div>
                                    
                                    {/* Direccion del contacto */}
                                    <div className='col-6'>
                                        <div className="ps-form__header" style={{ border: 0, margin: 0, paddingBottom: 0 }}>
                                            <h4 className="formDetailsTitleMenu">Dirección del Contacto</h4>
                                        </div>

                                        <div className='row'>

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

                                            <div className="col-6">
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
                                                            placeholder='Región'
                                                            name="idRegion"
                                                            options={finalresultRegion}
                                                            onChange={(e) => validarrengion(e)}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="col-6">
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
                                                            placeholder='Comuna'
                                                            name="idComuna"
                                                            options={finalresultCommune}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="col-6">
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

                                            <div className="col-6">
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

                                        </div>
                                        
                                        {/* TODO: Table */}
                                        {/* <Table 
                                            className='blue'
                                            dataSource={[...minisitios, ...minisitios, ...minisitios]} 
                                            columns={tbMinisitiosColumns}  
                                            pagination={false}
                                            scroll={{ y: 224 }}
                                        /> */}

                                        <div className="ps-form__header" style={{ border: 0, paddingBottom: 0 }}>
                                            <h4 className="formDetailsTitleMenu">Acceso a minisitios</h4>
                                        </div>

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
                                
                                <div className="ps-form__header pt-5" style={{ border: 0, paddingBottom: 0 }}>
                                    <h4 className="formDetailsTitleMenu">Creación de contraseña</h4>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Contraseña de usuario"
                                                name="clave"
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Campo requerido!',
                                                },
                                                ]}
                                            >
                                                <Input.Password
                                                    className="form-control"
                                                    type="text"
                                                    name="clave"
                                                    placeholder="Contraseña"
                                                    onChange={validatePasswords}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Repetir Contraseña"
                                                name="claverepetir"
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Campo requerido!',
                                                },
                                                ]}
                                            >
                                                <Input.Password
                                                    className="form-control"
                                                    type="text"
                                                    name="claverepetir"
                                                    placeholder="Repetir Contraseña"
                                                    onChange={validatePasswords}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        {
                                            errorLoading && (
                                                <div className="className alert alert-danger">
                                                    La contraseña no coincide
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer" style={{ border: 0 }}>
                                <button type="button" className="btn btn-lg btnCloseMyAccount" data-bs-dismiss="modal" onClick={Close}>Cerrar</button>
                                <Form.Item className="m-0">
                                    <button types="submit" className="btn btn-lg btnSubmitMyAccount" style={{ pointerEvents: disabled }} data-bs-dismiss={dismiss} disabled={errorLoading || errorFecha}>Crear contacto</button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default FormChangeContactInformation;
