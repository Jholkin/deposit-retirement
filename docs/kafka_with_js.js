/**
 * Step 1: install package -> kafka-node
 * 
 * Step 2: requerimos el paquete
 */
const kafka = require('kafka-node');

// declara el cliente kafka
const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'});

// consumidor
let consumer = new kafka.Consumer(client, [{topic: 'test'}]);

consumer.on('message', function (message) {
    console.log(message);
});

// productor
let producer = new kafka.Producer(client);

producer.on('ready', function () {
    setInterval(function() {
        producer.send([{topic: "test", messages: "mensaje automática cada 5 seg."}], function(err, data){})
    }, 5000)
});