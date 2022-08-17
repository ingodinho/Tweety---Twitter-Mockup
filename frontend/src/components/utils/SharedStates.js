import {atom, atomFamily} from 'recoil';

export const loggedInUser = atom({
    key: 'loggedInUser',
    default: ''
})

export const tweetStateFamily = atomFamily({
    key: '',
    default: {
        content: null,
        imgLink: null,
        lastEditedAt: null,
        likes: [],
        postedAt: null,
        postedBy: null,
        replies: [],
        replyTo: null,
        retweets: [],
        _id: null
    }
})