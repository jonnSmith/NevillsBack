import firebase from "firebase";
import config from '../config.json'

firebase.initializeApp(config.firebase.config);
let dbService = {};
const db = firebase.database().ref();
const events = db.child("events");


dbService.writeData = function(data, layer, id) {
    let item = db.child(layer).child(id);
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

dbService.deleteItem = function(layer, id) {
    let item = db.child(layer).child(id);
    return item.remove();
};

module.exports = dbService;
