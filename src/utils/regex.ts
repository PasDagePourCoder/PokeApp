import t from 'tcomb-form-native';


export const LetterOnly = t.refinement(t.String, inputText => {
    const reg = /^[A-Za-z]+$/;
    return reg.test(inputText);
});

export const MinimumAge = t.refinement(t.Number, (n: number) => n >= 10);

export const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return reg.test(email);
});
