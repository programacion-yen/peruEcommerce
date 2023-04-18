import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { HomeFilled, RightOutlined } from '@ant-design/icons';

const Menus = ({grupos}) => {

    const router = useRouter();

    const redirectHome = () => {
        router.push('/')
    }

    return (
        <ul className="navbar-nav me-auto" style={{ minHeight: '42px' }}>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 30px', cursor: 'pointer' }} onClick={redirectHome}>
                <HomeFilled style={{ fontSize: '16px' }} />
            </div>

            {
                grupos.map(grupo => (
                    <li className={`nav-item dropdown ${grupo.grupo === 'SHIMANO' && 'dropdownShimano'}`} style={{ padding: '.5rem 0', marginRight: '10px' }} key={grupo.idGrupo}>
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: 600 }}>
                            {grupo.grupo}
                        </a>

                        <ul className='dropdown-menu' aria-labelledby="navbarDropdown" style={{ minWidth: '180px' }}>
                            {
                                grupo.categorias.map(categoria => (
                                    <li key={categoria.idCategoria} className='itemCategoria'>
                                        {/* <a className="dropdown-item menuItem" href="#">{ categoria.subCategorias ? `${categoria.categoria} &raquo;`  : categoria.categoria}</a> */}
                                        
                                        {
                                            categoria.subCategorias 
                                                ?
                                                    <>
                                                        <Link href={`/products/catalogo/${grupo.grupo.toLowerCase()}/${categoria.categoria.toLowerCase()}/${categoria.idCategoria}`}>
                                                            <a className="dropdown-item menuItem submenuCategoria" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{categoria.categoria} <RightOutlined style={{ fontSize: '12px' }} /> </a>
                                                        </Link>
                                                        <ul className="dropdown-menu dropdown-submenu">
                                                            {
                                                                categoria.subCategorias.map(subcategoria => (
                                                                    <li key={subcategoria.idSubCategoria}>
                                                                        <Link href={`/products/catalogo/${grupo.grupo.toLowerCase()}/${categoria.categoria.toLowerCase()}/${categoria.idCategoria}/${subcategoria.idSubCategoria}`}>
                                                                            <a className="dropdown-item menuItem">{subcategoria.subCategoria}</a>
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </>
                                                :
                                                    <Link href={`/products/catalogo/${grupo.grupo.toLowerCase()}/${categoria.categoria.toLowerCase()}/${categoria.idCategoria}`}>
                                                        <a className="dropdown-item menuItem">{categoria.categoria}</a>
                                                    </Link>

                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </li>
                ))
            }

            <li className='nav-item' style={{ padding: '.5rem 0', marginRight: '10px' }}>
                <Link href='/blog' passHref>
                    <a className="nav-link" style={{ fontWeight: 600 }}>
                        Blog
                    </a>
                </Link>
            </li>

        </ul>
    );
};

export default Menus;