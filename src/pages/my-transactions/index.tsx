import { useEffect, useState } from "react";
import Transactions from "../../components/transactions";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { loadMyTransactions } from "../../store/transaction/thunks";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { ContainerGradient } from "../../styled-components/containers";

export default function MyTransactionsScreen() {
    const dispatch = useAppDispatch();
    const { myTransactions, loadMyTransactionsStatus, loadMyTransactionsError } = useAppSelector((store) => store.transaction);
    const [loading, setLoading] = useState(true);

    function loadTransactions() {
        try {
            dispatch(loadMyTransactions());
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    function handleReload() {
        dispatch(loadMyTransactions());
    }

    useEffect(() => {
        loadTransactions()
    }, []);

    return (
        <div className='p-2 flex-col gap-2 w-[100%] md:w-[90%] lg:w-[70%] mx-auto' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <ContainerGradient>
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
            </ContainerGradient>
        </div>
    );
}
