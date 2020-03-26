import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Main from './components/Main';
import LocationContext from './state/LocationContext';
import MoodDataContext from "./state/MoodDataContext";
import EmotionDataContext from "./state/EmotionDataContext";
import firebase from "./utils/firebase";
import {Paper} from "@material-ui/core";

function App() {

    const [location, setLocation] = useState();
    const [moodData, setMoodData] = useState();
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
        var now = Date.now();
        var nowRound = Math.round(now);
        const last4Weeks = nowRound - 2419200000 / 4; //TODO: <- expand to 4 weeks (= remove /4)
        firebase
            .firestore()
            .collection("mood")
            .where("time", ">=", last4Weeks)
            .get()
            .then(function (querySnapshot) {
                let items = [];
                querySnapshot.forEach(function (doc) {
                    items.push(doc.data());
                });
                setMoodData(items)

            })
            .catch(function (error) {
                console.log("Error getting documents: ", error.message);
                setError(error.message)
            });
    }, []);

    useEffect(() => {
        const data = []
        firebase
            .firestore()
            .collection("emotions")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(doc => {
                    data.push(doc.data());
                });
                setEmotionData(data);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                setError(error.message)
            });
    }, []);

    const errorMessage = () => {
        return <Paper style={{backgroundColor: "red", width: "200px", padding: "30px", fontSize: "20px", position: "absolute", textAlign: "center", zIndex: 1000, left: window.innerWidth/2 - 100, top: window.innerHeight/2}}>Firebase Error: {error}</Paper>
    }

    return (
        <BrowserRouter>
            <LocationContext.Provider value={location}>
                <MoodDataContext.Provider value={moodData}>
                    <EmotionDataContext.Provider value={emotionData}>
                        {error && errorMessage()}
                        <Main/>
                    </EmotionDataContext.Provider>
                </MoodDataContext.Provider>
            </LocationContext.Provider>

        </BrowserRouter>
    );
}

export default App;
