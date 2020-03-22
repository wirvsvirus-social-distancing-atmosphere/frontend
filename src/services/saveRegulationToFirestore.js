import firebase from 'firebase';

export default (item, callback) => {
    console.log("dief", item)
    firebase
        .firestore()
        .collection('regulation')
        .doc()
        .set(item)
        .then(function(docRef) {
            console.log('doc', docRef);
            callback()
            //console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error('Error adding document: ', error);
        });
};
