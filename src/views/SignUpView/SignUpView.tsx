import React, { useState } from 'react';
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
import auth from "@react-native-firebase/auth";
import {useDispatch} from "react-redux";


const SignUpView = (props: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onSignUp = () => {
        console.log('Sign Up');
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                const uid = auth().currentUser.uid;
                console.log('User is Logged, ID is:', uid);

                const action = {type: 'SET_USER_ID', value: uid};
                dispatch(action);
                props.navigation.navigate('Presentation');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
                alert(error);
            });

    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/ic_launcher/web_hi_res_512.png')}
            />
            <TextInput
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder='Password'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => onSignUp()}>
                <Text style={styles.buttonTitle}>Créer un compte</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Vous avez un compte ? <Text onPress={() => props.navigation.navigate('Login')} style={styles.footerLink}>Se connecter</Text></Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textIntroduction: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 16,
        width: 300,
    },

    logo: {
        marginTop: 100,
        marginBottom: 20,
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        textAlign: 'center',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        width: 200,
    },
    button: {
        backgroundColor: '#788eec',
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        width: 200,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
});


export default SignUpView;
