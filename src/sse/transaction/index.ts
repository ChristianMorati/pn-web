import { store } from "../../store";
import { deposit } from "../../store/account/actions";
import { addTransaction } from "../../store/transaction/actions";
import { TransactionItem } from "../../store/transaction/initialState";
import { formatToCurrencyBRL, showToast, toCapipitalize } from "../../utils";
import SocketIoInit from "../socket";
import { TransactionEventsEnum } from "../../enum";
import { io, Socket } from "socket.io-client";

export class TransactionObservable extends SocketIoInit {
    private transactionListener: ((data: TransactionItem) => void) | null = null;
    userId: number;
    socket: Socket;

    constructor(transactionObservable: Partial<TransactionObservable>) {
        super();
        this.userId = transactionObservable?.userId ?? 0;
        this.socket = io(this.baseURL, {
            query: { userId: this.userId.toString() },
            withCredentials: true,
            transports: ['websocket'],
        });
    }

    private isMoneyBackTransaction(transaction: TransactionItem) {
        return transaction.payerUserId === this.userId && transaction.type === "refund";
    }

    private isMoneyAdditionTransaction(transaction: TransactionItem) {
        return transaction.payerUserId !== this.userId && transaction.type === "transaction";
    }

    listenToIncomingTransaction() {
        if (this.transactionListener) {
            this.socket.off('transaction', this.transactionListener);
        }

        this.transactionListener = (data: any) => {
            const { transaction }: { transaction: TransactionItem } = data;

            // money returned or money received
            if (this.isMoneyBackTransaction(transaction) || this.isMoneyAdditionTransaction(transaction)) {
                const isTransaction = transaction.type === "transaction";
                const header = isTransaction ? "Pix recebido!" : "Extorno";
                const text = isTransaction ? "Enviou" : "Extornou";

                store.dispatch(deposit(transaction.amount));
                store.dispatch(addTransaction(transaction));

                showToast('success', {
                    header: header,
                    text: `${toCapipitalize(transaction.payerName)} ${text} ${formatToCurrencyBRL(transaction.amount)}!`
                });
            }
        };

        this.socket.on(TransactionEventsEnum.TRANSACTION, this.transactionListener);
    }

    stopListeningToIncomingTransaction() {
        if (this.transactionListener) {
            this.socket.off(TransactionEventsEnum.TRANSACTION, this.transactionListener);
            this.transactionListener = null;
        }
    }
}
