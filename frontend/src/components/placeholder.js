export const placeHolderTweet = {
    _id: 'Moini',
    postedBy: 2389238923829,
    createdAt: Date.now(),
    content: `"Wichtig ist, dass er jetzt eine klare Linie in sein Leben bringt." (Lothar Matthäus zum Kokaingeständnis von Christoph Daum)\n
        "Ein Wort gab das andere - wir hatten uns nichts zu sagen." (Matthäus über einen Zwist)
        `,
    likes: ['2389238239', '2343223423423', '234142134214231', '234184237u92431'],
    retweets: [
        '2389238239',
        '2343223423423',
        '234142134214231',
        '234184237u92431',
    ],
    imgLink:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF7LIArb6-64JPs8ja6YsyFpYJCczZf8R-VA&usqp=CAU',
    replies: [
        {
            replyId: 23423243,
            createdAt: Date.now(),
            postedBy: 1231231213,
            content: 'Dies ist eine Antwort',
            likes: [
                '2389238239',
                '2343223423423',
                '234142134214231',
                '234184237u92431',
            ],
            imgLink: null,
        },
    ],
};

export const placeHolderUser = {
    firstName: 'Lothar',
    lastName: 'Matthäus',
    userName: 'loddar',
    imgLink: undefined,
    bannerLink: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
    following: [123123123,12341234,1234,2134,2135,1],
    followedBy: [12312312,413242,12342,1234,12342134,13412],
    createdAt: Date.now()
};