import crypto from 'crypto';

export const createHash = input => {
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    return hash;
};

export const createRandomHash = () => {
    return hash(Math.random().toString());
};