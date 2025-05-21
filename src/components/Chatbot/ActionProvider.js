import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageSelector } from '../../redux/selectors/messageSelector/messageSelector';
import { messageActions } from '../../redux/actions/message/messageActions';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const dispatch = useDispatch();
    const chatbotData = useSelector(messageSelector)
    const [cacheMessage, setCacheMessage] = useState([])
    const buyCache = useRef({})

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

    const onSelectSpecific = useCallback((specificDatas, selectSpecific = undefined) => {
        if (selectSpecific === 'buy') {
            buyCache.current = {}
            return
        }

        if (selectSpecific === 'cancel') {
            buyCache.current = {}
            return
        }

        if (selectSpecific) {
            buyCache.current = {
                ...buyCache.current,
                [selectSpecific.id]: selectSpecific.specific
            }

            onBuy(specificDatas)
        }
    }, [])

    const onBuy = useCallback((specificDatas) => {
        for (let i = 0; i < specificDatas.length; i++) {
            const data = specificDatas[i]
            const id = data.id
            if (!buyCache.current[id]) {
                const botMessage = createChatBotMessage(`Sản phẩm có những lựa chọn ${data.specificName} sau`, {
                    widget: 'specific',
                    payload: {
                        specificDatas: specificDatas,
                        specificData: data,
                        onSelectSpecific
                    },
                })

                setState((prev) => ({
                    ...prev,
                    messages: [...prev.messages, botMessage],
                }));

                return
            }
        }

        const botMessage = createChatBotMessage(`Bạn có muốn mua sản phẩm `, {
            widget: 'specific',
            payload: {
                specificData: {},
                onSelectSpecific
            },
        })

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));

    }, [createChatBotMessage, onSelectSpecific, setState])

    useEffect(() => {
        if (!chatbotData.chatbotMessages) return

        if (chatbotData.chatbotMessages.products) {
            if (chatbotData.chatbotMessages.products.length) {
                setCacheMessage([])
            }

            chatbotData.chatbotMessages.products.forEach((product, index) => {
                const botMessage = createChatBotMessage(`Sản phẩm số ${index + 1}`, {
                    widget: 'productoverview',
                    payload: {
                        product,
                        onBuy
                    },
                })

                setState((prev) => ({
                    ...prev,
                    messages: [...prev.messages, botMessage],
                }));
            })
        }

        const botMessage = createChatBotMessage(chatbotData.chatbotMessages.message);
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    }, [chatbotData.chatbotMessages, createChatBotMessage, onBuy, setState])

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