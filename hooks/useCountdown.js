import { useEffect, useState } from 'react';

export const useCountdown = (termino) => {

  // Si expira oferta, retorna vacio
  if( Date.now() > termino ){
    return [ 0, 0, 0, 0]
  }

  const [countDown, setCountDown] = useState(termino - new Date().getTime());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(termino - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [termino]);

  return calculoFecha(countDown);
};

const calculoFecha = (countDown) => {

  const dias = String(Math.floor(countDown / (1000 * 60 * 60 * 24)));
  const horas = String(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, 0);
  const minutos = String(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, 0);
  const segundos = String(Math.floor((countDown % (1000 * 60)) / 1000)).padStart(2, 0);

  return [dias, horas, minutos, segundos];

};
