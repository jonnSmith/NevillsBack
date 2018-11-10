const FCM = require('fcm-node');
import config from '../config.json';

let fcmService = {};
fcmService.fcm = {};

fcmService.sendMessage = function(token, title, body, url, image) {
    fcmService.fcm = new FCM(config.firebase.fcm.key);
    let message = {
        to: token,
        priority: "high",
        restricted_package_name: "",
        data: {
            url: url,
            body: body,
            title: title,
            image: 'https://raw.githubusercontent.com/jonnSmith/Nevills/master/resources/android/icon/drawable-hdpi-icon.png',
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