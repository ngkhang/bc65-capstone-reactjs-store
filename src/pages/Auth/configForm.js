const configForm = {
  layout: 'vertical',
  // name: 'signUpForm',
  size: 'large',
  validateMessages: {
    required: 'Please input your ${name}',
    types: {
      email: '${name} is not a valid email!',
    },
  },
  // initialValues: {
  //   prefix: '86',
  //   email: '',
  //   password: '',
  // },
};

export default configForm;
