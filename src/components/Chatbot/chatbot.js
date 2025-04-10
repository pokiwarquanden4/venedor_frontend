import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Chatbot as ChatbotComponent, createChatBotMessage } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import styles from './chatbot.module.scss';
import { ChatbotIcon } from '../../asset/img/ItemsIcon';
import ProductOverView from './chatbotProductOverview';
import ChatbotSpecific from './chatbotSpecific';

const config = {
    botName: "Venedor",
    initialMessages: [
        createChatBotMessage(
            `Xin chào! 😊 Tôi là trợ lý mua sắm của bạn. Hãy cho tôi biết bạn đang tìm kiếm sản phẩm gì – theo giá, thương hiệu, khuyến mãi hay độ phổ biến? Tôi sẽ giúp bạn tìm được lựa chọn phù hợp nhất! 🚀`
        ),
    ],
    widgets: [
        {
            widgetName: 'productoverview',
            widgetFunc: (props) => <ProductOverView {...props} />,
        },
        {
            widgetName: 'specific',
            widgetFunc: (props) => <ChatbotSpecific {...props} />,
        },
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: '#376B7E',
        },
        chatButton: {
            backgroundColor: 'rgb(13, 60, 85)',
        },
    },
    chatContainer: {
        width: "1000px", // Thay đổi chiều rộng
        height: "600px", // Thay đổi chiều cao
    }
};

function Chatbot() {
    const [showChat, setShowChat] = useState(false);
    const chatRef = useRef(null); // Reference to chatbot wrapper


    // Close chatbot when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setShowChat(false);
            }
        }

        if (showChat) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showChat]);

    const chatbotMemoized = useMemo(() => {
        return (
            <div ref={chatRef} className={`${styles.chatbot} ${!showChat ? styles.invisible : undefined}`}>
                <ChatbotComponent
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />
            </div>
        )
    }, [showChat]);

    return (
        <div className={styles.container}>
            <div ref={chatRef} className={styles.chatbot_icon}>
                <ChatbotIcon onClick={() => setShowChat(!showChat)} />
                {chatbotMemoized}
            </div>
        </div>
    );
}

export default Chatbot;
