const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const kafka = require('kafka-node');

const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'});
const producer = new kafka.Producer(client);

exports.createToken = function(client){
    let payload = {
        sub: client.account_id,
        iat: moment().unix(),
        exp: moment().add(14,"days").unix()
    }
    return jwt.sign(payload, `${process.env.TOKEN_KEY}`);
}

exports.validatedToken = function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        jwt.verify(req.token, `${process.env.KEY}`, (err, data) => {
            if(err) {
                res.status(403).json({error: 'Unauthorized'});
            } else {
                console.log('Access successful');
                next();
            }
        });
    } else {
        res.status(403).json({error: 'Token not found'});
    }
}

exports.getBalance = async function (param) {
    try {
        const getBalance = await fetch('https://apigesbanc.herokuapp.com/api/v1/checkbalance/' + param, {
            method: 'GET',
            headers: {"Content-Type":"application/json"}
        });
        return await getBalance.json();
    } catch (error) {
        throw error;
    }
}

exports.sendBalance = async (param, account_id) => {
    try {
        const rawResponse = await fetch('https://apigesbanc.herokuapp.com/api/v1/updateamount/' + account_id, {
            method: 'PUT',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(param)
        });
        return await rawResponse.json();
    } catch (error) {
        throw error;
    }
}

exports.sendBalance_v2 = async function (params, account_id) {
    let payloads = [
        {
            topic: 'test',
            messages: params
        }
    ];
    await producer.connect();
    producer.on('ready', function() {
        let push_message = producer.send(payloads, (err, data) => {
            if(err) { console.log('[kafka-producer -> test]: borker failed'); }
            else { console.log('[kafka-producer -> test]: borker success'); }
        });
        console.log(push_message);
    })
}

exports.getToken = async()=>{
    try {
        const getToken = await fetch('https://gestion-logs-integracion2020.herokuapp.com/api/v2/jwt', {
            method: 'GET',
            headers: {"Content-Type":"application/json"}
        });
        return  await getToken.json();
    } catch (error) {
        throw error;
    }
}

exports.log = async(params, token)=>{
    try {
        const res = await fetch('https://gestion-logs-integracion2020.herokuapp.com/api/v2/log/add', {
            method: 'POST',
            headers: {"Content-Type":"application/json","Authorization":"jwt "+token.token},
            body: JSON.stringify(params)
        });
        /* .then(response => response.json())
        .then(response => console.log(response)); */
        //console.log(await res.json());
        return await res.json();
    } catch (error) {
        throw error;
    }
}

exports.empty = function(amount, account_id) {
    return (amount.length != 0 && account_id.length != 0) ? true : false;
}