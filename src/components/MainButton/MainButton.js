import styles from './MainButton.module.scss';

function MainButton({ title, className, onClick, disable, active }) {
  return (
    <button
      className={`${styles.button} ${!disable ? styles.button : styles.buttonDisable} ${
        active ? styles.active : ''
      } ${className}`}
      onClick={disable ? null : onClick}
    >
      {title}
    </button>
  );
}

export default MainButton;
