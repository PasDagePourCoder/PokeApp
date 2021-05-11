import firestore from "@react-native-firebase/firestore";
import Chat from "../models/Chat";
import Message from "../models/Message";

export async function createChatUserProfileInFirebase(userID: string, chatID: string, infoChatToCreate: any) {
    const ref = firestore().collection('users').doc(userID).collection('chats').doc(chatID);
    await ref.set(
        infoChatToCreate
    );
}


export async function createChatInFirebase(chatToCreate: Chat) {
    const ref = firestore().collection('chats').doc(chatToCreate.chat_id);
    await ref.set(
        chatToCreate
    );
}

export async function deleteChatInFirebase(chatID: string) {
    const ref = firestore().collection('chats').doc(chatID);
    await ref.delete();
}


export async function addMessageOnChatInFirestore(chatID: string, messageID: string, messageInformationToAdd: Message) {
    const ref = firestore().collection('chats').doc(chatID).collection('messages').doc(messageID);
    await ref.set(
        messageInformationToAdd
    );
}
