import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    FlatList,
    Button,
    TouchableOpacity, TextInput,
} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import * as commonStyle from '../../utils/commonStyle';
import User from "../../models/User";
import Chat from "../../models/Chat";
import firestore from "@react-native-firebase/firestore";
import {
    addMessageOnChatInFirestore,
    createChatInFirebase,
    createChatUserProfileInFirebase
} from "../../services/chatService";
import {getFormattedDate} from "../../utils/utils";
import Message from "../../models/Message";

const ChatDetail = (props: any) => {

    /* 2. Get the param */
    const { chatDetail, currentUserID } = props.route.params;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [messagesList, setMessagesList] = useState<Message[]>([]);
    const [textInput, setTextInput] = useState<string>("");

    useEffect(() => {
        getMessagesList();
    }, []);

    const getMessagesList = () => {
        console.log('[CHAT] Receiving Messages from Firebase Chat:', chatDetail.chat_id);
        const ref =  firestore().collection('chats').doc(chatDetail.chat_id).collection('messages');
        ref.onSnapshot(querySnapshot => {
            const listMessages: Message[] = [];
            querySnapshot.forEach(doc => {
                // @ts-ignore
                listMessages.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setMessagesList(listMessages);  // Reverse to display the most recent messages.
            console.log('Get the Messages with Success.');
        });
    }

    const sendTextMessage = () => {
        console.log('[CHAT] Send a text message.');
        const messageID: string = 'message_' + getFormattedDate();

        const messageInfo: Message = {
            id: messageID, senderID: currentUserID, textMessage: textInput, timeStamp: getFormattedDate()
        };

        addMessageOnChatInFirestore(chatDetail.chat_id, messageID, messageInfo)
            .then(() => {
                console.log('[CHAT] Success: Added the text message from user:',
                    currentUserID, 'in Firebase for the chat ID:' , chatDetail.chat_id);
            })
            .catch((error: any) => console.log(error));
    }

    return (
        <View style={styles.main_container}>
            <FlatList
                data={messagesList}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) =>
                    <View>
                        <Text>{item.textMessage}</Text>
                    </View>
                }
            />
            <View style={styles.footer}>
                <View style={[styles.inputContainer]}>
                    <TextInput style={[styles.inputs]}
                               multiline={true}
                               placeholder='Write a message'
                               underlineColorAndroid="transparent"
                               onChangeText={setTextInput}
                               value={textInput}
                               onSubmitEditing={() => sendTextMessage()}
                    />
                    {textInput !== '' &&
                    <TouchableOpacity style={styles.btnSend} onPress={() => sendTextMessage()}>
                        <Image source={require('../../assets/icons/ic_share.png')} style={styles.iconSend}/>
                    </TouchableOpacity>}
                </View>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    footer:{
        flexDirection: 'row',
        height:60,
        paddingHorizontal:10,
        padding:5,
    },

    // Buttons related
    btnSend:{
        backgroundColor:'#00BFFF',
        width:40,
        height:40,
        borderRadius:360,
        alignItems:'center',
        justifyContent:'center',
    },
    iconSend:{
        width:30,
        height:30,
        alignSelf:'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        height:40,
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        marginRight:10,
    },
    inputs:{
        height:40,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
});



export default ChatDetail;
