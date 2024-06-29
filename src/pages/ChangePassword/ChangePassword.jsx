import { Button, Col, Flex, Form, Input, Row } from 'antd';
import { configForm } from '../Auth/configForm';
import { LockOutlined } from '@ant-design/icons';
import { changePasswordActionAsync } from '../../redux/reducers/userReducer';
import useRedux from '../../hooks/useRedux';

const configFields = [
  {
    key: 1,
    configCol: {
      span: 24,
      // sm: 12,
    },
    configFormItem: {
      name: 'password',
      label: 'New Password',
      hasFeedback: true,
      rules: [
        {
          required: true,
        },
        {
          min: 4,
          max: 12,
          message: 'Password must be between 4 and 12 characters',
        },
      ],
    },
    children: <Input.Password prefix={<LockOutlined />} placeholder="******" />,
  },
  {
    key: 2,
    configCol: {
      span: 24,
      // sm: 12,
    },
    configFormItem: {
      name: 'confirm',
      label: 'Confirm Password',
      dependencies: ['password'],
      hasFeedback: true,
      rules: [
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error('The new password that you entered do not match!'),
            );
          },
        }),
      ],
    },
    children: <Input.Password prefix={<LockOutlined />} placeholder="******" />,
  },
];

const ChangePassword = () => {
  const [form] = Form.useForm();
  const { dispatch } = useRedux();

  const onFinish = async (newPassword) => {
    const actionThunk = changePasswordActionAsync(newPassword);
    const { statusCode, content } = await dispatch(actionThunk);
    if (statusCode === 200) {
      console.log(content);
      form.resetFields();
    } else console.log('Error: ', content);
  };

  return (
    <div className="flex justify-center">
      <Form
        className="w-full sm:w-1/2"
        form={form}
        {...configForm}
        name="signUpForm"
        onFinish={onFinish}
      >
        <Row gutter={24} className="mb-5">
          {configFields.map((field) => {
            return (
              <Col key={field.key} {...field.configCol}>
                <Form.Item {...field.configFormItem}>
                  {field.children}
                </Form.Item>
              </Col>
            );
          })}
        </Row>

        <Flex wrap={true} justify="flex-end">
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default ChangePassword;
