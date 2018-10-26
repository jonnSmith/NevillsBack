const FCM = require('fcm-node');
import config from '../config.json';

let fcmService = {};
fcmService.fcm = {};

fcmService.sendMessage = function(token, title, body, url) {
    fcmService.fcm = new FCM(config.firebase.fcm.key);
    let message = {
        to: token,
        priority: "high",
        restricted_package_name: "",
        data: {
            url: url,
            body: body,
            title: title,
            badge: 1,
            sound: "ring.mp3",
            soundName: "ring.mp3"
        }
    };
    console.log('message', message);
    fcmService.fcm.send(message, function(err, response){
        if (err) {
            console.log('fcm error', err);
            return err;
        } else {
            console.log('fcm response', response);
            return response;
        }
    });
};

module.exports = fcmService;