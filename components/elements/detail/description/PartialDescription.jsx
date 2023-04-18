import React from 'react';
import parse from 'html-react-parser'

export default function PartialDescription(detail) {
    let specification = '';

    if (detail.detail && detail.detail.length > 0) {
        detail.detail.map((item) => {
            specification = item.descripcion == undefined ? '' : item.descripcion
        })
    }

    return (
        <div className="row">
        {specification !== '' &&
            <div className="col-12"
                style={{
                    height: 650,
                    overflow: 'auto',
                }}>
                {/* <p> */}
                    {parse(specification)}
                {/* </p> */}
            </div>
        }
        </div>
    );
};


