export const WidgetContactInfoHorizontal = () => {

  return (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around', marginTop: '10%' }}>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#003399', padding: '10px 50px', borderRadius: '10px' }}>
          <i className="icon-headset iconContact"></i>
          <h3 style={{ color: 'white', margin: 0, fontWeight: 400 }}>Servicio al cliente:</h3>
        </div>

        <div className="servicioContainer">
          <p className="contactP">¿Tienes dudas con tu despacho?</p>
          <p className="contactP">¿Cambios o devoluciones?</p>
          <p className="contactP">¿Problemas con tu factura?</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="contactTelTitle">
          <h4 style={{ color: 'white', margin: 0, fontWeight: 400 }}>Contáctenos a través de los teléfonos:</h4>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '30px', paddingLeft: '5%' }}>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <i className="icon-telephone" style={{ fontSize: '30px', color: '#001E8F', marginRight: '10px' }}></i>
            <p className="contactP">Mesa central: <b>+ 56 2 2650 3100</b></p>
          </div>
          <div style={{ display: 'flex' }}>
            <i className="icon-telephone" style={{ fontSize: '30px', color: '#001E8F', marginRight: '10px' }}></i>
            <p className="contactP">Fono ventas: <b>800 360 371</b></p>
          </div>
        </div>
      </div>
      
    </div>
  )
  
  
}
