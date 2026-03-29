import { HiPencil } from "react-icons/hi2";
import styles from "./TransactionsItem.module.css";

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}.${month}.${year}`;
};

const TransactionsItem = ({ transaction, onDelete, onEdit }) => {
  const {
    id,
    transactionDate,
    type,
    category,
    comment,
    amount,
  } = transaction;

  const isIncome = type === "INCOME" || type === "+";

  return (
    <div className={styles.card}>
      <div className={styles.leftBorder}></div>

      {/* DATE */}
      <div className={styles.row}>
        <span className={styles.label}>Date</span>
        <span className={styles.value}>
          {formatDate(transactionDate)}
        </span>
      </div>

      {/* TYPE */}
      <div className={styles.row}>
        <span className={styles.label}>Type</span>
        <span className={styles.value}>
          {isIncome ? "+" : "-"}
        </span>
      </div>

      {/* CATEGORY */}
      <div className={styles.row}>
        <span className={styles.label}>Category</span>
        <span className={styles.value}>
          {category}
        </span>
      </div>

      {/* COMMENT */}
      <div className={styles.row}>
        <span className={styles.label}>Comment</span>
        <span className={styles.value}>
          {comment}
        </span>
      </div>

      {/* SUM */}
      <div className={styles.row}>
        <span className={styles.label}>Sum</span>
        <span
          className={`${styles.sum} ${
            isIncome ? styles.income : styles.expense
          }`}
        >
          {amount}
        </span>
      </div>

      {/* ACTIONS */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => onDelete(id)}
        >
          Delete
        </button>

        <button
          type="button"
          className={styles.editBtn}
          onClick={() => onEdit(transaction)}
        >
          <HiPencil />
          Edit
        </button>
      </div>
    </div>
  );
};

export default TransactionsItem;