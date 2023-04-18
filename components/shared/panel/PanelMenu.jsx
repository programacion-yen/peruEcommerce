import React, { Component } from 'react';
import { connect } from 'react-redux';
import useProducts from '/hooks/useProducts';
import { Menu } from 'antd';
import Link from 'next/link';

const { SubMenu } = Menu;
const PanelMenu = ({items}) => {

    const {limpiar} = useProducts()

    function cleanBrands(e) {
        limpiar()
    }
    let rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    /* state = {
        openKeys: [],
    }; */

/*     onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(
            (key) => this.state.openKeys.indexOf(key) === -1
            );
            if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.setState({ openKeys });
            } else {
                this.setState({
                    openKeys: latestOpenKey ? [latestOpenKey] : [],
                });
            }
        }; */

        return (
            <Menu
                mode="inline"
                className="menu--mobile-2">
                {items && items.map((item) => {
                    return (
                        <SubMenu
                            key={item.idGrupo}
                            title={
                                <p>{item.grupo}</p>
                            }>
                            {item.categoria.map((subItem) => (
                                <Menu.Item key={subItem.idCategoria} style={{textTransform: 'capitalize'}} onClick={(e) => cleanBrands(e)}>
                                    <Link href={`/products/catalogo/${item.grupo.toLowerCase()}/${subItem.nombre.toLowerCase()}/${subItem.idCategoria}`}>
                                        <a>{subItem.nombre.toLowerCase()}</a>
                                    </Link>
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    );
                })}
            </Menu>
        );
}
const mapStateToProps = (state) => {
    return state.setting;
};

export default connect(mapStateToProps)(PanelMenu);
