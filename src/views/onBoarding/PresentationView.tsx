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


    const handleSubmitForm = () => {
        const valuesForm = form.getValue();
        console.log('Values: ', valuesForm);
        if (valuesForm) {
            console.log('Form validated');
        }
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
