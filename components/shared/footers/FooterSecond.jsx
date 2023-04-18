import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FooterSecond = ({ classes }) => (
    <footer className={`ps-footer ps-footer--2 ${classes}`}>
        <div className="container">
            <div className="ps-footer__content">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">
                                        Quick links
                                    </h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <a>Policy</a>
                                        </li>
                                        <li>
                                            <a>Term & Condition</a>
                                        </li>
                                        <li>
                                            <a>Shipping</a>
                                        </li>
                                        <li>
                                            <a>Return</a>
                                        </li>
                                        <li>
                                            <a>FAQs</a>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Company</h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <a>About Us</a>
                                        </li>
                                        <li>
                                            <a>Affilate</a>
                                        </li>
                                        <li>
                                            <a>Career</a>
                                        </li>
                                        <li>
                                            <a>Contact</a>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Bussiness</h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <a>Our Press</a>
                                        </li>
                                        <li><a>Checkout</a>
                                        </li>
                                        <li><a>My account</a>
                                        </li>
                                        <li><a>Shop</a>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <aside className="widget widget_newletters">
                            <h4 className="widget-title">Newsletter</h4>
                            <form
                                className="ps-form--newletter"
                                action="#"
                                method="get">
                                <div className="form-group--nest">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email Address"
                                    />
                                    <button className="ps-btn">
                                        Subscribe
                                    </button>
                                </div>
                                <ul className="ps-list--social">
                                    <li>
                                        <a className="facebook">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="twitter">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="google-plus">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="instagram">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </form>
                        </aside>
                    </div>
                </div>
            </div>
            <div className="ps-footer__copyright">
                <p>&copy;2021 Martfury. All Rights Reserved</p>
                <p>
                    <span>We Using Safe Payment For:</span>
                        <a>
                            <Image
                                src="/static/img/payment-method/1.jpg"
                                alt="martfury"
                                width="200" height="200"
                            />
                        </a>
                    
                        <a>
                            <Image
                                src="/static/img/payment-method/2.jpg"
                                alt="martfury"
                                width="200" height="200"
                            />
                        </a>
                    
                        <a>
                            <Image
                                src="/static/img/payment-method/3.jpg"
                                alt="martfury"
                                width="200" height="200"
                            />
                        </a>
                    
                        <a>
                            <Image
                                src="/static/img/payment-method/4.jpg"
                                alt="martfury"
                                width="200" height="200"
                            />
                        </a>
                    
                        <a>
                            <Image
                                src="/static/img/payment-method/5.jpg"
                                alt="martfury"
                                width="200" height="200"
                            />
                        </a>
                    
                </p>
            </div>
        </div>
    </footer>
);

export default FooterSecond;
