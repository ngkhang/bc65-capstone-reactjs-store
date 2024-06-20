import { Button, Col, Form, Row } from 'antd';
import { Link } from 'react-router-dom';
import configForm from '../configForm';
import { fieldsSignUp } from '../configFields';

const SignUp = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      {...configForm}
      name="signUpForm"
      initialValues={{
        prefix: '86',
        email: '',
        password: '',
        gender: true,
      }}
      onFinish={onFinish}
      onFinishFailed={() => console.log('reject')}
    >
      <Row gutter={24} className="mb-5">
        {fieldsSignUp.map((field) => {
          return (
            <Col key={field.key} {...field.configCol}>
              <Form.Item {...field.configFormItem}>{field.children}</Form.Item>
            </Col>
          );
        })}
      </Row>

      <div className="flex justify-between flex-wrap mb-2">
        <Button
          type="primary"
          htmlType="submit"
          className="mb-3 sm:mb-0 w-full sm:w-[48%]"
        >
          Sign Up
        </Button>
        <Button type="default" htmlType="reset" className="w-full sm:w-[48%]">
          Reset
        </Button>
      </div>

      <p className="text-end">
        <Link to="/auth/signin">Have an account? Sign In</Link>
      </p>
    </Form>
  );
};

export default SignUp;
