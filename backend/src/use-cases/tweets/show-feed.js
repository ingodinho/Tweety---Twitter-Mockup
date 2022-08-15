import { TweetsDAO } from "../../db-access";

async function showFeed() {
    const allTweeds = await TweetsDAO.findAll();
    return allTweeds;
}

module.exports = {
    showFeed,
}