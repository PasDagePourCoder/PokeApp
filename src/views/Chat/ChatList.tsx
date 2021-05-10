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
    TouchableOpacity,
} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import {connect, useSelector} from 'react-redux';
import { listPokeOriginal } from '../../data/PokemonList';
import { Pokemon } from '../../models/Pokemon';
import * as commonStyle from '../../utils/commonStyle';
import firestore from "@react-native-firebase/firestore";
import User from "../../models/User";
import {shuffle} from "../../utils/utils";
import Chat from "../../models/Chat";

const ChatList = (props: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [chatList, setChatList] = useState<Chat[]>([]);
    const currentUserID = useSelector((state: any) => state.userIDStore.userID);


    useEffect(() => {
        getChatListFromUser();
    }, []);

    const onViewChat = (chatDetail: Chat) => {
        props.navigation.navigate('ChatDetail', {
            chatDetail: chatDetail,
            currentUserID: currentUserID
        });
    };

    const getChatListFromUser = () => {
        console.log('Querying Chat');
        let listChatReceivedFirebase: Chat[] = [];
        firestore().collection('users').doc(currentUserID).collection('chats')
            .onSnapshot(querySnapshot => {
                const listChatsNameCurrentUser: String[] = [];
                querySnapshot.forEach(doc => {
                    listChatsNameCurrentUser.push(doc.id);
                });
                console.log('[CHAT] Get the Chat Name List of the User.');
                console.log(listChatsNameCurrentUser);

                // Firestore
                firestore().collection('chats')
                    .where('chat_id', 'in', listChatsNameCurrentUser)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            //@ts-ignore
                            listChatReceivedFirebase.push({
                                chat_id: doc.id,
                                ...doc.data(),
                            });
                        });
                        console.log('List Chat Received From Firebase', listChatReceivedFirebase);
                        setChatList(listChatReceivedFirebase);
                    });
            });
    };

    return (
        <View>
            <FlatList
                data={chatList}
                keyExtractor={item => item.chat_id.toString()}
                renderItem={({ item }) =>
                    <ChatItem chatDetail={item} onViewChat={onViewChat} currentUserID={currentUserID}/>}
            />
        </View>
    );
};

interface IProps {
    chatDetail: Chat,
    onViewChat: any,
    currentUserID: string
}

const ChatItem = ({chatDetail, onViewChat, currentUserID}: IProps) => {
    let imageOtherUser;
    let nameOtherUser;
    if (currentUserID === chatDetail.id_1) {
        imageOtherUser = chatDetail.image_2;
        nameOtherUser = chatDetail.name_2;
    } else {
        imageOtherUser = chatDetail.image_1;
        nameOtherUser = chatDetail.name_1;
    }

    return (
        <View>
            <TouchableOpacity style={styles.main_container} onPress={() => onViewChat(chatDetail)}>
                <Image
                    style={styles.image}
                    source={{ uri: imageOtherUser }}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{nameOtherUser}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    imagePokemon: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    details_container: {
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        ...commonStyle.elevationButton,
    },

    main_container: {
        flexDirection: 'row',
    },
    image: {
        width: 60,
        height: 60,
        margin: 5,
        borderRadius: 30,
    },
    divider_pokemon: {
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
    },

    content_container: {
        flex: 1,
        margin: 5,
    },
    header_container: {
        flex: 3,
        flexDirection: 'row',
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
    },
    level_text: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12,
        color: '#666666',
    },
});


export default ChatList;
