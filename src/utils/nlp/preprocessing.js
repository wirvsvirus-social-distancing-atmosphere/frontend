import { lemmatizer } from "lemmatizer";
import stopwords from './stopwords';
const nlp = require('compromise/builds/compromise-tokenize.js')

function toLowerCase(s) {
    return s.toLowerCase();
}

function removeStopwords(stringArray) {
    return stringArray.filter(function(s) {
        return stopwords.indexOf(s) === -1;
    });
}

function removePunctuation(s) {
    return s.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,"");
}

function tokenize(s) {
    return nlp.tokenize(s).terms().out('array');
}

function lemmatize(stringArray) {
    return stringArray.map((s) => lemmatizer(s));
}

function preprocess(s) {
    return lemmatize(removeStopwords(tokenize(toLowerCase(removePunctuation(s))))).join(' ');
}

export default preprocess;
