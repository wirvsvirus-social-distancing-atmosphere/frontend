// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const emotionCategories = {
    FEAR: "fear",
    JOY: "joy",
    ANGER: "anger",
    GRIEF: "grief",
};

const emotionsToCountries = (emotionData, features) => {
    const countries = [];
    for (let x = 0; x < 190; x++) {
        countries.push([])
    }
    emotionData.map((item) => {
        if (item.geo) {
            let countryIndex;
            if (item.geo.country === "Germany" && item.geo.region) { //geojson only contains region polygons for germany
                countryIndex = features.findIndex((feature) => feature.name === item.geo.country
                    && feature.region === item.geo.region);
            } else {
                countryIndex = features.findIndex((feature) => feature.name === item.geo.country)
            }
            if (countryIndex !== -1) {
                countries[countryIndex].push({emotion: item.category, value: item.value})
            }
        }
    });

    countries.map((country, index) => {
        const fear = [];
        const grief = [];
        const anger = [];
        const joy = [];

        country.map(emotion => {
            if (emotion.emotion === emotionCategories.FEAR) {
                fear.push(emotion.value)
            }
            if (emotion.emotion === emotionCategories.ANGER) {
                anger.push(emotion.value)
            }
            if (emotion.emotion === emotionCategories.GRIEF) {
                grief.push(emotion.value)
            }
            if (emotion.emotion === emotionCategories.JOY) {
                joy.push(emotion.value)
            }
        });

        const sums = [
            {
                name: emotionCategories.FEAR,
                value: fear.length ? fear.reduce((a, b) => a + b, 0) * fear.length : 0,
                length: fear.length,
            },
            {
                name: emotionCategories.ANGER,
                value: anger.length ? anger.reduce((a, b) => a + b, 0) * anger.length : 0,
                length: anger.length,
            },
            {
                name: emotionCategories.GRIEF,
                value: grief.length ? grief.reduce((a, b) => a + b, 0) * grief.length : 0,
                length: grief.length,
            },
            {
                name: emotionCategories.JOY,
                value: joy.length ? joy.reduce((a, b) => a + b, 0) * joy.length : 0,
                length: joy.length,
            },
        ];
        const dominantEmotion = sums.reduce((max, emotion) => max.value > emotion.value ? max : emotion);
        features[index]["emotion"] = dominantEmotion.name;
        features[index]["values"] = dominantEmotion.value;
        features[index]["distribution"] = sums;

    });
    return features
};

exports.defineEmotionMeans = functions.firestore
    .document('functionstrigger/{timestamp}')
    .onWrite((change, context) => {
        admin
            .firestore()
            .collection("emotionmeans")
            .orderBy("time", "desc")
            .limit(1)
            .get()
            .then(querySnapshot => {
                let oldMeans = querySnapshot.docs[0].data()
                const oldfeatures = oldMeans.features;
                console.log("data", oldfeatures);

                var now = Date.now();
                var nowRound = Math.round(now);
                const last4Weeks = nowRound - 2419200000;
                return admin.firestore()
                    .collection('emotions')
                    .where("time", ">=", last4Weeks)
                    .get()
                    .then((querySnapshot) => {
                        let emotionData = [];
                        querySnapshot.forEach(doc => {
                            emotionData.push(doc.data());
                        });

                        //console.log("emotionfunction", emotionsToCountries(emotionData, oldfeatures))
                        let newFeatures = emotionsToCountries(emotionData, oldfeatures)
                        console.log("newfeatures", newFeatures);

                        let newMeans = {
                            features: newFeatures,
                            time: Date.now(),
                            emotions: emotionData
                        };
                        console.log("sendemotionfeatures", newMeans)
                        admin
                            .firestore()
                            .collection('emotionmeans')
                            .doc()
                            .set(newMeans);
                        return newMeans
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    });


const moodsToCountries = (moodData, features) => {
    const moodCountries = [];
    for (let x = 0; x < 190; x++) {
        moodCountries.push([])
    }

    let germany = [];
    moodData.map(item => {
        let countryIndex;
        if (item.geo) {
            countryIndex = features.findIndex((feature) => feature.name === item.geo.country)
            if(item.geo.country === "Germany"){
                germany.push(item.value)
            }
            if (countryIndex !== -1 && item.geo.country !== "Germany") {
                moodCountries[countryIndex].push(item.value)
            }
        }
    });


    /*console.log("gind", germanyIndices );
    germanyIndices.forEach((region, index) =>
    {moodCountries[index].push(germanyMean);
        console.log("gval", germanyMean, );
        console.log("gco", moodCountries[index], )
        console.log("gfe", features[index])
    })*/



    //Germany
    moodCountries.map(((country, index) => {
        let mean = country.reduce((a, b) => a + b, 0) / country.length
        mean = isNaN(mean) ? 50 : mean;
        features[index]["mood"] = mean;
    }))

    const germanyMean = germany.reduce((a,b) => a + b, 0) / germany.length
    features.filter(feature => feature.name === "Germany").forEach(((country, index) => {
        features[index]["mood"] = germanyMean;
    }));

    return features
}

const moodMeansPerDay = items => {

    console.log("calcstart", items);
    var now = Date.now();
    var nowRound = Math.round(now);

    const day = 86400000;
    const dayArray = [];
    const valuesPerDayArray = [];

    //TODO: expand to 31 days
    for (let x = 7; x >= 0; x--) {
        dayArray.push(new Date(nowRound - x * day));
        valuesPerDayArray.push([]);
    }

    for (let x = 0; x < items.length; x++) {
        for (let i = 0; i < dayArray.length; i++) {
            if (
                dayArray[i].getDate() === new Date(items[x].time).getDate() &&
                dayArray[i].getMonth() === new Date(items[x].time).getMonth()
            ) {
                valuesPerDayArray[i].push(items[x].value);
            }
        }
    }

    let meansPerDay = [];
    for (let x = 0; x < valuesPerDayArray.length; x++) {
        let sum = 0;
        for (let i = 0; i < valuesPerDayArray[x].length; i++) {
            sum += valuesPerDayArray[x][i];
        }
        let mean = sum / valuesPerDayArray[x].length;
        if (isNaN(mean)) {
            mean = 50;
        }
        meansPerDay.push(mean);
    }
    const labels = dayArray.map(date => date.getDate() + ".");
    return { labels: labels, data: meansPerDay };
};

exports.defineMoodMeans = functions.firestore
    .document('functionstrigger/{timestamp}')
    .onWrite((change, context) => {
        admin
            .firestore()
            .collection("moodmeans")
            .orderBy("time", "desc")
            .limit(1)
            .get()
            .then(querySnapshot => {
                let oldMeans = querySnapshot.docs[0].data()
                const oldfeatures = oldMeans.features;
                console.log("data", oldfeatures);

                var now = Date.now();
                var nowRound = Math.round(now);
                const last4Weeks = nowRound - 2419200000 / 4;
                return admin.firestore()
                    .collection('mood')
                    .where("time", ">=", last4Weeks)
                    .get()
                    .then((querySnapshot) => {
                        let moodData = [];
                        querySnapshot.forEach(doc => {
                            moodData.push(doc.data());
                        });

                        //console.log("moodfunction", moodsToCountries(moodData, oldfeatures))

                        let moodMeans = moodMeansPerDay(moodData)
                        let newFeatures = moodsToCountries(moodData, oldfeatures)
                        console.log("mooooods", moodMeans, newFeatures);

                        let newMeans = {
                            features: newFeatures,
                            time: Date.now(),
                            meansPerDay: moodMeans,
                        };
                        console.log("sendfeatures", newMeans)
                        admin
                            .firestore()
                            .collection('moodmeans')
                            .doc()
                            .set(newMeans);
                        return newMeans
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    });


/*exports.writeToFirestore = functions.firestore
    .document('some/doc')
    .onWrite((change, context) => {
        db.doc('some/otherdoc').set({ test: "sdf" });
    });*/


/*exports.updateLikeCount = functions.firestore
    .document('functionstrigger').onWrite((event) => {
        return admin.firestore()
            .collection('emotions')
            .get()
            .then((querySnapshot) => {
                let data = [];
                querySnapshot.forEach(doc => {
                    data.push(doc.data());
                });
                return console.log("data",data);
            })
            /!*.catch(function (error) {
                return console.log("Error getting documents: ", error);
            });*!/
    });*/
