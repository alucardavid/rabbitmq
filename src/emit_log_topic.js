var amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:admin@192.168.99.100:5672', (err, conn) => {
    conn.createChannel((err, ch) => {
        let ex = 'topic_logs',
            args = process.argv.slice(2),
            key = (args.length > 0) ? args[0] : 'anonymous.info',
            msg = args.slice(1).join(' ') || 'Hello World!';

        ch.assertExchange(ex, 'topic', { durable: false });
        ch.publish(ex, key, new Buffer.from(msg));

        console.log(` [x] Sent ${key}: ${msg}`);

    });

    setTimeout(() => {conn.close; process.exit(0)}, 500);
});