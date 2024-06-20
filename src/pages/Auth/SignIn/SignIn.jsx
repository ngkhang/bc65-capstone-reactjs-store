import { Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import configForm from '../configForm';
import { fieldsSignIn } from '../configFields';

const SignIn = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      {...configForm}
      name="signInForm"
      initialValues={{
        email: '',
        password: '',
      }}
      onFinish={onFinish}
    >
      {fieldsSignIn.map((field) => {
        return (
          <Form.Item key={field.key} {...field.configFormItem}>
            {field.children}
          </Form.Item>
        );
      })}
      <div className="flex justify-between flex-wrap mb-2">
        <Button type="primary" htmlType="submit" className="w-full">
          Sign In
        </Button>
      </div>
      <p className="text-end">
        <span>Don&apos;t have an account? </span>
        <Link to="/auth/signup">Sign Up</Link>
      </p>
    </Form>
  );
};

export default SignIn;
