const FCM = require('fcm-node');
import config from '../config.json';

let fcmService = {};
fcmService.fcm = {};

fcmService.sendMessage = function(token, title, body, url) {
    fcmService.fcm = new FCM(config.firebase.fcm.key);
    let message = {
        to: token,
        notification: {
        },
        data: {
            title: title,
            body: body,
            url: url
        },
        android: {
            ttl: 0,
            priority: 'high',
            click_action: 'FCM_PLUGIN_ACTIVITY'
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