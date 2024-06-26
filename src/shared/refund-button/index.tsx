import { useEffect } from "react";
import { withdraw } from "../../store/account/actions";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { TransactionItem } from "../../store/transaction/initialState";
import { refundTransaction } from "../../store/transaction/thunks";
import { themeColors } from "../../theme/colors";
import { changeTypeOfTransactionToRefund } from "../../store/transaction/actions";

type RefundTransactionButtonProps = {
    transaction: TransactionItem;
    buttonText: string;
};

const RefundTransactionButton: React.FC<RefundTransactionButtonProps> = ({
    transaction,
    buttonText,
    ...props
}) => {
    const dispatch = useAppDispatch();

    const handleRefundTransaction = () => {
        dispatch(refundTransaction(transaction))
            .then(() => {
                dispatch(withdraw(transaction.amount));
                dispatch(changeTypeOfTransactionToRefund(transaction))
            })
            .catch(() => {
                alert('failed to refund :( !')
            });
    };

    return (
        <button
            {...props}
            className="px-4 py-2 rounded-md border border-slate-500 text-center font-bold text-white"
            onClick={handleRefundTransaction}
            style={{ backgroundColor: themeColors.primary }}
        >
            {buttonText}
        </button>
    );
};

export default RefundTransactionButton;
