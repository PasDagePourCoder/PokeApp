import firestore from '@react-native-firebase/firestore';

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
}
