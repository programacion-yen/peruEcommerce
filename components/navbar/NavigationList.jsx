import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
 import PanelMenu from '/components/shared/panel/PanelMenu';
import PanelCartMobile from '/components/shared/panel/PanelCartMobile'
import Wishlist from '/components/partials/account/Wishlist';

class NavigationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuDrawer: false,
            cartDrawer: false,
            favoriteDrawer: false,
            categoriesDrawer: false,
        };
        // //console.log(this.state)
    }

    handleDrawerClose = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: false,
            favoriteDrawer: false,
            categoriesDrawer: false,
        });
    };

    handleShowMenuDrawer = () => {
        this.setState({
            menuDrawer: !this.state.menuDrawer,
            cartDrawer: false,
            favoriteDrawer: false,
            categoriesDrawer: false,
        });
    };

    handleShowCartDrawer = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: !this.state.cartDrawer,
            favoriteDrawer: false,
            categoriesDrawer: false,
        });
    };
    handleShowFavoriteDrawer = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: false,
            favoriteDrawer: !this.state.favoriteDrawer,
            categoriesDrawer: false,
        });
    };

    render() {
        const {
            menuDrawer,
            favoriteDrawer,
            cartDrawer,
        } = this.state;

        return (
            <div>
            {/* <div className="navigation--list"> */}
                {/* <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.menuDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Menu</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelMenu items={this.props.items}/>
                        </div>
                    </div>
                </Drawer>
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.cartDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Carro de Compra</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelCartMobile />
                        </div>
                    </div>
                </Drawer>
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.favoriteDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Lista de Favoritos</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content mt-5">
                            <Wishlist />
                        </div>
                    </div>
                </Drawer>
                <div className="navigation__content">
                    <a
                        className={`navigation__item ${
                            menuDrawer === true ? 'active' : ''
                        }`}
                        onClick={this.handleShowMenuDrawer}>
                        <i className="icon-menu"></i>
                        <span> Menu</span>
                    </a>
                    <a
                        className={`navigation__item ${
                            favoriteDrawer === true ? 'active' : ''
                        }`}
                        onClick={this.handleShowFavoriteDrawer}>
                        <i className="icon-heart"></i>
                        <span> Lista de Favoritos</span>
                    </a>
                    <a
                        className={`navigation__item ${
                            cartDrawer === true ? 'active' : ''
                        }`}
                        onClick={this.handleShowCartDrawer}>
                        <i className="icon-box"></i>
                        <span>Carrito</span>
                    </a>
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.setting;
};
export default connect(mapStateToProps)(NavigationList);
