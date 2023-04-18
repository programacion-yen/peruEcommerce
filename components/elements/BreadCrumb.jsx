import React from 'react';
import Link from 'next/link';
// style={{ maxWidth: '1200px', paddingTop: '20px', paddingBottom: '20px' }}
const BreadCrumb = ({ breadcrumb, layout }) => {
    return (
        <div className="ps-breadcrumb" style={{ }}>
            <div
                // className={
                //     layout === 'fullwidth' ? 'ps-container' : 'container'
                // }
                className='padding-global-home'
                style={{ maxWidth: '1200px', margin: 'auto' }}
            >
                <ul className="breadcrumb" style={{ paddingLeft: '5px' }}>
                    {breadcrumb.map((item, key) => {
                        if (!item.url) {
                            return <li key={key} style={{textTransform: 'capitalize'}}>{item.text}</li>;
                        } else {
                            return (
                                <li key={key}>
                                    <Link href={item.url}>
                                        <a style={{textTransform: 'capitalize'}}>{item.text}</a>
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </div>
    );
};

export default BreadCrumb;
