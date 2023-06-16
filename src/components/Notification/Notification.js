import { useEffect, useState } from 'react';
import styles from './Notification.module.scss';
import { useSelector } from 'react-redux';
import { notificationSelector } from '../../redux/selectors/notificationSelector/notificationSelector';

function Notification() {
  const notificationSelect = useSelector(notificationSelector);
  const [content, setContent] = useState();

  useEffect(() => {
    setContent(notificationSelect.content);
  }, [notificationSelect.content]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{content}</div>
      </div>
    </div>
  );
}

export default Notification;
