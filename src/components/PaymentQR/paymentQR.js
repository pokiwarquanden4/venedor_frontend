import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { purchaseActions } from "../../redux/actions/purchase/purchaseActions";
import { useNavigate } from "react-router-dom";
import { productActions } from "../../redux/actions/product/ProductActions";
import { productSelector } from "../../redux/selectors/productSelector/productSelector";

function PaymentQR({ amount, currentAddress }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const productSelect = useSelector(productSelector)
    const [qrCode, setQrCode] = useState();
    const [content, setContent] = useState()

    useEffect(() => {
        const handleGetQr = async () => {
            let id = uuidv4().replace(/-/g, '');
            const content = `Thanh toan cho don hang ${id}`;

            const payload = {
                accountNo: '00003507211',
                accountName: `Thanh toán QR Pay`,
                acqId: 970423,
                amount: 10000,
                addInfo: content,
                format: "text",
                template: "compact2"
            };

            const res = await fetch("https://api.vietqr.io/v2/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            setQrCode(data?.data?.qrDataURL || "");
            setContent(id)
        };

        if (amount) {
            handleGetQr();
        }
    }, [amount]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(productActions.getPaymentRequest());
        }, 2000);

        return () => clearInterval(interval);
    }, [currentAddress.id, dispatch]);

    useEffect(() => {
        if (productSelect.paymentList.some(item => item.includes(content))) {
            dispatch(
                purchaseActions.purchaseRequest({ addressId: currentAddress.id })
            );
            navigate('/thankyou');
        }
    }, [content, currentAddress.id, dispatch, navigate, productSelect.paymentList])

    return (
        <div style={{ textAlign: "center", padding: 24 }}>
            <h2>Quét mã QR để thanh toán</h2>
            {qrCode ? (
                <img
                    src={qrCode}
                    alt="QR Code thanh toán"
                    style={{ width: 260, height: 260, margin: "16px 0", border: "1px solid #eee", borderRadius: 8 }}
                />
            ) : (
                <div style={{ margin: "24px 0", color: "#888" }}>Đang tạo mã</div>
            )}
        </div>
    );
}

export default PaymentQR;