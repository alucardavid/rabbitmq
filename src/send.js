let amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:admin@192.168.99.100:5672', (err, conn) => {
    console.log(`Connect Error: ${err}`);

    try {
        conn.createChannel((err, ch) => {
            console.log(`CreateChannel Error: ${err}`);
            let q = 'foo';
            
            var msg = ({
                        name: 'David', 
                        birth: '02/10/1989'
                         });
            //ch.assertQueue(q, { durable: false });
            ch.sendToQueue(q, new Buffer.from(JSON.stringify(msg)));
            console.log(msg);
                        
        });

        setTimeout(function() { conn.close(); process.exit(0) }, 500);
        
    } catch (error) {
        console.log(`Catch: ${err}`);
        
    }
})