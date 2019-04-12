var amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:admin@192.168.99.100:5672', (err, conn) => {
    conn.createChannel((err,ch) => {
        var q = 'foo';

        console.log(`[*] Waiting for messages in ${q}. To exit press CTRL+C`);
        ch.consume(q, msg => {
            // console.log(`[x] Received ${msg.content}`);
            console.log(JSON.parse(msg.content.toString()));
            
        }, {noAck: true});
    });
});