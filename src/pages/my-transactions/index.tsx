import { useEffect, useState } from "react";
import Transactions from "../../shared/transactions";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { loadMyTransactions } from "../../store/transaction/thunks";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { loadMyAccountData } from "../../store/account/thunks";

export default function MyTransactionsScreen() {
    const dispatch = useAppDispatch();
    const { myTransactions, loadMyTransactionsStatus, loadMyTransactionsError } = useAppSelector((store) => store.transaction);
    const { account } = useAppSelector((store) => store.account);

    const [loading, setLoading] = useState(true);

    async function loadApp() {
        try {
            const transactions = await dispatch(loadMyTransactions());
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadApp()
    }, []);

    function handleReload() {
        dispatch(loadMyTransactions());
    }

    return (
        <div>
            {loading ? (
                <p>loading...</p>
            ) : (
                <Transactions
                    myTransactions={myTransactions}
                    loadMyTransactionsStatus={loadMyTransactionsStatus || ""}
                    loadMyTransactionsError={loadMyTransactionsError || ""}
                    handleReload={handleReload}
                />
            )}
        </div>
    );
}
