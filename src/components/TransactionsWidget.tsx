import type { Transaction } from "../interface/transaction";

interface TransactionWidgetProps {
    transaction : Transaction;
}

export default function TransactionsWidget({ transaction }: TransactionWidgetProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTransactionLabel = () => {
        if (transaction.transactionType === 'TRANSFER') {
            return `Sent To ${transaction.to}`;
        } else if (transaction.transactionType === 'DEPOSIT') {
            return 'Deposit';
        } else if (transaction.transactionType === 'WITHDRAW') {
            return 'Withdraw';
        }
        return '';
    };

    const getAmountColor = () => {
        if (transaction.transactionType === 'DEPOSIT') {
            return 'text-green-400';
        } else {
            return 'text-red-400';
        }
    };

    return (
        <div className="bg-linear-to-b from-white-2 to-black-8 rounded-2xl shadow-outer border border-accent-alpha w-full h-16 p-4 flex items-center justify-between shrink-0">
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate mb-2">{getTransactionLabel()}</p>
                <p className="text-xs text-white/60">{formatDate(transaction.createdAt)}</p>
            </div>
            <div className={`ml-4 text-right shrink-0 ${getAmountColor()}`}>
                <p className="font-bold">
                    {transaction.transactionType === 'DEPOSIT' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
            </div>
        </div>
    )
}
