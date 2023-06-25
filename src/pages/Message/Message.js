import DefaultAvatar from '../../components/DefaultAvatar/DefaultAvatar';
import styles from './Message.module.scss';
import { MessageIcon } from '../../asset/img/HeaderIcon';
import { Fragment, useCallback, useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { messageActions } from '../../redux/actions/message/messageActions';
import { messageSelector } from '../../redux/selectors/messageSelector/messageSelector';
import ScrollToBottom from 'react-scroll-to-bottom';
import { LoginSelector } from '../../redux/selectors/accountSelector/LoginSelector';

function Message() {
  const socket = io.connect(process.env.REACT_APP_URL);
  const dispatch = useDispatch();
  const loginSelect = useSelector(LoginSelector);
  const messageSelect = useSelector(messageSelector);
  const [messageList, setMessageList] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();
  const messageRef = useRef();
  const [input, setInput] = useState('');

  const convertTime = useCallback((timestamp) => {
    const currentDate = new Date();
    const inputDate = new Date(timestamp);

    const currentYear = currentDate.getFullYear();
    const inputYear = inputDate.getFullYear();

    const isCurrentDay = currentDate.toDateString() === inputDate.toDateString();
    const isCurrentYear = currentYear === inputYear;

    let formattedDate = '';

    if (isCurrentDay) {
      const hours = inputDate.getHours();
      const minutes = inputDate.getMinutes();
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const period = hours >= 12 ? 'PM' : 'AM';
      formattedDate = `${formattedHours}:${formattedMinutes} ${period}`;
    } else if (isCurrentYear) {
      const month = inputDate.getMonth() + 1; // Months are zero-based
      const day = inputDate.getDate();
      formattedDate = `${day}/${month}`;
    } else {
      const year = inputDate.getFullYear();
      const month = inputDate.getMonth() + 1; // Months are zero-based
      const day = inputDate.getDate();
      formattedDate = `${day}/${month}/${year}`;
    }

    return formattedDate;
  });

  const checkTimeGap = useCallback((time1, time2) => {
    var time1Convert = new Date(time1);
    var time2Convert = new Date(time2);

    var diffInMinutes = Math.abs((time1Convert.getTime() - time2Convert.getTime()) / (1000 * 60));
    return diffInMinutes >= 10;
  });

  useEffect(() => {
    dispatch(messageActions.getAllRoomChatRequest());
  }, []);
  useEffect(() => {
    setRooms(messageSelect.listRoom);
  }, [messageSelect.listRoom]);

  useEffect(() => {
    if (currentRoom !== undefined) {
      dispatch(
        messageActions.getMessageByRoomChatRequest({
          id: rooms[currentRoom].id,
        })
      );
      socket.emit('join_room', rooms[currentRoom].id);
    }
  }, [currentRoom]);
  useEffect(() => {
    setMessageList(messageSelect.messages);
  }, [messageSelect.messages]);

  const sendMessage = useCallback(async () => {
    if (rooms[currentRoom].id && loginSelect.loginRole && input) {
      const data = {
        roomId: rooms[currentRoom].id,
        isSeller: loginSelect.loginRole === 'User' ? false : true,
        content: input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await socket.emit('send_message', data);
      setInput('');
    }
  });

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((messageList) => [...messageList, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (currentRoom !== undefined) {
      if (input) {
        messageRef.current.classList.add(`${styles.sendMessage_active}`);
        messageRef.current.classList.remove(`${styles.sendMessage_inActive}`);
      } else {
        messageRef.current.classList.add(`${styles.sendMessage_inActive}`);
        messageRef.current.classList.remove(`${styles.sendMessage_active}`);
      }
    }
  }, [input]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.left_content}>
          <div className={styles.left_header}>
            <div className={styles.left_header_title}>Message</div>
          </div>
          <div className={styles.left_items}>
            {rooms.length !== 0 ? (
              <div className={styles.users}>
                {rooms.map((item, index) => {
                  return (
                    <div
                      className={`${styles.user} ${currentRoom === index ? styles.userFocus : ''}`}
                      key={index}
                      onClick={() => {
                        socket.emit('exit_room', rooms[currentRoom].id);
                        setCurrentRoom(index);
                      }}
                    >
                      <DefaultAvatar title={item.guestName.charAt(0)} size={60}></DefaultAvatar>
                      <div className={styles.users_content}>
                        <div className={styles.name}>{item.guestName}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.notification}>You don't have any message</div>
            )}
          </div>
        </div>
        <div className={styles.right_content}>
          {currentRoom !== undefined && (
            <Fragment>
              <div className={styles.right_content_header}>
                <DefaultAvatar
                  title={rooms[currentRoom].guestName.charAt(0)}
                  size={50}
                ></DefaultAvatar>
                <div className={styles.right_name}>
                  <div className={styles.right_name_main}>{rooms[currentRoom].guestName}</div>
                  <div className={styles.right_name_sub}>{rooms[currentRoom].userName}</div>
                </div>
              </div>
              <div className={styles.right_content_body}>
                <ScrollToBottom className={styles.messages}>
                  {messageList.length !== 0 &&
                    messageList.map((item, index) => {
                      return (
                        <div className={styles.message} key={index}>
                          {index === 0 ? (
                            <div className={styles.message_time}>{convertTime(item.createdAt)}</div>
                          ) : checkTimeGap(item.createdAt, messageList[index - 1].createdAt) ? (
                            <div className={styles.message_time}>{convertTime(item.createdAt)}</div>
                          ) : undefined}
                          {loginSelect.loginRole === 'User' ? (
                            item.isSeller ? (
                              <div className={styles.message_content_guest}>
                                <DefaultAvatar
                                  title={rooms[currentRoom].guestName.charAt(0)}
                                  size={30}
                                ></DefaultAvatar>
                                <div className={styles.message_content_value}>{item.content}</div>
                              </div>
                            ) : (
                              <div className={styles.message_content_me}>
                                <div className={styles.message_content_value}>{item.content}</div>
                                <DefaultAvatar
                                  title={rooms[currentRoom].userName.charAt(0)}
                                  size={30}
                                ></DefaultAvatar>
                              </div>
                            )
                          ) : !item.isSeller ? (
                            <div className={styles.message_content_guest}>
                              <DefaultAvatar
                                title={rooms[currentRoom].guestName.charAt(0)}
                                size={30}
                              ></DefaultAvatar>
                              <div className={styles.message_content_value}>{item.content}</div>
                            </div>
                          ) : (
                            <div className={styles.message_content_me}>
                              <div className={styles.message_content_value}>{item.content}</div>
                              <DefaultAvatar
                                title={rooms[currentRoom].userName.charAt(0)}
                                size={30}
                              ></DefaultAvatar>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </ScrollToBottom>
              </div>
              <div className={styles.right_content_footer}>
                <input
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                  className={styles.message_input}
                  placeholder="Send Message"
                ></input>
                <div
                  className={styles.sendMessage_inActive}
                  ref={messageRef}
                  onClick={() => {
                    sendMessage();
                  }}
                >
                  <MessageIcon></MessageIcon>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
