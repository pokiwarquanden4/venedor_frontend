import { useCallback, useState } from 'react';
import styles from './Comment.module.scss'; // Giả sử bạn dùng CSS Modules
import ReviewComment from './reviewComment';
import { use } from 'react';
import { useDispatch } from 'react-redux';
import { productActions } from '../../redux/actions/product/ProductActions';

// Tạo component Star riêng
const Star = () => (
    <svg
        className={styles.star_icon}
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        width="20px"
        viewBox="0 0 47.94 47.94"
    >
        <path
            fill="#ED8A19"
            d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757  
        c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042  
        c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685  
        c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528  
        c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956  
        C22.602,0.567,25.338,0.567,26.285,2.486z"
        />
    </svg>
);

const Check = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
        <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="rgb(0, 171, 86)" />
        <path d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="rgb(0, 171, 86)" />
    </svg>
);

function getInitials(name) {
    const words = name.split(" ");
    if (words.length < 2) return ""; // Ensure there are at least two words

    return words.slice(1).map(word => word[0]).join("").toUpperCase();
}

const ratings = [
    "Không hài lòng",       // 1 sao
    "Tạm ổn, nhưng chưa tốt", // 2 sao
    "Bình thường, có thể chấp nhận", // 3 sao
    "Hài lòng, nhưng vẫn có thể cải thiện", // 4 sao
    "Cực kỳ hài lòng"       // 5 sao
];

function timeAgo(createdAt) {
    const now = new Date();
    const past = new Date(createdAt);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return `Vừa xong`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} ngày trước`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `Đánh giá vào ${diffInMonths} tháng trước`;
    const diffInYears = Math.floor(diffInMonths / 12);
    return `Đánh giá vào ${diffInYears} năm trước`;
}

const sendIconActive = 'https://salt.tikicdn.com/ts/upload/04/75/f0/441726ca3900c5d9c719c48457336040.png'
const sendIconInActive = 'https://salt.tikicdn.com/ts/upload/1e/49/2d/92f01c5a743f7c8c1c7433a0a7090191.png'

export default function Comment({ data }) {
    const dispatch = useDispatch()
    const [openCommentBox, setOpenCommentBox] = useState(false)
    const [commentInput, setCommentInput] = useState('')
    const [showComment, setShowComment] = useState(false)

    const onComment = useCallback(() => {
        if (commentInput.trim() === '') return;
        dispatch(productActions.createCommentRequest({
            productId: data.productId,
            content: commentInput,
            rate: null,
            parentId: data.id,
        }))

        setCommentInput('')
        setOpenCommentBox(false)
        setShowComment(true)
    }, [commentInput, data, dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.user_details}>
                        <div className={styles.avatar}>{getInitials(data.User.name)}</div>
                        <div className={styles.user_details_name}>{data.User.name}</div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.rate}>
                        <div className={styles.star}>
                            {Array.from({ length: data.rate }, (_, i) => <Star key={i} />)}
                        </div>
                        <div className={styles.star_comment}>{ratings[data.rate - 1]}</div>
                    </div>
                    <div className={styles.buyed}>
                        <Check />
                        Da mua hang
                    </div>
                    <div className={styles.text}>{data.content}</div>
                    <div className={styles.text_time}>{timeAgo(data.createdAt)}</div>
                    <div className={styles.comment} onClick={() => { setOpenCommentBox(!openCommentBox) }}>
                        <img className={styles.comment_icon} src="https://salt.tikicdn.com/ts/upload/82/f0/7f/7353641630f811453e875bb5450065d8.png" alt="" />
                        <div className={styles.comment_number}>{data.children.length}</div>
                    </div>
                    {
                        openCommentBox
                            ?
                            <div className={styles.comment_box}>
                                <input
                                    className={styles.comment_box_input}
                                    type="text"
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            onComment();
                                        }
                                    }}
                                />
                                <img
                                    className={styles.send_icon}
                                    alt=""
                                    src={commentInput ? sendIconActive : sendIconInActive}
                                    onClick={onComment}
                                ></img>
                            </div>
                            :
                            undefined
                    }
                    {showComment && data.children.map((children) => {
                        return <ReviewComment key={children.id} data={children} getInitials={getInitials} timeAgo={timeAgo} />
                    })}
                    {data.children.length ? <div className={styles.comment_showList} onClick={() => setShowComment(!showComment)}>
                        <img className={styles.comment_showList_avatar} src="https://salt.tikicdn.com/ts/upload/9e/e4/d9/115528e11b40fdf3c354f28d05f01ca8.png" alt="" />
                        <div className={styles.comment_showList_content}>{showComment ? 'Đóng câu trả lời' : 'Xem thêm câu trả lời'}</div>
                    </div> : undefined}
                </div>
            </div>
        </div>
    );
}
