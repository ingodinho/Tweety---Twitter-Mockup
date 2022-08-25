import {atom, atomFamily} from 'recoil';
import socketIO from "socket.io-client"
import {apiLink} from "./apiLink";

export const loggedInUser = atom({
    key: 'loggedInUser',
    default: null
})

export const slideInMenu = atom({
    key: 'slideInMenu',
    default: false
})

export const handleModal = atom({
    key: 'handleModal',
    default: false,
})

export const modalId = atom({
    key: 'modalId',
    default: null
})

export const forceRerender = atom({
    key: 'forceRerender',
    default: 1
})

export const messageSelectedUser = atom({
    key: 'messageSelectedUser',
    default: null
})

export const messagesState = atom({
    key: 'messagesState',
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
        postedBy: {},
        replies: [],
        replyTo: null,
        retweets: [],
        _id: null,
    }
})