import React,{useState,useEffect} from 'react';
//import Select from 'react-select';
import allServices from '/services/allServices';
import useLogin from '/hooks/useLogin';
import {Select,Input,notification} from 'antd'
import { Success, Warning } from '/utils/Notificaciones';
import {getNotificationStyle} from '/utils/utilidades'
import useProducts from '/hooks/useProducts';
import { Loading } from '../elements/Loading';

const FormChangeUserInformation = () => {

    const {idcontacto} = useLogin();
    const [errorLoading , setErrorLoading] = useState(false)
    const [isDisabled ,setDisabled] = useState(true)
    const [errorLoadingActual , setErrorLoadingActual] = useState(false)
    const {getcargo,cargos,region,getRegiones,commune,getCommune} = useProducts()
    const [editData, setEditData] = useState(null);
    let datos;
    let brandresult = []
    let regionresult = []
    let regions
    let finalresultRegion = []
    let finalresultCommune = []
    let cargoresult = []
    let finalcargoresult = []
    let type;

    const Updateuser = async (e) =>{
        e.preventDefault();

        let temp ={

            "idContactoAdmin": idcontacto,
            "idContacto": editData.idContacto,
            "clave": editData.clave,
            "eMailContacto": editData.eMailContacto,
            "celularContacto": editData.celularContacto,
            "idCargo": editData.idCargo,
            "direccion": editData.direccion,
            "idRegion": editData.idRegion,
            "idComuna": editData.idComuna,
            "ciudad": editData.ciudad,
            "localidad": editData.localidad,
            "sucursal": editData.sucursal,
            "instagram": editData.instagram,
            "facebook": editData.facebook,
            "twitter": editData.twitter
        }

        let res = await allServices.postContactsEdit(temp);

        if(res.statusText === 'OK')
        {
            type = 'success';
            notification[type]({
                description:
                'Usuario Modificado con éxito',
                style: getNotificationStyle(type),
                duration: 2
            })
        }
        else{

            type = 'error';
            notification[type]({
                description:
                'No se pudo modificar el usuario : ' + res,
                style: getNotificationStyle(type),
                duration: 2
            })
        }

    }

    const business = async () =>{
        let business = await allServices.getContact()
        if(business && business.length > 0){
            business.map((item) => {
                datos = item
            })
        }
        setEditData(datos)
	}

    if (region && region.length > 0) {
        region.map(item => {
            if (item.idRegion == editData?.idRegion) {
                regions = item.region
            }
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


    // const validarrengion = (e) => {
    //     let valor = e == null ? '': e
    //     getCommune(valor)
    // }

    // const validarcomuna = (e) => {
    //     let valor = editData?.idRegion == null ? '': editData?.idRegion
    //     getCommune(valor)
    // }

    function validatePasswords(e) {
        e.preventDefault();
        let pass1 = editData?.clave;
        let pass2 = e.target.value;

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
        let pass1 = editData?.clave;
        let pass2 = e.target.value;

        if (pass1 != pass2) {
            setErrorLoadingActual(true)
            setDisabled(true)
        } else {
            setTimeout(function() {
                setDisabled(false)
                setErrorLoadingActual(false)
            }, 200);
        }
    }

    useEffect(() => {
        getcargo()
        business()
        getRegiones()
    },[])

    return (
        <form className="ps-form--account-setting" onSubmit={Updateuser} autoComplete="off">
            <div className="ps-form__content">
            <h4 className="formDetailsTitleMenu">Mi Perfil</h4>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Correo electrónico</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="mail@mail.com"
                                value={editData?.eMailContacto}
                                onChange={(e) =>
                                    setEditData(pre => {
                                        return {...pre, eMailContacto:e.target.value}
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>RUT</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="11.111.111-1"
                                disabled
                                value={editData?.idContacto}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Nombre de usuario</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Razon social"
                                disabled
                                value={editData?.nombreContacto+ ' '
                                +editData?.apellidoPaternoContacto+ ' '
                                +editData?.apellidoMaternoContacto}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Número de Celular</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="+56912345678"
                                value={editData?.celularContacto}
                                onChange={(e) =>
                                    setEditData(pre => {
                                        return {...pre, celularContacto:e.target.value}
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 ">
                        <div className="form-group d-flex flex-column">
                        <label htmlFor="" className="mb-3 formDetailsTitle" >Cargo</label>
                        <Select
                            showSearch
                            value={editData?.cargo}
                            placeholder="Seleccione cargo"
                            optionFilterProp="children"
                            disabled
                            // onChange={(e) =>
                            //     setEditData(pre => {
                            //         return {...pre, idCargo:e}
                            //     })
                            // }
                            // options={finalcargoresult}
                        >
                        </Select>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle' style={{ marginBottom: '8px' }}>Fecha de nacimiento</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Fecha"
                                value={editData?.fechaNacimiento.slice(0, 10)}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Facebook</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Facebook"
                                    value={editData?.facebook}
                                    onChange={(e) =>
                                        setEditData(pre => {
                                            return {...pre, facebook:e.target.value}
                                        })
                                    }
                                />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Instagram</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Instagram"
                                value={editData?.instagram}
                                onChange={(e) =>
                                    setEditData(pre => {
                                        return {...pre, instagram:e.target.value}
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Twitter</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Twitter"
                                value={editData?.twitter}
                                onChange={(e) =>
                                    setEditData(pre => {
                                        return {...pre, twitter:e.target.value}
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>

                <h4 className="formDetailsTitleMenu">Direcciones</h4>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Dirección de Facturación</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Dirección"
                                disabled
                                value={editData?.direccionFacturacion}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Dirección Particular</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Dirección"
                                disabled
                                value={editData?.direccion}
                                // onChange={(e) =>
                                //     setEditData(pre => {
                                //         return {...pre, direccion:e.target.value}
                                //     })
                                // }
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="" className="mb-3 formDetailsTitle">Región</label>
                            <Select
                                showSearch
                                value={regions}
                                disabled
                                placeholder="Seleccione region"
                                optionFilterProp="children"
                                // onChange={(e) =>
                                //     setEditData(pre => {
                                //         validarrengion(e)
                                //         return {...pre, idRegion:e}
                                //     })
                                // }
                                //options={finalresultRegion}
                            >
                            </Select>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="" className="mb-3 formDetailsTitle">Comuna</label>
                            <Select
                                showSearch
                                value={editData?.comuna}
                                placeholder="Seleccione comuna"
                                optionFilterProp="children"
                                disabled
                                // onChange={(e) =>
                                //     setEditData(pre => {
                                //     console.log(e)
                                //         return {...pre, idComuna:e}
                                //     })
                                // }
                                // onClick={(e) => validarcomuna(e)}
                                // options={finalresultCommune}
                            >
                            </Select>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Ciudad</label>
                            <input
                                className="form-control"
                                type="text"
                                name="ciudad"
                                value={editData?.ciudad}
                                placeholder="Ciudad"
                                disabled
                                // onChange={(e) =>
                                //     setEditData(pre => {
                                //         return {...pre, ciudad:e.target.value}
                                //     })
                                // }
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Localidad</label>
                            <input
                                className="form-control"
                                type="text"
                                name="localidad"
                                value={editData?.localidad}
                                placeholder="Localidad"
                                disabled
                                // onChange={(e) =>
                                //     setEditData(pre => {
                                //         return {...pre, localidad:e.target.value}
                                //     })
                                // }
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Sucursal</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Sucursal"
                                value={editData?.sucursal}
                                disabled
                                // onChange={(e) =>
                                //     setEditData(pre => {
                                //         return {...pre, sucursal:e.target.value}
                                //     })
                                // }
                            />
                        </div>
                    </div>
                </div>

                <h4 className="formDetailsTitleMenu">Cambio de contraseña</h4>
                <div className="row">
                    <div className="col-12">
                        {
                            errorLoadingActual && (
                                <div className="className alert alert-danger">
                                    La contraseña no coincide con la actual
                                </div>
                            )
                        }
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Contraseña actual</label>
                            <Input.Password
                                className="form-control"
                                type="password"
                                name="actual"
                                placeholder="Contraseña actual"
                                onChange={(e) => validatePasswordsActual(e)}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        {
                            errorLoading && (
                                <div className="className alert alert-danger">
                                    La contraseña nueva debe coincide
                                </div>
                            )
                        }
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Nueva contraseña</label>
                            <Input.Password
                                className="form-control"
                                type="password"
                                disabled={isDisabled}
                                placeholder="Contraseña nueva"
                                onChange={(e) =>
                                    setEditData(pre => {
                                        return {...pre, clave:e.target.value}
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="" className='formDetailsTitle'>Repetir contraseña nueva</label>
                            <Input.Password
                                className="form-control"
                                type="password"
                                disabled={isDisabled}
                                placeholder="Contraseña nueva"
                                onChange={(e) => validatePasswords(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-5 d-flex justify-content-end" style={{ paddingRight: '30px'}}>
                <button className="btn btn-lg btnSubmitMyAccount" type="submit">Actualizar Información</button>
            </div>
        </form>
    );
};

export default FormChangeUserInformation;
