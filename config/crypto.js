import crypto from 'crypto';

const generateNewRandomWithLength = (len = 30)=>{
    return crypto.randomBytes(len).toString('hex');
}

export default  generateNewRandomWithLength;