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
import { connect } from 'react-redux';
import * as commonStyle from '../../utils/commonStyle';
import User from "../../models/User";
import Chat from "../../models/Chat";
import firestore from "@react-native-firebase/firestore";
import {createChatInFirebase, createChatUserProfileInFirebase} from "../../services/chatService";
import {getFormattedDate} from "../../utils/utils";

const ChatDetail = (props: any) => {

    /* 2. Get the param */
    const { otherUser, currentUserID } = props.route.params;

    return (
        <View>
            <Text>This is the list of messages.</Text>
        </View>
    );
};



const styles = StyleSheet.create({
    imagePokemon: {
        width: 300,
        height: 300
    },
    details_container: {
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        ...commonStyle.elevationButton,
    }
});



export default ChatDetail;
