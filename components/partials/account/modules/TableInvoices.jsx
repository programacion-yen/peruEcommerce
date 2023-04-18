import { Table } from 'antd';
import { FormatNumber } from '/utils/utilidades'

const TableInvoices = ({orders}) => {

    const tableColumn = [
        {
            title: 'Nº FACTURA',
            dataIndex: 'facturas',
            rowKey: 'facturas',
            key: 'facturas',
            render: (text, record) => (
                <>
                    {record.facturas.map((item, key) => {
                        if(item.documento === '0') {
                            return <span key={key}>-</span>
                        } else {
                            return (
                                <span key={key}>{item.documento}</span>
                             );
                        }
                    })}
                </>
            )
        },
        {
            title: 'Nº PEDIDO',
            dataIndex: 'nroDocumento',
            rowKey: 'nroDocumento',
            key: 'nroDocumento',
            render: (text, record) => (
                <span>{record.nroDocumento}</span>
            ),
        },
        {
            title: 'FECHA',
            rowKey: 'fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'MONTO',
            rowKey: 'total',
            dataIndex: 'total',
            key: 'total',
            render: (text, record) => (
                <span className="text-center">{FormatNumber(record.total)}</span>
            ),
        },
        {
            title: 'ESTADO',
            key: 'estado',
            dataIndex: 'estado',
            rowKey: 'estado',
            width: 140,
            render: (text, record) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span 
                        className={
                            record.estado == 'Pagado' ? 'bg-success' 
                            : record.estado == 'Procesado' ? 'bg-primary' 
                            : record.estado == 'No Pagado' ? 'bg-secondary' 
                            : 'bg-danger'
                        }
                        style={{ padding: '1% 15%', color: 'white', borderRadius: '2vw', width: '100%', textAlign: 'center' }}
                    >
                        {record.estado}
                    </span>
                </div>
            ),
        },
    ];

    return (
        <>
            <h3>Facturas</h3>
            <Table
                columns={tableColumn}
                dataSource={orders}
                pagination={{ pageSize: 7, showSizeChanger: false, responsive: true }}
                scroll={{ x: 550 }}
            />
        </>
    );
}

export default TableInvoices;
