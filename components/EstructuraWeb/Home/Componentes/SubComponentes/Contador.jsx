import React from 'react'
import { useCountdown } from '../../../../../hooks/useCountdown';

const Contador = ({ inicio = '2022-01-01T00:00:00', termino, color }) => {

  const fechaInicio = new Date(inicio).getTime();
  const fechaTermino = new Date(termino).getTime();
  const [dias, horas, minutos, segundos] = useCountdown(fechaTermino);  

  // Oferta todavia no empieza
  if( fechaInicio > Date.now() ){
    return 
  }

  return (
    <div className='contadorDiv' style={{ backgroundColor: color }}>
      <p className='contadorText'>
        {
          (dias + horas + minutos + segundos > 0)
          ? (`Termina en: ${dias}:${horas}:${minutos}:${segundos}`)
          : 'Expirado'
        }
      </p>
    </div>
  )
}

export default Contador;