import TransactionsItem from "../TransactionsItem/TransactionsItem";
import styles from "./TransactionsList.module.css";


const TransactionsList = ({
  transactions = [],
  onDelete,
  onEdit,
  onOpenAdd,
}) => {
  if (transactions.length === 0) {
    return (
      <div className={styles.emptyWrapper}>
        <div className={styles.emptyCard}>
          <p className={styles.emptyTitle}>No transactions available yet.</p>
          <p className={styles.emptyText}>
            Let&apos;s add your first transaction:
          </p>

          <button
            type="button"
            className={styles.emptyBtn}
            onClick={onOpenAdd}
          >
            ADD TRANSACTION
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {transactions.map((item) => (
        <TransactionsItem
          key={item.id}
          transaction={item}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TransactionsList;