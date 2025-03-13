import styles from './reviewComment.module.scss'; // Giả sử bạn dùng CSS Modules

export default function ReviewComment({ data, getInitials, timeAgo }) {
    return (
        <div className={styles.review_container}>
            <div className={styles.comment_info}>
                <div className={styles.comment_avatar}>{getInitials(data.User.name)}</div>
                <div className={styles.comment_name}>{data.User.name}</div>
                <div className={styles.comment_time}>{timeAgo(data.createdAt)}</div>
            </div>
            <div className={styles.comment_data}>
                {data.content}
            </div>
        </div>
    );
}
