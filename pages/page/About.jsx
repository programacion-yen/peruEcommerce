import BreadCrumb from '/components/elements/BreadCrumb';
import ReactPlayer from 'react-player'

const breadCrumb = [
    {
        text: 'Inicio',
        url: '/',
    },
    {
        text: 'Políticas De Privacidad Y Aviso Legal',
    },
];

const About = () => (
    <>
        <BreadCrumb breadcrumb={breadCrumb} />
        <div className="pt-5">
            <div className="container" style={{backgroundColor:'#F1F1F1'}}>

                <div className='pt-5 text-center'>
                    <h2 style={{ color:'#003399' }} className='text-center'>ANDES INDUSTRIAL</h2>
                </div>
                    
                <div className="row">
                    <div className="col-12 col-sm-4">
                        <img src="/static/img/slider/andes/img_historia.png" width='400' className='img-fluid my-5' alt="" />
                    </div>
                    <div className="col-12 col-sm-8">
                        <div className="py-4 pr-5">
                            
                            <p>
                                Nació a la vida comercial en abril de 1978 y por lo tanto podemos decir con orgullo y propiedad que somos una de las 
                                empresas pioneras en el desarrollo de la actividad comercial de partes y piezas de bicicletas.
                            </p>
                            <p>
                                Desde esta fecha nos hemos consolidado en el mercado como una empresa en constante desarrollo y crecimiento, lo cual ha contribuido 
                                a ser considerada una de las principales en el rubro.
                            </p>
                            <p>
                                Lo anterior no habría sido posible, sin la colaboración y preferencia de nuestros leales clientes.
                            </p>
                            <p>
                                Atte.,
                                Andes Industrial Ltda.
                            </p>
                        </div>
                    </div>
                    <div className="w-100"></div>
                    <div className="col-12 col-sm-12 p-0">
                        <ReactPlayer url='https://www.youtube.com/watch?v=_Zo6EXeb6Xc' width='100%' height='420px'/>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default About;
