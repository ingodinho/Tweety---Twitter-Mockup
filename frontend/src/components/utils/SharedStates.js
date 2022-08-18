import {atom, atomFamily} from 'recoil';

export const loggedInUser = atom({
    key: 'loggedInUser',
    default: null
})

export const tweetStateFamily = atomFamily({
    key: 'tweetsFamily',
    default: {
        content: null,
        imgLink: null,
        lastEditedAt: null,
        likes: [],
        postedAt: null,
        postedBy: {

        },
        replies: [],
        replyTo: null,
        retweets: [],
        _id: null,
    }
})