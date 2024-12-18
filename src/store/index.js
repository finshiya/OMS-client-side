import reducer from './reducer';
import saga from './saga';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, sagaMiddleware) 
});
sagaMiddleware.run(saga);

const persister = 'Free';

export { store, persister };



// import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from './reducer'; // Ensure this is the correct path
// import rootSaga from './saga'; // Ensure this is the correct path
// const sagaMiddleware = createSagaMiddleware();


// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => {
//     console.log('Default middleware applied'); // Add this log
//     return getDefaultMiddleware().concat(sagaMiddleware);
//   },
// });

// console.log('Middleware setup complete'); // Add this log
// sagaMiddleware.run(rootSaga);


// export default store;

