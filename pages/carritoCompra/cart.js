import { ShoppingCartOutlined } from '@ant-design/icons';
import React,{useEffect} from 'react'
import CarritoCompra from '/components/CarritoCompra/Cart'
import BreadCrumb from '/components/elements/BreadCrumb';
import useGlobal from '/hooks/useGlobal'
import useProducts from '/hooks/useProducts';

export default function Cart() {
    const {isActive, activehook,keywordhook} = useGlobal();
	const {limpiar} = useProducts()

    useEffect(() => {
        if(isActive){
			activehook(false);
            keywordhook('')
            limpiar()
		}
    }, []);

    const breadCrumb = [
        {
            text: 'Inicio',
            url: '/',
        },
        {
            text: 'Carrito',
        },
    ];

	return (
        <>
            <BreadCrumb breadcrumb={breadCrumb} />
            <div className="ps-section--shopping ps-shopping-cart pt-5 d-flex justify-content-center">
                <div className="col-sm-12 col-md-12 col-lg-12" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='col-12 col-md-8'>
                            <h4 className='cartTitle'>INFORMACIÓN IMPORTANTE</h4>
                            <p className='cartSubTitle'>
                                Estimado cliente, recuerde que siempre debe confirmar los precios con su ejecutivo(a) de ventas.
                                Es posible que algunos productos que usted compre presenten algunas diferencias con la imagen 
                                de nuestro sitio web por motivos externos. Si eso sucede, y no está conforme con su compra, 
                                usted puede pedir una devolución del valor del producto con su ejecutivo de ventas.
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h4 className="formDetailsTitleMenu cartTitleMenu col-11 col-md-8">
                            Carrito de Compras <img src='/logo/shopping-cart-wh.svg' height='40px' style={{ marginLeft: '10px'}} />
                        </h4>
                    </div>
                    
                    <div>
                        <CarritoCompra />
                    </div>
                    
                </div>
            </div>
        </>
	)
}