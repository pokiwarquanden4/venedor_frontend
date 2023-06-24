import styles from './DefaultAvatar.module.scss';

function DefaultAvatar({ title, size }) {
  return (
    <div className={styles.avatar}>
      <span
        className={styles.initial}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {title}
      </span>
    </div>
  );
}

export default DefaultAvatar;
