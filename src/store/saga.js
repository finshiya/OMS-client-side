import { all, call } from 'redux-saga/effects';
import LoginActionWatcher from '../container/LoginContainer/saga';


function* rootSaga() {
  console.log('Root saga initialized'); // Check if this shows
  yield all([
    call(LoginActionWatcher),
  ]);
}

export default rootSaga;


