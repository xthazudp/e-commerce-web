const redirectToLogin = () => {};

const redirectToHome = () => {};

const redirectToDashboard = (props, response) => {
  //   console.log('response ==>', response);
  if (response.data.user.role === 2) {
    props.push('/dashboard');
  }
  props.push('/admin/dashboard');
};

export const Dashboard = {
  redirectToDashboard,
  redirectToHome,
  redirectToLogin,
};
