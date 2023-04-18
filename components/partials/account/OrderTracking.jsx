import React,{useState,useEffect} from 'react'
import { Table,List,Alert } from 'antd';
import allServices from '../../../services/allServices';
import { FormatNumber} from '/utils/utilidades'

const OrderTracking = ({orders}) => {
    const [facturaN , setFacturaN] = useState(); //el id de fatura que tiene ordenes
	const [factura, setFactura] = useState();
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState()

    const getFactura = async (nrFactura, year) =>{
        let facturas = await allServices.getFacturas(nrFactura, year);
        if(facturas){
            setFactura(facturas)
        }
	}

    const onVerDetalle = (item) => {
        setPedidoSeleccionado(item)
    }

    const columns = [
        {
            title: 'Nº FACTURA',
            dataIndex: 'documento',
            key: 'documento',
			width: 130,
            render: (text, record) => {
                if(record.documento !== '0'){
                    return <button className="ps-btn-yellow" data-bs-target={`#df${facturaN}`} data-bs-toggle="modal" data-bs-dismiss="modal" id={record.documento} onClick={(e) => {Invoices(e.target.id)}}>{record.documento}</button>
                } else {
                    return <p style={{ margin: 0 }}>-</p>
                }
            }
            
        },
        {
            title: 'PDF',
            dataIndex: 'name',
            key: 'name',
            // TODO: Redirect a pdf
            // render: text => <a>Link pdf</a>,
        },
        {
            title: 'FECHA',
            key: 'fecha',
            dataIndex: 'fecha',
        },
        {
            title: 'TOTAL',
            key: 'monto',
			dataIndex: 'monto',
            // width: 100,
            render: text => <p style={{ margin: 0 }}>{FormatNumber(text)}</p>
        },
    ];

    const columnsFactura = [
        {
            title: 'CODIGO',
            dataIndex: 'idArticulo',
            key: 'idArticulo',
            width: 100,
            render : (text) => (
                <p key={text}>{text}</p>
            )
        },
        {
            title: 'NOMBRE',
            dataIndex: 'nombre',
            key: 'nombre',
            render : (text) => (
                <p key={text}>{text}</p>
            )
        },
        {
            title: 'CANTIDAD',
            key: 'cantidad',
            dataIndex: 'cantidad',
            width: 150,
            render : (text) => (
                <p key={text}>{text}</p>
            )
        },
        {
            title: 'TOTAL',
            key: 'precioVenta',
			dataIndex: 'precioVenta',
            width: 150,
            render : (text) => (
                <p key={text}>{FormatNumber(text)}</p>
            )
        },
    ];

    const Invoices = async (fact) =>{
        setFacturaN(fact);
        let rep = fact.replace(/[A-Z]/,'');
        let year;

        orders.map((item) =>{
            item.facturas.map((item2) =>{
                if(fact == item2.documento){
                    let y = item.fecha;
                    let a = y.split('/');
                    year = a[2];
                }
            })
        })

        await  getFactura(rep, year);
    }
   
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                showSizeChanger: false,
                pageSize: 4,
                responsive:true
            }}
            locale={{ emptyText:
                <Alert
                className="text-info"
                description="No existen ordenes para mostrar."
                type="info"
                showIcon
                />
            }}
            dataSource={orders}
            renderItem={item => (
                <List.Item>
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <h5 className="mb-1">Pedido N°: {item.nroDocumento}</h5>
                            <div className="row" style={{ padding: '15px 0' }}>
                                <div className="col-2 col-sm-2 text-center" style={{ margin: 'auto', padding: '0 2%' }}>
                                
                                {
                                    item.proceso == 'Autorizado' ? <img src='/logo/pedidos/autorizado.svg' height='45px'  />
                                    : item.proceso == 'Despachado' ? <img src='/logo/pedidos/despachado.svg' height='45px' />
                                    : item.proceso == 'Entregado' ? <img src='/logo/pedidos/entregado.svg' height='45px' />
                                    : item.proceso == 'Facturado' ? <img src='/logo/pedidos/facturado.svg' height='45px' />
                                    : item.proceso == 'Preparando' ? <img src='/logo/pedidos/preparando.svg' height='45px' />
                                    : item.proceso == 'Recibido' ? <img src='/logo/pedidos/recibido.svg' height='45px' />
                                    : <></>
                                }

                                </div>
                                <div className="col-10 col-sm-7">
                                    <div className="d-flex" style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                                        <p className="m-0">Estado <br/>
                                            <strong>{item.proceso}</strong>
                                        </p>
                                        <p className="m-0">Cantidad de facturas: {item.facturas.length}
                                            <br/>
                                            Fecha : {item.fecha}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-3 col-md-3 verDetalleOrdenBtn" style={{ margin: 'auto' }}>
                                    <div className="modal fade" id={`p${item.nroDocumento}`} aria-hidden="true" aria-labelledby='exampleModalToggleLabel' tabIndex="-1">
                                        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth : '1200px' }}>
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="pl-4 pt-4">Detalle de pedido</h4>
                                                <a data-bs-dismiss="modal" aria-label="Close" className="">
                                                    <i className="icon-cross icon-close-modal"></i>
                                                </a>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="bg-light">
                                                            <div className="row px-5 pb-5">

                                                                <div className="col-6 col-sm-2 p-3">ID Pedido :</div>
                                                                <div className="col-6 col-sm-2 p-3">{pedidoSeleccionado ? pedidoSeleccionado.nroDocumento : ''}</div>
                                                                <div className="col-6 col-sm-1 p-3">Fecha :</div>
                                                                <div className="col-6 col-sm-3 p-3">{pedidoSeleccionado ? pedidoSeleccionado.fecha : ''}</div>
                                                                <div className="col-6 col-sm-1 p-3">Estado:</div>
                                                                <div className="col-6 col-sm-2 p-3">{pedidoSeleccionado ? pedidoSeleccionado.estado : ''}</div>

                                                                <div className="w-100"></div>

                                                                <div className="col-6 col-sm-2 p-3">Cant. Facturas :</div>
                                                                <div className="col-6 col-sm-2 p-3">{ pedidoSeleccionado ? pedidoSeleccionado.facturas.length : 0}</div>
                                                                <div className="col-6 col-sm-2 p-3">Descuento :</div>
                                                                <div className="col-6 col-sm-2 p-3 text-start"><strong>{pedidoSeleccionado ? pedidoSeleccionado.porcentajeDescuento : ''} %</strong></div>
                                                                <div className="col-6 col-sm-1 p-3">Total : </div>
                                                                <div className="col-6 col-sm-2 p-3"><strong>{pedidoSeleccionado ? FormatNumber(pedidoSeleccionado.total) : ''}</strong></div>

                                                                <div className="w-100"></div>

                                                                <div className="w-100"></div>

                                                                <div className="col-6 col-sm-2 p-3">Total Facturado : </div>
                                                                <div className="col-6 col-sm-2 p-3"><strong>{pedidoSeleccionado ? FormatNumber(pedidoSeleccionado.totalFacturas): ''}</strong></div>
                                                            </div>
                                                            <div className="table-responsive">
                                                                {
                                                                    pedidoSeleccionado &&
                                                                        <Table columns={columns} dataSource={pedidoSeleccionado.facturas} pagination={false}  scroll={{ x: true }} rowKey={pedidoSeleccionado.facturas.documento} />
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                                <button type="button" className="ps-btn-yellow p-4 text-uppercase fs-6" data-bs-dismiss="modal">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal fade" id={`df${facturaN}`} aria-hidden="true" aria-labelledby={`f${item.nroDocumento}`} tabIndex="-1" >
                                        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" style={{ widht: '80vw', maxWidth: '1200px'}}>
                                            <div className="modal-content">
                                                <div className="modal-header text-center">
                                                    <h4 className="modal-title" id={`f${item.nroDocumento}`}>Factura {facturaN}</h4>
                                                    <a data-bs-dismiss="modal" aria-label="Close">
                                                        <i className="icon-cross"></i>
                                                    </a>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="table-responsive">
                                                        {
                                                            factura &&
                                                                <Table columns={columnsFactura} dataSource={factura[0].detalle} pagination={false}  scroll={{ x: 1000, y: 650 }} rowKey={factura.nroFactura} />
                                                        }
                                                    </div>
                                                </div>
                                                <button className="ps-btn-yellow btn-lg p-4" data-bs-target={`#p${item.nroDocumento}`} data-bs-toggle="modal" data-bs-dismiss="modal">VOLVER AL PEDIDO</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <a className="ps-btn-yellow" data-bs-toggle="modal" href={`#p${item.nroDocumento}`} role="button" onClick={() => onVerDetalle(item)}>Ver Detalle</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </List.Item>
            )}
        />

	);
};

export default OrderTracking;
