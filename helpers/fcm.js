const FCM = require('fcm-node');
import config from '../config.json';

let fcmService = {};
fcmService.fcm = {};

fcmService.sendMessage = function(token, title, body, url) {
    fcmService.fcm = new FCM(config.firebase.fcm.key);
    let message = {
        to: token,
        // notification: {
        //     title: title,
        //     body: body
        // },
        // data: {
        //     title: title,
        //     body: body,
        //     url: url
        // },
        // android: {
        //     ttl: 3600 * 1000,
        //     priority: 'high'
        // },
        priority: "high",
        restricted_package_name: "",
        data: {
            url: url,
            body: "You've successfully attended the 'dfgdsfg' event and soon you will receive the point.",
            title: "Event attend confirmation",
            badge: 1,
            sound: "default",
            "content-available": "1"
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