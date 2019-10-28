import {
  auth,
  createUserProfileDocument,
  googleProvider,
  getCurrentUser
} from "../../firebase/firebase.utils";
import { UserActionTypes } from "./user.types";
import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signupFailure,
  signupSuccess
} from "./user.actions";

export function* getUserSnapShot(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapShot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getUserSnapShot(user);
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getUserSnapShot(user);
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getUserSnapShot(userAuth);
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFailure(e.message));
  }
}
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signupSuccess({ user, additionalData: { displayName } }));
  } catch (e) {
    yield put(signupFailure(e.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* checkUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* onSignoutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignupStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}
export function* signupSuccess() {}
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(checkUserSession),
    call(onSignoutStart)
  ]);
}
