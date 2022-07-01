import moment from "moment";

const generateTimeForChat = timestamp =>{
    const time = moment(timestamp).fromNow(); // like `2 days ago`
    return time;
}

export {generateTimeForChat};