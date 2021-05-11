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
import { moderateScale } from 'react-native-size-matters';

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

    const _renderMessageItem = (message: Message) => {
        if (currentUserID === message.senderID) {
            return (
                <View style={[styles.item, styles.itemOut]}>
                    {/* eslint-disable-next-line react-native/no-inline-styles */}
                    <View style={[styles.balloon, {backgroundColor: '#1084ff'}]}>
                        <Text style={styles.text_message_bubble}>{message.textMessage}</Text>
                    </View>

                    {/*{this._renderArrowRight()}*/}
                </View>
            );
        } else {
            return (
                <View style={[styles.item, styles.itemIn]}>
                    {/* eslint-disable-next-line react-native/no-inline-styles */}
                    <View style={[styles.balloon, {backgroundColor: 'grey'}]}>
                        <Text style={styles.text_message_bubble}>{message.textMessage}</Text>
                    </View>
                    {/*// https://stackoverflow.com/questions/50465450/chat-bubble-in-react-native*/}
                    {/*{this._renderArrowLeft()}*/}
                </View>            );
        }
    };


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
                        {_renderMessageItem(item)}
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

    // Bubble Chat
    item: {
        marginVertical: moderateScale(7, 2),
        flexDirection: 'row',
    },
    itemIn: {
        marginLeft: 20,
    },
    itemOut: {
        alignSelf: 'flex-end',
        marginRight: 20,
    },
    balloon: {
        maxWidth: moderateScale(250, 2),
        paddingHorizontal: moderateScale(10, 2),
        paddingTop: moderateScale(5, 2),
        paddingBottom: moderateScale(7, 2),
        borderRadius: 20,
    },
    arrowContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        flex: 1,
    },
    arrowLeftContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    arrowRightContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    arrowLeft: {
        left: moderateScale(-6, 0.5),
    },
    arrowRight: {
        right:moderateScale(-6, 0.5),
    },
    text_message_bubble: {
        paddingTop: 5,
        color: 'white',
    },
    // End Chat Bubbles


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
