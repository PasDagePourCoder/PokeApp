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
import { Card, ListItem, Icon } from 'react-native-elements';
import t from 'tcomb-form-native';
import {LetterOnly, MinimumAge} from "../../utils/regex";
import User from '../../models/User';
import {useSelector} from "react-redux";
import {addInformationUserFirebase} from "../../services/uploadService";

let Form = t.form.Form;

// here we are: define your domain model
const UserForm = t.struct({
    name: LetterOnly,              // a required string
    favoritePokemon: t.maybe(LetterOnly),  // an optional string
    age: MinimumAge             // a required number
});

const options = {
    fields: {
        name: {
            label: 'Please enter your name:',
            error: 'Name is not correct format.',
            placeholder: 'Sacha',
        },
        favoritePokemon: {
            label: 'Any favorite Pokémon ?:',
        },
        age: {
            label: 'Enter your age:',
            error: 'Age is too low'
        }
    },
};

const PresentationView = (props: any) => {

    const [form, setForm] = useState(undefined);
    const userID = useSelector((state: any) => state.userIDStore.userID);


    const handleSubmitForm = () => {
        const valuesForm = form.getValue();
        console.log('Values: ', valuesForm);
        if (valuesForm) {
            console.log('Form validated');
            saveDataInFirebase(valuesForm);
        }
    }

    const saveDataInFirebase = (valuesForm: any) => {
        const user: User = {
            age: valuesForm.age,
            favoritePokemon: valuesForm.favoritePokemon,
            id: userID,
            image: "",
            name: valuesForm.name
        };

        addInformationUserFirebase(userID, user)
            .then(() => {
                console.log('The info has been added for the user: ', userID);
                props.navigation.navigate('Home');
            }).catch((error) => console.log(error));
    }

    return (
        <View>
            <Card>
                <Card.Title>Presentation Form</Card.Title>
                <Form
                    ref={(formValue: any) => setForm(formValue)}
                    type={UserForm}
                    options={options}
                />
                <View style={styles.button_container}>
                    <Button
                        title='Next'
                        onPress={handleSubmitForm}
                        color='#20B2AA'/>
                </View>
            </Card>
        </View>
    );
};



const styles = StyleSheet.create({
    button_container: {
        marginTop: 30,
    }
});


export default PresentationView;
