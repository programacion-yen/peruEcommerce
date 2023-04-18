import React from 'react';
import BreadCrumb from '/components/elements/BreadCrumb';
import Compare from '/components/partials/account/Compare';

const ComparePage = () => {
    const breadCrumb = [
        {
            text: 'Inicio',
            url: '/',
        },
        {
            text: 'Compare',
        },
    ];
    return (
        <div className="ps-page--simple">
            <BreadCrumb breadcrumb={breadCrumb} />
            <Compare />
        </div>
    );
};

export default ComparePage;
