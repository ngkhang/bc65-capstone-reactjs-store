import { Link } from 'react-router-dom';
import { Button, Col, Form, Row } from 'antd';
import { configForm, configFieldsSignUp } from '../configForm';
import { signUpActionAsync } from '../../../redux/reducers/userReducer';
import { useRedux, useRoute } from '../../../hooks';

// FEATURE: Toast message when sign up success/failed

const SignUp = () => {
  const [form] = Form.useForm();
  const { dispatch } = useRedux();
  const { navigate } = useRoute();
  const onFinish = async (values) => {
    const actionThunk = signUpActionAsync(values);
    const { statusCode, message } = await dispatch(actionThunk);

    if (statusCode === 200) {
      console.log(message);
      form.resetFields();
      navigate('/');
    } else console.log('Error: ', message);
  };

  return (
    <Form
      form={form}
      {...configForm}
      name="signUpForm"
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirm: '',
        phone: '',
        prefix: '86',
        gender: true,
      }}
      onFinish={onFinish}
    >
      <Row gutter={24} className="mb-5">
        {configFieldsSignUp.map((field) => {
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
