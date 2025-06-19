import React, { useEffect, useState } from 'react';
import styles from './Policy.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { adminSelector } from '../../redux/selectors/accountSelector/AdminSelector';
import { adminActions } from '../../redux/actions/account/AdminActions';

function Policy() {
    const dispach = useDispatch();
    const adminSelect = useSelector(adminSelector)
    const [policies, setPolicies] = useState([]);
    const [newPolicy, setNewPolicy] = useState({ id: undefined, name: '', content: '', responseFor: 'Người mua' });

    useEffect(() => {
        dispach(adminActions.getAllPolicyRequest())
    }, [dispach])

    useEffect(() => {
        setPolicies(adminSelect.policy);
    }, [adminSelect.policy])

    const handleAddPolicy = () => {
        if (!newPolicy.name || !newPolicy.content || !newPolicy.responseFor) return;

        dispach(adminActions.addPolictyRequest({
            name: newPolicy.name,
            content: newPolicy.content,
            responseFor: newPolicy.responseFor
        }))
    };

    const handleEditPolicy = () => {
        if (!newPolicy.name || !newPolicy.content || !newPolicy.responseFor || !newPolicy.id) return;

        dispach(adminActions.editPolicyRequest({
            id: newPolicy.id,
            name: newPolicy.name,
            content: newPolicy.content,
            responseFor: newPolicy.responseFor
        }))
    };

    const handleDeletePolicy = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xoá chính sách này không?')) {
            dispach(adminActions.deletePolicyRequest({ id }));
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
                <h1 className={styles.title}>Chính sách của sàn thương mại</h1>
                <div className={styles.container}>
                    <div className={styles.policyList}>
                        {policies.map(policy => (
                            <div
                                key={policy.id}
                                className={styles.policyItem}
                                style={newPolicy.id === policy.id ? { border: '2px solid #f1c40f', background: '#fffbe6' } : {}}
                                onClick={() => {
                                    setNewPolicy({
                                        id: policy.id,
                                        name: policy.name,
                                        content: policy.content,
                                        responseFor: policy.responseFor
                                    });
                                }}
                            >
                                <h2 className={styles.policyTitle}>{policy.name}</h2>
                                <div className={styles.policyTarget}>Đối tượng: {policy.responseFor}</div>
                                <div className={styles.policyContent}>{policy.content}</div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.addBox}>
                        <div className={styles.addTitle}>Thêm chính sách mới</div>
                        <input
                            type="text"
                            placeholder="Tiêu đề"
                            value={newPolicy.name}
                            onChange={e => setNewPolicy({ ...newPolicy, name: e.target.value })}
                            className={styles.input}
                        />
                        <textarea
                            placeholder="Nội dung chính sách"
                            value={newPolicy.content}
                            onChange={e => setNewPolicy({ ...newPolicy, content: e.target.value })}
                            className={styles.textarea}
                            style={{ minHeight: 200 }}
                        />
                        <select
                            value={newPolicy.role}
                            onChange={e => setNewPolicy({ ...newPolicy, responseFor: e.target.value })}
                            className={styles.select}
                        >
                            <option value="User">Người mua</option>
                            <option value="Seller">Người bán</option>
                            <option value="Both">Cả hai</option>
                        </select>
                        {
                            newPolicy.id
                                ?
                                <div>
                                    <button
                                        onClick={handleEditPolicy}
                                        className={styles.button}
                                    >
                                        Sửa chính sách
                                    </button>
                                    <button
                                        onClick={() => {
                                            setNewPolicy({ id: undefined, name: '', content: '', responseFor: 'Người mua' });
                                        }}
                                        className={styles.button}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDeletePolicy(newPolicy.id);
                                        }}
                                        className={styles.button}
                                    >
                                        Xóa
                                    </button>
                                </div>
                                :
                                <button
                                    onClick={handleAddPolicy}
                                    className={styles.button}
                                >
                                    Thêm chính sách
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Policy;