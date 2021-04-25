import React, {useEffect, useState} from 'react';
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


const LoginView = (props: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        _isUserAuthenticated();
    }, []);


    const _isUserAuthenticated = () => {
        if (auth().currentUser) {
            const uid = auth().currentUser.uid;
            console.log('User is Logged, ID is:', uid);
            const action = {type: 'SET_USER_ID', value: uid};
            dispatch(action);
            props.navigation.navigate('Home');
        } else {
            console.log('User is not Logged');
        }
    };

    const onLoginPress = () => {
        console.log('Login');
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                console.log('The user is connected, his ID is: ', uid);
                const action = {type: 'SET_USER_ID', value: uid};
                dispatch(action);
                props.navigation.navigate('Home');
            })
            .catch(error => {
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
            <Text style={styles.textIntroduction}>Devenez le meilleur dresseur de Pokémon !</Text>
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
                onPress={() => onLoginPress()}>
                <Text style={styles.buttonTitle}>Se connecter</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Pas de compte? <Text onPress={() => props.navigation.navigate('SignUp')} style={styles.footerLink}>Créer un compte</Text></Text>
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
        width: 100,
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

export default LoginView;
