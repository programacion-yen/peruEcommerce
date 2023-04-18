import React from 'react';
import {  Result, Button  } from 'antd';

export default function Custom500() {
    return <Result
            status="500"
            title="500"
            subTitle="Lo siento, algo salio mal."
        />
}