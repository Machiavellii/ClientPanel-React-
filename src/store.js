import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer, reduxFirestore } from 'redux-firestore';
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyDCiyglR8ZcmEwthlZckaQa-hQZmIYTI5I',
  authDomain: 'reactclientpanel-9cfa3.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-9cfa3.firebaseio.com',
  projectId: 'reactclientpanel-9cfa3',
  storageBucket: 'reactclientpanel-9cfa3.appspot.com',
  messagingSenderId: '71060773688'
};

//react Redux Firebase Config
const rrfConfig = {
  userProfile: 'users',
  userFirestoreForProfile: 'true'
};

//Init Firebase
firebase.initializeApp(firebaseConfig);

//Init Firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

//Check for Settings in LocalStorage
if (localStorage.getItem('settings') === null) {
  //Default Settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  //Set To Local Storage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

//Create Initial State
const initialState = {
  settings: JSON.parse(localStorage.getItem('settings'))
};

//Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
