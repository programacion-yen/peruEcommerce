import React from 'react';
import { Skeleton } from 'antd';
import SkeletonProduct from '/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '/utils/common-helpers';

const SkeletonSinglePost = () => {

    let group;
    const skeletonItems = generateTempArray(4).map((item) => (
        <div className='col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 ps-product ps-product--simple m-0 pl-0' key={item}>
            <div className='ps-product__thumbnail p-0 m-0'>
                <SkeletonProduct />
            </div>
        </div>
    ));
    group = skeletonItems;
    return (
        <div className='d-flex flex-wrap'>
            <div className="row">
                <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 ps-product ps-product--simple m-0 px-2">
                    <div className="ps-product__thumbnail p-0 m-0">
                        <Skeleton paragraph={{ rows: 12, title: true }} />
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 ps-product ps-product--simple m-0 px-0">
                    <div className="ps-product__thumbnail p-0 m-0">
                        <Skeleton.Input active={true} size={230} style={{height: 600}} />
                    </div>
                </div>
                {group}
            </div>
        </div>
    );
};

export default SkeletonSinglePost;
