import {useState,useEffect} from 'react';
//import Select from 'react-select';
import allServices from '/services/allServices';
import useLogin from '/hooks/useLogin';
// import Select from 'react-select';
import {Select, Input, DatePicker, Form} from 'antd'
// import { Success, Warning } from '/utils/Notificaciones';
// import {getNotificationStyle} from '/utils/utilidades'
import useProducts from '/hooks/useProducts';
import moment from 'moment';
import { Success, MError } from '/utils/Notificaciones';
import { useRouter } from 'next/router';
// import { Loading } from '../elements/Loading';

// closeModalMiPerfil viene de login_page, se usa la primera vez que el usuario inicia sesión para verificar sus datos
const MiPerfil = ({ closeModalMiPerfil }) => {

    const {idcontacto} = useLogin();
    const router = useRouter();

    const {getcargo,cargos,region,getRegiones,commune,getCommune} = useProducts()
    
    const [form] = Form.useForm();
    // const [forms, setForm] = useState('')

    const [errorFecha , setErrorFecha] = useState(false)
    const [errorLoading , setErrorLoading] = useState(false)
    const [errorLoadingActual , setErrorLoadingActual] = useState(false)

    let datos;
    let brandresult = []
    let regionresult = []
    // let regions
    let finalresultRegion = []
    let finalresultCommune = []
    let cargoresult = []
    let finalcargoresult = []

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    const Updateuser = async (e) =>{

        let temp = {
            "idContactoAdmin": idcontacto,
            "idContacto": e.idContacto,
            "eMailContacto": e.eMailContacto,
            "NombreContacto": e.nombreContacto,
            "ApellidoPaternoContacto": e.apellidoPaternoContacto,
            "ApellidoMaternoContacto": e.apellidoMaternoContacto,
            "celularContacto": e.celularContacto,
            "fechaNacimiento": e.fechaNacimiento.format("DD/MM/YYYY"),
            "idCargo": e.idCargo,
            "sucursal": e.sucursal,
            "clave": e.nuevaclave ? e.nuevaclave : e.claveInput,
            "direccion": e.direccion,
            "idRegion": e.idRegion,
            "idComuna": e.idComuna,
            "ciudad": e.ciudad,
            "localidad": e.localidad,
            "facebook": e.facebook,
            "instagram": e.instagram,
            "twitter": e.twitter
        }

        let res = await allServices.postContactsEdit(temp);

        if(res.status === 200)
        {
            Success(res.data);
            if(closeModalMiPerfil) {
                closeModalMiPerfil()
                router.push('/')
            }
        }
        else{
            MError(res.response.data);
        }

    }

    const business = async () =>{
        let business = await allServices.getContact()
        if(business && business.length > 0){
            business.map((item) => {
                datos = item
            })
        }

        form.setFieldsValue({
            ...datos,
            fechaNacimiento: moment(datos.fechaNacimiento)
        })

        getCommune(datos?.idRegion)

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

    if (cargos && cargos.length > 0) {
        cargos.map(item => {
            if (item.siActivo == 1) {
                let object = {value: item.idCargo, label: item.cargo};
                cargoresult.push(object)
            }
        })
        finalcargoresult = cargoresult
    }

    const validarrengion = (e) => {

        // Eliminacion de valor comuna al cambiar de región
        form.setFieldsValue({
            ...form.getFieldsValue(),
            idComuna: null,
        })

        getCommune(e)
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

    useEffect(async() => {
        getcargo()
        business()
        await getRegiones()
    },[])

    return (
        <Form
            form={form}
            name='miPerfil'
            className="ps-form--account-setting blue"
            autoComplete="off"
            layout="vertical"
            onFinish={Updateuser}
        >
            <div className="ps-form__content">
                <div className="row">
                    <div className="col-12">
                        <div className="ps-form__header" style={{ border: 0, margin: 0, paddingBottom: 0 }}>
                            <h4 className="formDetailsTitleMenu">Mi Perfil</h4>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6">
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

                    <div className="col-12 col-sm-6">
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
                                    disabled
                                    // value={dni}
                                    // placeholder="11.111.111-1"
                                    placeholder="Identificador"
                                    // onChange={(e) => valida(e.target.value)}
                                />
                            </Form.Item>
                            {/* {
                                errorRut && (
                                    <div className="text-danger">{errorRut}</div>
                                )
                            } */}
                        </div>
                    </div>

                    <div className="col-12 col-sm-6">
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

                    <div className="col-12 col-sm-6">
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

                    <div className="col-12 col-sm-6">
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

                    <div className="col-12 col-sm-6">
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

                    <div className="col-12 col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                label="Cargo"
                                name="idCargo"
                                rules={[
                                {
                                    required: false,
                                    message: 'Campo requerido!',
                                },
                                ]}
                            >
                                <Select
                                    name="idCargo"
                                    options={finalcargoresult}
                                    value={form?.idCargo}
                                    disabled
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6">
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

                    <div className="col-12 col-sm-6">
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

                    <div className="col-12 col-sm-6">
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

                    <div className="col-12 col-sm-6">
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

                <div className='row'>
                    <div className="col-12">
                        <div className="ps-form__header" style={{ border: 0, margin: 0, paddingBottom: 0 }}>
                            <h4 className="formDetailsTitleMenu">Dirección del contacto</h4>
                        </div>
                    </div>

                    <div className="col-12 col-sm-12">
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

                    <div className="col-12 col-sm-6">
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
                                    // instanceId="regionMiperfil"
                                    // defaultValue={selectedOption}
                                    name="idRegion"
                                    options={finalresultRegion}
                                    onChange={(e) => validarrengion(e)}
                                    // isClearable
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6">
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
                                    // instanceId="communeMiperfil"
                                    // defaultValue={selectedOption}
                                    name="idComuna"
                                    // placeholder="Comuna"
                                    options={finalresultCommune}
                                    // isSearchable
                                    // isClearable
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6">
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

                    <div className="col-12 col-sm-6">
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
                
                <div className="ps-form__header pt-5" style={{ border: 0, paddingBottom: 0 }}>
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

                    <div className="col-12 col-sm-6">
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
                                    name="nuevaclave"
                                    placeholder="Contraseña"
                                    onChange={(e) => validatePasswords(e)}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6">
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

                <Form.Item className="m-0 pt-4">
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button types="submit" className="btn btn-lg btnSubmitMyAccount" disabled={errorLoadingActual || errorLoading || errorFecha}>Actualizar mi perfil</button>
                    </div>
                </Form.Item>
                
            </div>
        </Form>
    );
};

export default MiPerfil