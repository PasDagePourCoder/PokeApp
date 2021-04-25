import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";


/**
 * Upload the information of the user.
 * @param userID
 * @param informationToAdd
 */
export async function addInformationUserFirebase(userID: string, informationToAdd: any) {
    const ref = firestore().collection('users').doc(userID);
    await ref.set(
        informationToAdd
    );


}/**
 * Update the information of the user..
 * @param userID
 * @param informationToAdd
 */
export async function updateInformationUserFirebase(userID: string, informationToAdd: any) {
    const ref = firestore().collection('users').doc(userID);
    await ref.update(
        informationToAdd
    );
}


export const createStorageReferenceToFile = (pathFirestore: string) => {
    const FireBaseStorage = storage();
    return FireBaseStorage.ref(pathFirestore);
};

