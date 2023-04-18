import React from 'react';
import ElectronicHeaderActions from '/components/shared/headers/modules/ElectronicHeaderActions';
import SearchHeader from '/components/shared/headers/modules/SearchHeader'
import Link from 'next/link';

export default function HeaderScott(){
  return  (
    <header
        className="header header--standard header--market-place-1"
        id="headerSticky">
        <div className="header__top">
        </div>
        <div className="header__content">
            <div className="container">
                <div className="header__content-left">
                    <Link href="/">
                        <a>
                            <img src="/static/img/slider/andes/logo/Logo-andes-50-wh.png" alt="" width="156" height="32"/>
                        </a>
                    </Link>
                    <div className="menu--product-categories">
                        <div className="menu__toggle">
                            <i className="icon-menu"></i>
                            <span> Shop by Department</span>
                        </div>
                        <div className="menu__content">
                            menu
                        </div>
                    </div>
                </div>
                <div className="header__content-center text-center">
                    <SearchHeader />
                </div>
                <div className="header__content-right">
                    <ElectronicHeaderActions/>
                </div>
            </div>
        </div>
    </header>
)
};
