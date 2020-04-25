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

    useEffect(() => {
        firebase.auth().signInAnonymously();
        firebase.auth().onAuthStateChanged((user) => {
            //console.log("user", user.uid)
        });
    });


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
                    setLocation(data);
                });
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const coronaHopkins = await fetch("https://corona-api.com/countries")
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    //console.log("json", data)
                    data.data.sort((a, b) => a.name.localeCompare(b.name));

                    setCoronaData(data.data)
                    return data.data
                });
            const coronaSeries = await fetch("https://pomber.github.io/covid19/timeseries.json")
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    //console.log(`data`, data)
                    return data
                });
            coronaHopkins.map(country => {
                //Object.values(Object.)coronaSeries.find(())
            })
            Object.keys(coronaSeries).map(key => {
                const country = coronaSeries[key]
                const newToday = country[country.length - 1].confirmed - country[country.length - 3].confirmed;
                const yesterday = country[country.length - 3].confirmed;
                //if(key === "Germany"){console.log("inside", key, newToday, yesterday)}
                let hopkinsObject = coronaHopkins.find(country => country.name === key)

                //countries with different names in both data
                if(key === "US"){hopkinsObject = coronaHopkins.find(country => country.name === "USA")}
                if(key === "United Kingdom"){hopkinsObject = coronaHopkins.find(country => country.name === "UK")}
                if(key === "Korea, South"){hopkinsObject = coronaHopkins.find(country => country.name === "S. Korea")}
                if(key === "North Macedonia"){hopkinsObject = coronaHopkins.find(country => country.code === "MK")}
                if(key === "Bolivia"){hopkinsObject = coronaHopkins.find(country => country.code === "BO")}
                if(key === "Congo (Kinshasa)"){hopkinsObject = coronaHopkins.find(country => country.code === "CD")}
                if(key === "Moldova"){hopkinsObject = coronaHopkins.find(country => country.code === "MD")}
                if(key === "Taiwan*"){hopkinsObject = coronaHopkins.find(country => country.code === "TW")}
                if(key === "Tanzania"){hopkinsObject = coronaHopkins.find(country => country.code === "TZ")}
                if(key === "Brunei"){hopkinsObject = coronaHopkins.find(country => country.code === "BN")}
                if(key === "Burma"){hopkinsObject = coronaHopkins.find(country => country.code === "MM")}
                if(key === "Laos"){hopkinsObject = coronaHopkins.find(country => country.code === "LA")}
                if(key === "Cote d'Ivoire"){hopkinsObject = coronaHopkins.find(country => country.code === "CI")}


                //if(!hopkinsObject){console.log("unknownhopkinsobject", key)}
                if(hopkinsObject){
                    hopkinsObject.today.confirmed = newToday;
                    hopkinsObject.latest_data.confirmed = yesterday;
                    //console.log("hopkinsobject", hopkinsObject)
                }
                //return {name: Object.keys(key), value: key[key.length - 1]}
            })
            //console.log("both", Object.keys(coronaSeries),Object.values(coronaSeries), coronaSeries)
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
                //console.log("emotiondata", querySnapshot.docs[0].data())
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
