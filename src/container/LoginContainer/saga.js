import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from 'container/auth';
import config from 'config';

import {
  
  loginSuccess,
  loginFail,
  loginUserSuccess,
  loginUser,
  loginUserFail,

} from './slice';

function* handleLogin(action) {
  console.log('======action======', action.payload);
 try {
      const response = yield fetch(`${config.Ip}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: 'Basic ' + btoa(`${action.payload.email}:${action.payload.password}`)
      },
      body: JSON.stringify({
        email: action.payload.email,
        password: action.payload.password,
      }),
    });


    console.log("==response==",response);
    if (!response.ok) {
      yield toast.error('Invalid User', {
        autoClose: 5000
      });
      throw response;
    } else {
      const resJSON = yield response.json();
      console.log('===============resJSON=====================', resJSON);
      yield localStorage.setItem(process.env.REACT_APP_TOKEN, resJSON.token);
      yield put(loginSuccess(resJSON));
      yield put(loginUser(action.payload));
    }
  } catch (error) {
    if (error.status && error.message) {
      yield put(loginFail(error.message));
      yield toast.error(error.message, {
        autoClose: 3000
      });
    }
  }
}

function* loginUserDetail(action) {
  console.log('Action.playlodellll', action.payload);

  try {
    let params = {
      api: `${config.Ip}/users/latest-logins`,
      method: 'GET',
      successAction: loginUserSuccess(),
      failAction: loginUserFail('Login failed. Please try again.'),
      authourization: 'token'
    };

    let res = yield call(auth.basicApi,params);
 
    

    if (res && ['admin', 'licensee'].includes(res.userRole)) {

      let user = {
        user: res
      };
     
    
      yield localStorage.setItem(process.env.REACT_APP_LOGINUSER, JSON.stringify(user));

      // Navigate to different dashboards based on user roles
      switch (res.userRole) {
        case 'admin':
          yield action.payload.navigate('/dashboard');

          break;
        case 'licensee':
          yield action.payload.navigate('/licensee-dashboard');

          break;
      }
      yield put(loginUser({ role: res.userRole }));

      yield toast.success('Login Successfull', {
        autoClose: 3000
      });
    }
  } catch (error) {
    if (error.status && error.message) {
      yield toast.error(error.message, {
        autoClose: 3000
      });
    }
  }
}



export default function* LoginActionWatcher() {
  console.log('LoginActionWatcher initialized');
  yield takeEvery('login/login', handleLogin);
  yield takeEvery('login/loginUser', loginUserDetail);

}
