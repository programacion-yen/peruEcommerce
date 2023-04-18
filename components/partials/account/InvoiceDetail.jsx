import React, { Component } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableNotifications from './modules/TableNotifications';
import Link from 'next/link';
import ProductCart from '../../elements/products/ProductCart';

class InvoiceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const invoiceProducts = [
            {
                id: '6',
                thumbnail: '/static/img/slider/andes/casco2.jpeg',
                title: 'Casco',
                vendor: "Robert's Store",
                sale: true,
                price: '32.000',
                salePrice: '25.000',
                rating: true,
                ratingCount: '4',
                badge: [
                    {
                        type: 'sale',
                        value: '-37%',
                    },
                ],
            },
            {
                id: '7',
                thumbnail: '/static/img/slider/andes/rodillo.jpeg',
                title: 'Rodillo',
                vendor: 'Youngshop',
                sale: true,
                price: '40.000',
                salePrice: '35.000',
                rating: true,
                ratingCount: '5',
                badge: [
                    {
                        type: 'sale',
                        value: '-5%',
                    },
                ],
            },
        ];
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                <div className="ps-section--account-setting">
                                    <div className="ps-section__header">
                                        <h3>
                                            Factura # 500884010 -
                                            <strong>Entrega exitosa</strong>
                                        </h3>
                                    </div>
                                    <div className="ps-section__content">
                                        <div className="row">
                                            <div className="col-md-4 col-12">
                                                <figure className="ps-block--invoice">
                                                    <figcaption>
                                                        Dirección
                                                    </figcaption>
                                                    <div className="ps-block__content">
                                                        <strong>
                                                            Pedro perez
                                                        </strong>
                                                        <p>
                                                            Dirección: mi casa
                                                        </p>
                                                        <p>
                                                            Teléfono: 913-489-1853
                                                        </p>
                                                    </div>
                                                </figure>
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <figure className="ps-block--invoice">
                                                    <figcaption>
                                                        Gastos de envío
                                                    </figcaption>
                                                    <div className="ps-block__content">
                                                        <p>
                                                            Gratis
                                                        </p>
                                                    </div>
                                                </figure>
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <figure className="ps-block--invoice">
                                                    <figcaption>
                                                        Pago
                                                    </figcaption>
                                                    <div className="ps-block__content">
                                                        <p>
                                                            Metodo de pago: Visa
                                                        </p>
                                                    </div>
                                                </figure>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table ps-table--shopping-cart">
                                                <thead>
                                                    <tr>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                        <th className="text-right">Precio</th>
                                                        <th className="text-right">Monto</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {invoiceProducts.map(
                                                        product => (
                                                            <tr
                                                                key={
                                                                    product.id
                                                                }>
                                                                <td>
                                                                    <ProductCart
                                                                        product={
                                                                            product
                                                                        }
                                                                    />
                                                                </td>
                                                                <td>1</td>
                                                                <td className="price text-right">
                                                                    $
                                                                    {
                                                                        product.price
                                                                    }
                                                                </td>
                                                                <td className="price">
                                                                    $
                                                                    {
                                                                        product.price
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default InvoiceDetail;
