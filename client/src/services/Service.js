import http from "../http-common";


const signUp = data => {
  return http.post('/user/register', data);
};

const logIn = data => {
  return http.post('user/login', data);
};

const askNewPassword = data => {
  return http.post('/user/askNewPassword', data);
}

const redefinePassword = async (data) => {
  const requestOptions =  {
    body: JSON.stringify(data)
  };

  console.log(data);

  return fetch(http.post(`/user/changePassword/${data.token}`), requestOptions);
}

// const redefinePassword = data => {
//   return http.post('/user/changePassword/:token', data);
// }

const emailConfirmation = () => {
  return http.get('/emailConfirmation');
}

const resendToken = data => {
  return http.post('/resendToken', data);
}

const getCharacters = data => {
  return http.get('/disneyCharacter', { headers: { 'authToken': data } });
}

export default {
  signUp,
  logIn,
  getCharacters,
  askNewPassword,
  redefinePassword,
  emailConfirmation,
  resendToken,

}
