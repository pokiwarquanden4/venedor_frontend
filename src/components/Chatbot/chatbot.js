import React, { useMemo, useState } from 'react';
import { Chatbot as ChatbotComponent, createChatBotMessage, createCustomMessage } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css'
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import styles from './chatbot.module.scss'
import { ChatbotIcon } from '../../asset/img/ItemsIcon';
import ProductOverView from './chatbotProductOverview';

function Chatbot() {
    const [showChat, setShowChat] = useState(false)

    const config = {
        botName: "Venedor",
        initialMessages: [
            createChatBotMessage(
                `Xin chào! 😊 Tôi là trợ lý mua sắm của bạn. Hãy cho tôi biết bạn đang tìm kiếm sản phẩm gì – theo giá, thương hiệu, khuyến mãi hay độ phổ biến? Tôi sẽ giúp bạn tìm được lựa chọn phù hợp nhất! 🚀`
            ),
        ],
        widgets: [
            {
                widgetName: 'dogPicture',
                widgetFunc: (props) => <ProductOverView {...props} />,
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
            width: "1000px",  // Thay đổi chiều rộng
            height: "600px", // Thay đổi chiều cao
        }
    };

    const chatbotMemoized = useMemo(() => (
        <div className={`${styles.chatbot} ${!showChat ? styles.invisible : undefined}`}>
            <ChatbotComponent
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
            />
        </div>
    ), [showChat]);

    return (
        <div className={styles.container}>
            <div className={styles.chatbot_icon}>
                <ChatbotIcon onClick={() => setShowChat(!showChat)}></ChatbotIcon>
                {chatbotMemoized}
            </div>
        </div>
    );
}

export default Chatbot;