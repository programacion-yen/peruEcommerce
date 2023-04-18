import React from 'react';
import Link from 'next/link';
import {  Result, Button  } from 'antd';
import FooterDefault from '/components/shared/footers/FooterDefault';
// import HeaderMarketPlace from '/components/shared/headers/HeaderMarketPlace';

export default function Error() {
    return (
        <div className="site-content">
            <div className="ps-page--404">
                <div className="container">
                    <div className="ps-section__content">
                        <Result
                            status="404"
                            title="404"
                            subTitle="Lo sentimos, la página que visitaste no existe."
                            extra={<Button type="primary">Volver al Inicio</Button>}
                        />,
                    </div>
                </div>
            </div>
            <FooterDefault />
        </div>
    );
}
