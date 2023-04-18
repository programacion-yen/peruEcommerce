import Link from 'next/link';

export default function MarketPlacePromotionHeader({items}){

    return (
        <>
            <div className="ps-block--promotion-header bg--cover p-0"
              style={{
                  backgroundImage: 'url(/static/img/slider/andes/header-scott-v2.png)',
                  height: `50px`,
              }}>
              <div className="container col-xl-8 padding-global-home" style={{ maxWidth: '1200px' }}>
                <div style={{ display: 'flex' }}>
                  {
                    items &&
                      items.map((item, key) => {
                        // return <div onClick={() => onMinisitioClick(item.idMiniSitio)} key={key} style={{ maxHeight: '50px' }}>
                        return <div key={key} style={{ maxHeight: '50px' }}>
                                  <Link href={`/miniSitios${item.url ? `/${item.url}` : ''}/${item.idMiniSitio}`} passHref>
                                        {/* <span> */}
                                            <a>
                                              <img src={item.logo} alt={item.nombre} width="100" height="50" style={{objectFit: 'cover', padding: '0 5%'}} />
                                            </a>
                                        {/* </span> */}
                                  </Link>
                              </div>
                      })
                  }
                </div>
              </div>
            </div>
        </>
    )
}
