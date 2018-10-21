const FCM = require('fcm-node');
import config from '../config.json';

let fcmService = {};
fcmService.fcm = {};

fcmService.sendMessage = function(token, title, body, url) {
    fcmService.fcm = new FCM(config.firebase.fcm.key);
    let message = {
        token: token,
        notification: {
            title: title,
            body: body,
            sound: "default"
        },
        data: {
            url: url
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