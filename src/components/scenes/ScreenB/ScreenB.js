import React from "react";
import Ranking from "../../elements/Ranking";
import saveRegulationToFirestore from "../../../services/saveRegulationToFirestore";
import firebase from "../../../utils/firebase";


function ScreenB() {
    const [firestoreData, setFirestoreData] = React.useState();

    function getPercentagePerItem(data) {
        let newData = {
            selektion: [],
            modifikation: [],
            aufmerksamkeit: [],
            umdeutung: [],
            reaktion: [],
            totalItemsPerCategory: {
                selektion: data.selektion.length,
                modifikation: data.modifikation.length,
                aufmerksamkeit: data.aufmerksamkeit.length,
                umdeutung: data.umdeutung.length,
                reaktion: data.reaktion.length
            }
        };
        Object.keys(data).forEach(function (item) {
            data[item].sort();
            let prev = data[item][0];
            for (let i = 0; i < data[item].length; i++) {
                if (newData[item].length === 0) {
                    newData[item][0] = {name: data[item][i], value: 1};
                } else if (data[item][i] !== prev) {
                    newData[item].push({name: data[item][i], value: 1});
                } else {
                    newData[item][newData[item].length - 1].value++;
                }
                prev = data[item][i];
            }
        });
        return newData;
    }

    function saveNewItem(name, category) {
        saveRegulationToFirestore({category: category, name: name}, () => {
            getFirestoreData(category)
        })
    }

    const getFirestoreData = (category) => {
        if (category) {
            firebase
                .firestore()
                .collection("regulation")
                .where('category', '==', category)
                .get()
                .then(function (querySnapshot) {
                    let tmp = {...firestoreData};
                    tmp[category] = []
                    querySnapshot.forEach(function (doc) {
                        if (tmp[category]) {
                            tmp[category].push(doc.data().name);
                        } else {
                            tmp[category] = [];
                            tmp[category].push(doc.data().name);
                        }
                    });
                    setFirestoreData(tmp)
                })
                .catch(function (error) {
                    console.log('Error getting documents: ', error);
                });
        } else {
            firebase
                .firestore()
                .collection("regulation")
                .get()
                .then(function (querySnapshot) {
                    let resultArray = [];

                    querySnapshot.forEach(function (doc) {
                        const category = doc.data().category;
                        if (resultArray[category]) {
                            resultArray[category].push(doc.data().name);
                        } else {
                            resultArray[category] = [];
                            resultArray[category].push(doc.data().name);
                        }
                    });
                    setFirestoreData(resultArray)
                })
                .catch(function (error) {
                    console.log('Error getting documents: ', error);
                });
        }
    }

    function sortData() {
        if (!firestoreData) {
            getFirestoreData()
        }
        let sortedData = firestoreData ? getPercentagePerItem(firestoreData) : undefined;
        if (sortedData) {
            sortedData.selektion.sort((a, b) => (a.value < b.value ? 1 : -1));
            sortedData.modifikation.sort((a, b) => (a.value < b.value ? 1 : -1));
            sortedData.aufmerksamkeit.sort((a, b) => (a.value < b.value ? 1 : -1));
            sortedData.umdeutung.sort((a, b) => (a.value < b.value ? 1 : -1));
            sortedData.reaktion.sort((a, b) => (a.value < b.value ? 1 : -1));

        }
        return <Ranking data={sortedData} saveNewItem={saveNewItem}/>;
    }

    return <div>{sortData()}</div>;
}

export default ScreenB;
