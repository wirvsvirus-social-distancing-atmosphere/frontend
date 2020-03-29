import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Main from './components/Main';
import LocationContext from './state/LocationContext';
import MoodDataContext from "./state/MoodDataContext";
import EmotionDataContext from "./state/EmotionDataContext";
import CoronaDataContext from "./state/CoronaDataContext";
import firebase from "./utils/firebase";
import {Paper} from "@material-ui/core";

function App() {

    const [location, setLocation] = useState();
    const [moodData, setMoodData] = useState();
    const [coronaData, setCoronaData] = useState();
    const [emotionData, setEmotionData] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://ipapi.co/json/")
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    data.region = data.region_code
                    data.country = data.country_name
                    console.log("result", data.region, data.country)
                    setLocation(data);
                });
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://corona-api.com/countries")
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    console.log("json", data)
                    setCoronaData(data.data)
                });
        }
        fetchData();
    }, []);


    useEffect(() => {
        firebase
            .firestore()
            .collection("moodmeans")
            .orderBy("time", "desc")
            .limit(1)
            .get()
            .then(querySnapshot => {
                let means = querySnapshot.docs[0].data()
                setMoodData(means);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                setError(error.message)
            });
    }, []);

    useEffect(() => {
        firebase
            .firestore()
            .collection("emotionmeans")
            .orderBy("time", "desc")
            .limit(1)
            .get()
            .then(querySnapshot => {
                let data = querySnapshot.docs[0].data()
                setEmotionData(data);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                setError(error.message)
            });
    }, []);

    useEffect(() => {
        firebase
            .firestore()
            .collection("functionstrigger")
            .orderBy("time", "desc")
            .limit(1)
            .get()
            .then(querySnapshot => {
                let docs = querySnapshot.docs[0];
                if (docs) {
                    let data = docs.data()
                    let time = data.time;
                    if (Date.now() - time > (4 * 3600000)) {
                        firebase
                            .firestore()
                            .collection('functionstrigger')
                            .doc()
                            .set({time: Date.now()})
                    }
                } else {
                    firebase
                        .firestore()
                        .collection('functionstrigger')
                        .doc()
                        .set({time: Date.now()})
                }
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                setError(error.message)
            });
    }, []);

    const errorMessage = () => {
        return <Paper style={{
            backgroundColor: "red",
            width: "200px",
            padding: "30px",
            fontSize: "20px",
            position: "absolute",
            textAlign: "center",
            zIndex: 1000,
            left: window.innerWidth / 2 - 100,
            top: window.innerHeight / 2
        }}>Firebase Error: {error}</Paper>
    }

    return (
        <BrowserRouter>
            <LocationContext.Provider value={location}>
                <CoronaDataContext.Provider value={coronaData}>
                    <MoodDataContext.Provider value={moodData}>
                        <EmotionDataContext.Provider value={emotionData}>
                            {error && errorMessage()}
                            <Main/>
                        </EmotionDataContext.Provider>
                    </MoodDataContext.Provider>
                </CoronaDataContext.Provider>
            </LocationContext.Provider>

        </BrowserRouter>
    );
}

export default App;
