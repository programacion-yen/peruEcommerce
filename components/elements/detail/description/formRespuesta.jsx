import React from "react";
import { Form,Input } from 'antd';

const FormRespuesta = ({validationForm,submitLabel,butonClass,name,title,form}) => {
  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  }
  return (
    <>
    <Form className="ps-form--review" onFinish={validationForm} onFinishFailed={onFinishFailed} form={form}>
        <Form.Item
            name={name}
            rules={[
                {
                    required: false,
                    message: 'Campo obligatorio!',
                },
            ]}>
            <Input
                className="form-control"
                type="text"
                placeholder={title} />
        </Form.Item>

        <Form.Item className="m-0">
            <button types="submit" className={butonClass}>{submitLabel}</button>
        </Form.Item>
    </Form>
    </>
  );
};

export default FormRespuesta;