import moment from "moment";

const generateTimeForChat = timestamp =>{
    return moment(timestamp).fromNow(); // like `2 days ago`
}

export {generateTimeForChat};