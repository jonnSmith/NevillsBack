import firebase from "firebase";
import config from '../config.json'

firebase.initializeApp(config.firebase.config);
let dbService = {};
dbService.db = firebase.database();

dbService.writeData = function(layer, id, data) {
    return this.db.database().ref(layer + '/' + id).set(data);
};

dbService.readData = function(layer) {
    return firebase.database().ref(layer).once('value').then(function(snapshot) { return snapshot.val(); });
};

dbService.deleteItem = function(layer, id) {
    return firebase.database().ref(layer + '/' + id).remove();
};

module.exports = dbService;
