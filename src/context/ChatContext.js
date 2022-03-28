import React, { createContext, useState } from 'react'


const ChatContext = createContext({});
/*
{
        user: {
            name: '',
            image: '',
            email: '',
        },
        messages: [{
            senderID: 'r@gmail.com',
            messageId: 47,
            message: 'Helohow r u ?',
            timestamp: '2022-02-23T10:15:01+05:30'
        }]

    }
*/



export const ChatProvider = ({ children }) => {

    const userChats = [{
        senderId:'rk@gmail.com',
        recvId:'rj@gmail.com',
        chatId:15,
        messageId:5,
        message:'Helohow r u ?',
        timestamp:'2022-02-23T10:15:01+05:30'
    }]
    const [chat, setChat] = useState(userChats);
    const [userChatData, setUserChatData] = useState([]);

    const getdata = (username,email) => {
        
        const result = chat.filter((message) => {
            return message.senderId == username && message.recvId == email || message.senderId == email && message.recvId == username
        })
        setUserChatData(result);
    }

    return (
        <ChatContext.Provider value={{ chat, setChat,getdata,userChatData,setUserChatData }}>
            {children}
        </ChatContext.Provider>
    );


}

export default ChatContext;