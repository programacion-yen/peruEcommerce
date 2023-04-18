export const WidgetContactInfo = () => {
  return (
    <div style={{ maxWidth: '450px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#003399', padding: '10px 50px', borderRadius: '10px' }}>
        <i className="icon-headset" style={{ color: 'white', fontSize: '30px', paddingRight: '10px' }}></i>
        <h3 style={{ color: 'white', margin: 0, fontWeight: 400 }}>Servicio al cliente:</h3>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: '30px 0', paddingLeft: '10%' }}>
        <p style={{ fontSize: '18px' }}>¿Tienes dudas con tu despacho?</p>
        <p style={{ fontSize: '18px' }}>¿Cambios o devoluciones?</p>
        <p style={{ fontSize: '18px' }}>¿Problemas con tu factura?</p>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#003399', padding: '10px', borderRadius: '10px' }}>
        <h4 style={{ color: 'white', margin: 0, fontWeight: 400, fontSize: '16px' }}>Contáctenos a través de los teléfonos:</h4>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '20px', paddingLeft: '6%' }}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <i className="icon-telephone" style={{ fontSize: '30px', color: '#001E8F', marginRight: '10px' }}></i>
          <p style={{ margin: 0, fontSize: '18px'}}>Mesa central: <b>+ 56 2 2650 3100</b></p>
        </div>
        <div style={{ display: 'flex' }}>
          <i className="icon-telephone" style={{ fontSize: '30px', color: '#001E8F', marginRight: '10px' }}></i>
          <p style={{ margin: 0, fontSize: '18px'}}>Fono ventas: <b>800 360 371</b></p>
        </div>
      </div>
    </div>
  )
}
