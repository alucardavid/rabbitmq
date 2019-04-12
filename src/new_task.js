let amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:admin@192.168.99.100:5672', (err, conn) => {
    console.log(`Connect Error: ${err}`);

    try {
        conn.createChannel((err, ch) => {
            console.log(`CreateChannel Error: ${err}`);
            
            let q = 'task_queue';
            let msg = process.argv.slice(2).join(' ') || 'Hello World.......';
            
            ch.assertQueue(q, { durable: true })
            ch.sendToQueue(q, new Buffer.from(msg), { persistent: true });
            console.log(msg);
                        
        });

        setTimeout(function() { conn.close(); process.exit(0) }, 500);
        
    } catch (error) {
        console.log(`Catch: ${err}`);
        
    }
})