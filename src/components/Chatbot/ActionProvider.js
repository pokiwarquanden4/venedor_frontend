import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageSelector } from '../../redux/selectors/messageSelector/messageSelector';
import { messageActions } from '../../redux/actions/message/messageActions';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const dispatch = useDispatch();
    const chatbotData = useSelector(messageSelector)
    const [cacheMessage, setCacheMessage] = useState([])

    const cacheMessageFunc = useCallback((message, role) => {
        setCacheMessage((preData) => {
            return [
                ...preData,
                {
                    role: role,
                    content: message
                }
            ]
        })

    }, [])

    useEffect(() => {
        if (!chatbotData.chatbotMessages) return
        cacheMessageFunc(chatbotData.chatbotMessages.message, 'assistant')

        const botMessage = createChatBotMessage(chatbotData.chatbotMessages.message);
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));

        if (chatbotData.chatbotMessages.products) {
            chatbotData.chatbotMessages.products.forEach((product, index) => {
                const botMessage = createChatBotMessage(`Sản phẩm số ${index + 1}`, {
                    widget: 'dogPicture',
                    payload: product,
                })

                setState((prev) => ({
                    ...prev,
                    messages: [...prev.messages, botMessage],
                }));
            })
        }
    }, [chatbotData.chatbotMessages])

    const handleNewUserMessage = (newMessage) => {
        cacheMessageFunc(newMessage, 'user')
        dispatch(messageActions.createChatbotRequest({
            message: newMessage,
            cacheMessage: cacheMessage
        }))
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleNewUserMessage
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;