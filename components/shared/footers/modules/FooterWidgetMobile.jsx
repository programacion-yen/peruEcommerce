import Link from 'next/link';
import { Collapse } from 'antd';

import useLogin from '/hooks/useLogin';

const { Panel } = Collapse;

export const FooterWidgetMobile = () => {

  const { isLogged } = useLogin()

  return (
    <>
      <Collapse style={{ fontSize: '18px' }} expandIconPosition='end' ghost>
        <Panel header="Corporativo" key="1" >
          <p>
            <Link href="/page/Blank">
              <a rel="noreferrer">
                Políticas De Privacidad Y Aviso Legal
              </a>
            </Link>
          </p>

          <p>
            <Link href='https://share-eu1.hsforms.com/1uV7Och3xTVWaqiY7JLABMwf0z6w'>
              <a target='_blank'>
                Servicio Al Cliente
              </a>
            </Link>
          </p>
          

          {
            !isLogged &&
              <p>
                <Link href="/cuenta/solicitudRegistro">
                  <a>Regístrate</a>
                </Link>
              </p>
          }
          {
            !isLogged &&
              <p>
                {/* <Link href="/cuenta/solicitudRegistro"> */}
                  <a>Recuperar Contraseña</a>
                {/* </Link> */}
              </p>
          }
          <p>
            <Link href="/page/About">
              <a rel="noreferrer">
                Nuestra Empresa
              </a>
            </Link>
          </p>
          {/* <p>
            Trabaja con nosotros
          </p> */}
        </Panel>
      </Collapse>

      <hr style={{ borderBottom: '1px solid black' }} />

      <div className='row'>
        <p style={{ flex: 1, textAlign: 'center', margin: 0, fontSize: '16px' }}>Nuestras redes sociales</p>
        <div className='col-12 socialDiv'>
          <ul className="ps-list--social">
            <li>
              <Link href="https://www.facebook.com/AndesIndustrial/">
                <a className="facebook" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook-square text-muted"></i>
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/andesindustrial/">
                <a className="instagram"  target="_blank" rel="noreferrer">
                  <i className="fa fa-instagram text-muted"></i>
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/c/AndesIndustrialLtda">
                <a className="youtube"  target="_blank" rel="noreferrer">
                  <i className="fa fa-youtube-square text-muted"></i>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
    
  )
}