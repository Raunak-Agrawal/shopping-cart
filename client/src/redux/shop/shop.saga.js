import { takeLatest, call, put } from "redux-saga/effects";
import { ShopActionTypes } from "./shop.types";
import {
  firestore,
  convertCollectionSnapshotToMap
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  try {
    let collectionRef = firestore.collection("collections");
    const snapShot = yield collectionRef.get();
    const collectionArrayToObject = yield call(
      convertCollectionSnapshotToMap,
      snapShot
    );
    yield put(fetchCollectionsSuccess(collectionArrayToObject));
  } catch (err) {
    yield put(fetchCollectionsFailure(err.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
