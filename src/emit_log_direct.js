var amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:admin@192.168.99.100:5672', (err, conn) => {
    conn.createChannel((err, ch) => {
        console.log(process.argv);

        let ex = 'direct_logs',
            args = process.argv.slice(2),
            msg = args.slice(1).join(' ') || 'Hello World!',
            severity = (args.length > 0) ? args[0] : 'info';

        ch.assertExchange(ex, 'direct', { durable: false });
        ch.publish(ex, severity, new Buffer.from(msg));

        console.log(` [x] Sent ${severity}: '${msg}'`);
        
    });

    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});