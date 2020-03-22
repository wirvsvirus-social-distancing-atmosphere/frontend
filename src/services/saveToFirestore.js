import firebase from 'firebase';

export default (item) => {
    firebase
        .firestore()
        .collection('emotions')
        .doc()
        .set(item)
        .then(function(docRef) {
        console.log('doc', docRef);
        //console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
        console.error('Error adding document: ', error);
        });
};
