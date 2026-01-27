import type { Transaction } from "../interface/transaction";
import { ArrowDownLeft, ArrowUpRight, Send, Calendar, User} from "lucide-react";

interface DetailedTransactionWidgetProps {
  transaction: Transaction;
}

export default function DetailedTransactionWidget({ transaction }: DetailedTransactionWidgetProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = () => {
    switch (transaction.transactionType) {
      case "DEPOSIT":
        return <ArrowDownLeft className="w-6 h-6" />;
      case "WITHDRAW":
        return <ArrowUpRight className="w-6 h-6" />;
      case "TRANSFER":
        return <Send className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getTransactionLabel = () => {
    switch (transaction.transactionType) {
      case "TRANSFER":
        return "Transfer";
      case "DEPOSIT":
        return "Deposit";
      case "WITHDRAW":
        return "Withdrawal";
      default:
        return "Transaction";
    }
  };

  const getAmountColor = () => {
    if (transaction.transactionType === "DEPOSIT") {
      return "text-green-400";
    } else {
      return "text-red-400";
    }
  };

  const getIconBgColor = () => {
    if (transaction.transactionType === "DEPOSIT") {
      return "bg-green-500/20 text-green-400";
    } else if (transaction.transactionType === "WITHDRAW") {
      return "bg-red-500/20 text-red-400";
    } else {
      return "bg-blue-500/20 text-blue-400";
    }
  };

  return (
    <div className="bg-linear-to-br from-white-2 to-black-8 rounded-xl shadow-card border border-accent-alpha p-5 hover:border-white-4 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${getIconBgColor()}`}>
            {getTransactionIcon()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{getTransactionLabel()}</h3>
            <p className="text-sm text-white/60 flex items-center gap-1 mt-1">
              <Calendar className="w-3 h-3" />
              {formatDate(transaction.createdAt)}
            </p>
          </div>
        </div>
        <div className={`text-right ${getAmountColor()}`}>
          <p className="text-2xl font-bold">
            {transaction.transactionType === "DEPOSIT" ? "+" : "-"}$
            {transaction.amount.toFixed(2)}
          </p>
        </div>
      </div>

      {transaction.transactionType === "TRANSFER" && (
        <div className="space-y-2 border-t border-white-3 pt-4 mt-4">
          {transaction.to && (
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-white/40" />
              <span className="text-white/60">Sent to:</span>
              <span className="text-white font-medium">{transaction.to}</span>
            </div>
          )}
          
          {transaction.from && (
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-white/40" />
              <span className="text-white/60">Received from:</span>
              <span className="text-white font-medium">{transaction.from}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
