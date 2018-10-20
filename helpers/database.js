import firebase from "firebase";
import config from '../config.json'

firebase.initializeApp(config.firebase.config);
let dbService = {};
const db = firebase.database().ref();
const events = db.child("events");


dbService.writeData = function(layer, data) {
    let item = db.child(layer).child(data.datestamp).child(data.id);
    return item.set(data);
};

dbService.readData = function(layer) {
    let rows = db.child(layer);
    return new Promise((res) => {
        rows.once("value", function (snapshot) {
            res(snapshot.val());
        });
    });
};

dbService.readDataByDatestamp = function(layer, datestamp) {
    let rows = db.child(layer).child(datestamp);
    return new Promise((res) => {
        rows.once("value", function (snapshot) {
            res(snapshot.val());
        });
    });
};

dbService.deleteItem = function(layer, data) {
    let item = db.child(layer).child(data.datestamp).child(data.id);
    return item.remove();
};

module.exports = dbService;
