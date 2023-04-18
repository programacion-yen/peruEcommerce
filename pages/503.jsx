import {  Result  } from 'antd';

function Custom503() {

    return (
        <div className="site-content">
            <div className="ps-page--404">
                <div className="container">
                    <div className="ps-section__content">
                        <Result
                            status="403"
                            title="503"
                            subTitle="Lo sentimos, la página esta en mantención"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Custom503;
