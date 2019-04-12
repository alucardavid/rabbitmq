var amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:admin@192.168.99.100:5672', (err, conn) => {
    conn.createChannel((err,ch) => {
        var q = 'task_queue';

        ch.assertQueue(q, {durable: true});
        ch.prefetch(2);

        console.log(`[*] Waiting for messages in ${q}. To exit press CTRL+C`);
        ch.consume(q, msg => {

            var secs = msg.content.toString().split('.').length - 1;
            
            console.log(secs);
            console.log(msg.content.toString());
                
            setTimeout(() => {
                console.log(` [x] Done`);
                ch.ack(msg);
                
            }, secs * 1000);
        }, {noAck: false});
    });
});