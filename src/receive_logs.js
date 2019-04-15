var amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:admin@192.168.99.100:5672', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue('logs', { durable: true }, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

    //   ch.consume(q.queue, function(msg) {
    //     if(msg.content) {
    //         console.log(" [x] %s", msg.content.toString());
    //     }
    //   }, {noAck: true});
    });
  });
});