const FCM = require('fcm-node');
import config from '../config.json';

let fcmService = {};
fcmService.fcm = {};

fcmService.sendMessage = function(registration_ids, title, body, url) {
    fcmService.fcm = new FCM(config.firebase.fcm.key);
    let message = {
        registration_ids: registration_ids,
        collapse_key: 'Updates Available',
        notification: {
            title: title,
            body: body
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