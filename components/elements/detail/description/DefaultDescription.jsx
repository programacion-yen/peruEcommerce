import React from 'react';
import { Tabs } from 'antd';
import PartialDescription from '/components/elements/detail/description/PartialDescription';
import PartialSpecification from '/components/elements/detail/description/PartialSpecification';
import PartialReview from '/components/elements/detail/description/PartialReview';
import PartialOffer from '/components/elements/detail/description/PartialOffer';

const { TabPane } = Tabs;

const DefaultDescription = ({product}) => {

    // const { puntuaciones: raking, 
    //         comentarios: comment, 
    //         preguntasRespuestas: questions, 
    //         codigo: code } = product[0]
    
    let raking;
    let comment;
    let questions;
    let code;
    let numberComments = 0;
    let details = product
    if (details && details.length > 0) {
        details.map(item => {
            raking = item.puntuaciones
            comment = item.comentarios
            questions = item.preguntasRespuestas
            code = item.codigo
            numberComments = comment ? comment.length : 0
        })
    }

    return (
        <div className="ps-product__content">
            <Tabs 
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Descripción Comercial',
                        key: '1',
                        children: <PartialDescription detail={product}/>
                    },
                    {
                        label: 'Ficha Técnica',
                        key: '2',
                        children: <PartialSpecification detail={product}/>
                    },
                    {
                        label: `Comentarios (${numberComments})`,
                        key: '3',
                        children: <PartialReview raking={raking} comment={comment} code={code}/>
                    },
                    {
                        label: 'Preguntas',
                        key: '4',
                        children: <PartialOffer questions={questions} code={code}/>
                    },
                ]}
            />
        </div>
    );
};

export default DefaultDescription;
