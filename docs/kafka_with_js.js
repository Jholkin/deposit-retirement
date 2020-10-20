// crear un topic en kafka
// docker exec -it name-container bash
// kafka-topics --zookeeper localhost:2181 --create --topic name-topic --partitions 1 --replication-factor 1

/**
 * Step 1: install package -> kafkajs
 * 
 * Step 2: requerimos el paquete
 */
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9091']
});

// producer
const producer = kafka.producer();

await producer.connect();
await producer.send({
    topic: 'test',
    messages: [
        { value: JSON.stringify(data) }
    ],
})

// consumer
const consumer = kafka.consumer({groupId: 'test-group'});

const run = async()=>{
    await consumer.connect();
    await consumer.subscribe({ topic: 'test', fromBeginning: true });

    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString()
            });
        }
    })
}