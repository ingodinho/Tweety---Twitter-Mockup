import crypto from 'crypto';

export const hash = input => {
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    return hash;
};

export const createRandomHash = () => {
    return hash(Math.random().toString());
};