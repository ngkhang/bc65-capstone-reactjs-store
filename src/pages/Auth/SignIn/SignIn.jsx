import { Link } from 'react-router-dom';
import { Button, Form } from 'antd';
import { useRedux, useRoute } from '../../../hooks';
import { signInActionAsync } from '../../../redux/reducers/userReducer';
import { configForm, configFieldsSignIn } from '../configForm';

// FEATURE: Toast message when sign in success/failed

const SignIn = () => {
  const [form] = Form.useForm();
  const { navigate } = useRoute();
  const { dispatch } = useRedux();

  const onFinish = async (values) => {
    const actionThunk = signInActionAsync(values);
    const { statusCode, message } = await dispatch(actionThunk);
    if (statusCode === 200) {
      form.resetFields();
      navigate('/');
    } else console.log('Error: ', message);
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
      {configFieldsSignIn.map((field) => {
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
        <span>Don't have an account? </span>
        <Link to="/auth/signup">Sign Up</Link>
      </p>
    </Form>
  );
};

export default SignIn;
