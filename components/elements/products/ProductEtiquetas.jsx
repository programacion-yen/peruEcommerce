
export const ProductEtiquetas = ({ etiquetas }) => {

  return (
    <>
      {
        etiquetas && etiquetas.map(({ idMiniSitio }) => {

          return  idMiniSitio === 11 ? <span className="badge bg-dark text-white p-1 mr-3" style={{ fontSize: '10px' }} key={idMiniSitio}>Prime</span>
                : idMiniSitio === 12 ? <span className="badge bg-dark text-white p-1 mr-3" style={{ fontSize: '10px' }} key={idMiniSitio}>Scott</span>
                : idMiniSitio === 13 ? <span className="badge bg-primary text-white p-1" style={{ fontSize: '10px' }} key={idMiniSitio}>Cyber Day</span>
                : idMiniSitio === 14 ? <span className="badge text-white p-1 mr-3" style={{ fontSize: '10px', backgroundImage: 'linear-gradient(to right top, #4fae32, #00a472, #0094a2, #007eb5, #0064a7)',borderRadius: '10%'}} key={idMiniSitio}>Reserva</span>
                : <div key={idMiniSitio} style={{ height: '22px' }}></div>
        })
      }
      
    </>
  )
}
