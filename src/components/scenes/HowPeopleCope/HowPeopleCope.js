import React, { useContext } from "react";
import Ranking from "../../elements/Ranking";
import saveRegulationToFirestore from "../../../services/saveRegulationToFirestore";
import firebase from "../../../utils/firebase";
import { withRouter } from "react-router-dom";

import EmotionContext from '../../../state/EmotionContext';
import LocationContext from '../../../state/LocationContext';
import DialogTitle from "@material-ui/core/DialogTitle";
import {FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";

function ScreenB() {
    const mood = useContext(EmotionContext);
    const location = useContext(LocationContext);

    const [selectedEmotion, setSelectedEmotion] = React.useState(mood);
    const [firestoreData, setFirestoreData] = React.useState();

    function getPercentagePerItem(data) {
        let newData = {
            selektion: [],
            modifikation: [],
            aufmerksamkeit: [],
            umdeutung: [],
            reaktion: [],
            totalItemsPerCategory: {
                selektion: data.selektion ? data.selektion.length : 0,
                modifikation: data.modifikation ? data.modifikation.length : 0,
                aufmerksamkeit: data.aufmerksamkeit ? data.aufmerksamkeit.length : 0,
                umdeutung: data.umdeutung ? data.umdeutung.length : 0,
                reaktion: data.reaktion ? data.reaktion.length : 0
            }
        };
        Object.keys(data).forEach(function(item) {
            data[item].sort();
            let prev = data[item][0];
            for (let i = 0; i < data[item].length; i++) {
                if (newData[item].length === 0) {
                    newData[item][0] = { name: data[item][i], value: 1 };
                } else if (data[item][i] !== prev) {
                    newData[item].push({ name: data[item][i], value: 1 });
                } else {
                    newData[item][newData[item].length - 1].value++;
                }
                prev = data[item][i];
            }
        });
        return newData;
    }

    function saveNewItem(name, category) {
        const { country, region } = location;
        saveRegulationToFirestore(
            {
                category, emotion: selectedEmotion,
                name,
                geo: { country, region },
            },
            () => {
                getFirestoreData(category);
            }
        );
    }

    const getFirestoreData = category => {
        if (category) {
            firebase
                .firestore()
                .collection("regulation")
                .where("category", "==", category)
                .where("emotion", "==", selectedEmotion)
                .get()
                .then(function(querySnapshot) {
                    let tmp = { ...firestoreData };
                    tmp[category] = [];
                    querySnapshot.forEach(function(doc) {
                        if (tmp[category]) {
                            tmp[category].push(doc.data().name);
                        } else {
                            tmp[category] = [];
                            tmp[category].push(doc.data().name);
                        }
                    });
                    setFirestoreData(tmp);
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        } else {
            firebase
                .firestore()
                .collection("regulation")
                .where("emotion", "==", selectedEmotion)
                .get()
                .then(function(querySnapshot) {
                    let resultArray = [];

                    querySnapshot.forEach(function(doc) {
                        const category = doc.data().category;
                        if (resultArray[category]) {
                            resultArray[category].push(doc.data().name);
                        } else {
                            resultArray[category] = [];
                            resultArray[category].push(doc.data().name);
                        }
                    });

                    setFirestoreData(resultArray);
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        }
    };

    function sortData() {
        //addFakeRegulationData()
        if (!firestoreData) {
            getFirestoreData();
        }
        let sortedData = firestoreData
            ? getPercentagePerItem(firestoreData)
            : undefined;
        if (sortedData) {
            sortedData.selektion.sort((a, b) => (a.value < b.value ? 1 : -1));
            sortedData.modifikation.sort((a, b) => (a.value < b.value ? 1 : -1));
            sortedData.aufmerksamkeit.sort((a, b) => (a.value < b.value ? 1 : -1));
            sortedData.umdeutung.sort((a, b) => (a.value < b.value ? 1 : -1));
            sortedData.reaktion.sort((a, b) => (a.value < b.value ? 1 : -1));
        }
        return (
            <><div style={{display: "flex", fontSize: "1.5rem", alignItems:"center", justifyContent:"center",textAlign: "center", margin: 15,}}>
              What can I do about
              <FormControl style={{ marginLeft:10,minWidth: '140px', backgroundColor: "rgba(117,253,236,0.27)" }}>
                <InputLabel htmlFor='position-simple'>Select an emotion</InputLabel>
                <Select value={selectedEmotion} onChange={event => {
                    setSelectedEmotion(event.target.value);
                    setFirestoreData(null);
                    getFirestoreData(event.target.value)
                }}>
                  <MenuItem value={'fear'}>Fear</MenuItem>
                  <MenuItem value={'anger'}>Anger</MenuItem>
                  <MenuItem value={'joy'}>Joy</MenuItem>
                  <MenuItem value={'grief'}>Grief</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{margin: 15, width: "100%", textAlign: "center"}}>
              These are the five major aspects of emotional episodes you can influence to avoid or seek for an emotion.
            </div>
            <Ranking emotion={selectedEmotion} data={sortedData} saveNewItem={saveNewItem} />
            </>
        );
    }

    return <div>{sortData()}</div>;
}

export default withRouter(ScreenB);
