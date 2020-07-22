'use strict';
const crypto = require('crypto');
let SETTINGS = {
    key : '',
    sha : 'sha256',
    mode : 'AES-256-CBC'
};

/**
 * Create payload encrypted with master key.
 * Payload contains: iv, value, mac
 * @param {String} data to be encrypted
 * @return {String} Base64 encdoded payload
 */
function encrypt(data, key) {

    //Set key to settings
    SETTINGS.key = new Buffer.from(key);
    //SETTINGS.key = Buffer.from(key.substring(7), 'base64');

    let serializedValue = hashSerialize(data);

    try{

        let _iv = crypto.randomBytes(16);
        //console.log(_iv);
        let base64_iv = _iv.toString('base64');

        let cipher = crypto.createCipheriv(SETTINGS.mode, SETTINGS.key, _iv);

        let encrypted = cipher.update(serializedValue, 'utf8', 'base64');

        encrypted += cipher.final('base64');

        let _mac = hash(base64_iv, encrypted);

        let payloadObject = {
            'iv' : base64_iv,
            'value' : encrypted,
            'mac' : _mac
        };

        let _payload = JSON.stringify(payloadObject);

        let base64_payload = Buffer.from(_payload).toString('base64');

        return base64_payload;
    }
    catch(e){
        throw new Error('Cannot encrypt data provided !');
    }

}


function hashSerialize(data){
    if(typeof data !== 'string'){
        throw new Error('Data to be serialized must be type of string !');
    }
    let str = String(data);
    return 's:'+str.length+':"'+str+'";';
}

/**
 * Hash function.
 * Combines initialization vector (iv) with data to be hashed (value).
 * Uses master key to hash results
 * @param {String} iv Initialization vector
 * @param {String} value Data
 */
function hash(iv, value){
    if(iv === undefined || iv === ''){
        throw new Error('Iv is not defined !');
    }
    if(value === undefined || value === ''){
        throw new Error('Value is not defined !');
    }
    let data = String(iv) + String(value);
    return hashHmac(data, SETTINGS.key);
}

/**
 * Crypto function to hash data with given key
 * @param {String} data
 * @param {String} key
 */
function hashHmac(data, key){
    let hmac = crypto.createHmac(SETTINGS.sha, key);
    hmac.update(data);
    return hmac.digest('hex');
}

module.exports = { encrypt, hash };


