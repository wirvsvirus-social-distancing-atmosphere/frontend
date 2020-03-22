import firebase from 'firebase';
import {useEffect, useState} from 'react';

export default props => {
    const [result, setResult] = useState();
    useEffect(() => {
        firebase
            .firestore()
            .collection(props.type)
            //.where('emotion', '==', props.type)
            .get()
            .then(function (querySnapshot) {
                let resultArray = [];
                querySnapshot.forEach(function (doc) {
                    resultArray.push(doc.data());
                });
                setResult(resultArray)

            })
            .catch(function (error) {
                console.log('Error getting documents: ', error);
            });
    }, [props]);
    return props.children(result);
};