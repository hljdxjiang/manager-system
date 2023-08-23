import React, { FC, useState } from 'react';
import { Form, Input, Modal, message } from 'antd';
import session from '@/api/sys/session';
import { setTimeout } from 'timers';

interface ModalProps {
  visible?: boolean
  onOk?: (arg0?: unknown) => void
  onCancel?: (arg0?: unknown) => void
}
const PassChage: FC<ModalProps> = (
  (props: ModalProps) => {
    const {
      onOk,
      onCancel,
      visible,
    } = props
    const [form] = Form.useForm();

    const doOk =  () => {
      form.validateFields().then(async () => {
        var obj = {}
        obj['passWD'] = form.getFieldValue("passwd");
        obj['password'] = form.getFieldValue("password");
        await session.changePwd(obj).then((res) => {
          if(res.code==='000000'){
            message.info("修改成功");
            setTimeout(()=>{
              form.resetFields();
              onOk()
            },500)
          }
        }).catch((err) => {
          message.error(err)
        })
      });

    }
    const doCancel = () => {
      setTimeout(()=>{
        form.resetFields();
        onCancel()
      },500)
    }

    return (
      <>
        <Modal
          title="修改密码"
          visible={visible}
          onOk={doOk}
          onCancel={doCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form
            form={form}
          >
            <Form.Item
              name="passwd"
              label="旧密码"
              rules={[
                {
                  required: true,
                  message: '请输入原密码',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="password"
              label="新密码"
              rules={[
                {
                  required: true,
                  message: '请输入新密码',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="确认新密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请再次输入密码!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次新密码不一致，请重新输入'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  })
PassChage.defaultProps = {
  visible: false,
  onOk: () => { },
  onCancel: () => { },
}

export default PassChage;
