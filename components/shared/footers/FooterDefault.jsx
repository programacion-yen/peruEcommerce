import { useEffect, useState } from 'react';
import Link from 'next/link';
// import AutopartBestSaleBrand from '/components/partials/homepage/autopart/AutopartBestSaleBrand'
// import FooterWidgets from './modules/FooterWidgets';
// import FooterLinks from './modules/FooterLinks';
// import { FooterWidgetMobile } from './modules/FooterWidgetMobile';
import { FacebookFilled, InstagramOutlined, YoutubeFilled } from '@ant-design/icons'
import { Button, Form, Input } from 'antd';

export default  function FooterDefault() {

    const submitBoletin = (e) => {
        console.log(e)
    }

    return (
        <footer className="m-0 pt-3" style={{ backgroundColor: '#f9f9f9', borderTop: '1px solid #d6d4d4' }}>

            <div className='row padding-global-home' style={{ maxWidth: '1200px', margin: 'auto', marginTop: '20px' }}>
 
                <div className='col-12 col-md-4 mb-4'>
                    <h4 style={{ borderBottom: '1px solid #dadada', paddingBottom: '4px' }}>
                        <span style={{ borderBottom: '3px solid #fee01e', paddingBottom: '4px' }}>PRODUCTOS</span>
                    </h4>

                    <p className='mb-1'>Descuentos</p>
                    <p className='mb-1'>Nuevos productos</p>
                    <p className='mb-1'>Productos más vendidos</p>
                </div>

                <div className='col-12 col-md-4 mb-4'>
                    <h4 style={{ borderBottom: '1px solid #dadada', paddingBottom: '4px' }}>
                        <span style={{ borderBottom: '3px solid #fee01e', paddingBottom: '4px' }}>MÁS INFORMACIÓN</span>
                    </h4>

                    <p className='mb-1'>Políticas de armados</p>
                    <p className='mb-1'>Contáctenos</p>
                    <a href='https://lbreclamaciones.bestbikes.com.pe' target='_blank'>
                        <p className='mb-1'><img src='/logo/LibroDeReclamaciones.svg' height='30px' />Libro de Reclamaciones</p>
                    </a>
                </div>

                <div className='col-12 col-md-4 mb-4'>
                    <h4 style={{ borderBottom: '1px solid #dadada', paddingBottom: '4px' }}>
                        <span style={{ borderBottom: '3px solid #fee01e', paddingBottom: '4px' }}>CONTACTO</span>
                    </h4>

                    <p className='mb-1'>BEST BIKES & FITNESS</p>
                    <p className='mb-1'>Tienda Miraflores: Av. Santa Cruz 535</p>
                    <p className='mb-1'>WhatsApp: Información: 977526039 |</p>
                    <p className='mb-1'>Ventas en tienda: 942791196</p>
                    <p className='mb-1'>Email: info@bestbikes.com.pe</p>
                </div>

            </div>

            <div className='padding-global-home' style={{ maxWidth: '1200px', margin: 'auto' }}>
                <hr  />
                <div className='row' style={{ display: 'flex', alignItems: 'center', marginTop: '24px', justifyContent: 'space-between' }}>
                    
                    <div className='col-12 col-md-8'>
                        <div className='row' style={{ justifyContent: 'center' }}>

                            <div className='col-12 col-sm-2'>
                                <h4 style={{ textAlign: 'center', marginTop: '5px' }}><span>BOLETÍN</span></h4>
                            </div>

                            <div className='col-12 col-sm-9'>
                                <Form
                                    name='footerBoletin'
                                    onFinish={submitBoletin}
                                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                                >
                                    <Form.Item
                                        name='email'
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Por favor, ingrese un email correcto.',
                                            },
                                            {
                                                required: true,
                                                message: 'Debe ingresar su email',
                                            },
                                        ]}
                                    >
                                        <Input style={{ minWidth: '230px' }} />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#fee01e', borderColor: '#fee01e', color: 'black' }}>
                                            Suscribirse
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>

                    <div className='col-12 col-md-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
                        <h4 className='m-0'><span>Síguenos</span></h4>
                        <Link href='https://www.facebook.com/Bestbikesperu/' target='_blank'><FacebookFilled style={{ fontSize: '3rem', color: '#3765a3' }} /></Link>
                        <Link href='https://www.facebook.com/Bestbikesperu/' target='_blank'><YoutubeFilled style={{ fontSize: '3rem', color: '#e42526' }} /></Link>
                        <Link href='https://www.facebook.com/Bestbikesperu/' target='_blank'><div style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 100%)', borderRadius: '6px' }}><InstagramOutlined style={{ fontSize: '2.3rem', color: 'white', padding: '3px' }} /></div></Link>
                    </div>
                </div>
            </div>

            <hr />
            <p style={{ padding: '0 20px', textAlign: 'center' }}>© Copyright 2022 BEST BIKES & FITNESS. All Rights Reserved.</p>

        </footer>
    )
};

