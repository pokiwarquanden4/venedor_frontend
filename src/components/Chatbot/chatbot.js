import React, { useCallback, useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { useDispatch } from 'react-redux';
import { messageActions } from '../../redux/actions/message/messageActions';
import { useSelector } from 'react-redux';
import { messageSelector } from '../../redux/selectors/messageSelector/messageSelector';

function Chatbot() {
    const dispatch = useDispatch();
    const chatbotData = useSelector(messageSelector)
    const [cacheMessage, setCacheMessage] = useState([])

    const addMessage = useCallback((message, role) => {
        setCacheMessage((preData) => {
            return [
                ...preData,
                {
                    role: role,
                    content: message
                }
            ]
        })

        if (role === 'assistant') addResponseMessage(message)
    }, [])

    useEffect(() => {
        addMessage('Xin chào! 😊 Tôi là trợ lý mua sắm của bạn. Hãy cho tôi biết bạn đang tìm kiếm sản phẩm gì – theo giá, thương hiệu, khuyến mãi hay độ phổ biến? Tôi sẽ giúp bạn tìm được lựa chọn phù hợp nhất! 🚀', 'assistant')
    }, []);

    const handleNewUserMessage = (newMessage) => {
        addMessage(newMessage, 'user')
        dispatch(messageActions.createChatbotRequest({
            message: newMessage,
            cacheMessage: cacheMessage
        }))
    };

    useEffect(() => {
        if (!chatbotData.chatbotMessages) return
        addMessage(chatbotData.chatbotMessages.message, 'assistant')
    }, [chatbotData.chatbotMessages])

    return (
        <Widget
            handleNewUserMessage={handleNewUserMessage}
        />
    );
}

export default Chatbot;