import React from 'react';
import Link from 'next/link';
import { FormatoPalabras } from '/utils/utilidades';

const FooterLinks = ({items}) => {

  let group;
  let categoriesName;
  let nameGroup;
  if (items && items.length > 0) {
      group = items.map((item,key) =>{
        categoriesName = item.categoria.map((data,key) => {
              nameGroup = item.grupo.toLowerCase();
              return <Link key={key} href={`/products/catalogo/${nameGroup}/${data.nombre.toLowerCase()}/${data.idCategoria}`}>
                        <a>{FormatoPalabras(data.nombre)}</a>
                    </Link>
        });
        return <p key={key}><Link href={`/products/catalogo/${item.grupo.toLowerCase()}/${item.idGrupo}`}>
                    <a><strong style={{textTransform: 'capitalize'}}>{item.grupo.toLowerCase()} : </strong></a>
                </Link>
            {categoriesName}
          </p>
      })
  }

    return (
      <div className="ps-footer__links">
        {group}
      </div>
    );
};

export default FooterLinks;


