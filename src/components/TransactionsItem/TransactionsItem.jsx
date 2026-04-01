import { HiPencil } from "react-icons/hi2";
import { useSelector } from "react-redux";
import styles from "./TransactionsItem.module.css";

const formatDate = (dateString) => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}.${month}.${year}`;
};


const formatAmount = (value) => {
  if (value === null || value === undefined) return "0,00";
  return Math.abs(Number(value)).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
  });
};

const TransactionsItem = ({ transaction, onDelete, onEdit }) => {
  const categories = useSelector(state => state.finance.categories);
  const {
    id,
    transactionDate,
    type,
    categoryId,
    comment,
    amount,
  } = transaction;

  const isIncome = type === "INCOME" || type === "+";
const categoryName = isIncome
  ? "Income"
  : categories.find(c => c.id === categoryId)?.name || "Unknown";
  
  return (
    <>
      <div className={styles.card}>
        <div className={styles.leftBorder}></div>

        <div className={styles.row}>
          <span className={styles.label}>Date</span>
          <span className={styles.value}>{formatDate(transactionDate)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Type</span>
          <span
            className={`${styles.value} ${
              isIncome ? styles.income : styles.expense
            }`}
          >
            {isIncome ? "+" : "-"}
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Category</span>
          <span className={styles.value}>{categoryName}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Comment</span>
          <span className={styles.value}>{comment}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Sum</span>
          <span
            className={`${styles.sum} ${
              isIncome ? styles.income : styles.expense
            }`}
          >
            {formatAmount(amount)}
          </span>
        </div>

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

      <div className={styles.tableRow}>
        <span className={styles.cell}>{formatDate(transactionDate)}</span>
        <span
          className={`${styles.cell} ${
            isIncome ? styles.income : styles.expense
          }`}
        >
          {isIncome ? "+" : "-"}
        </span>
        <span className={styles.cell}>{categoryName}</span>
        <span className={styles.cell}>{comment}</span>
        <span
          className={`${styles.cell} ${styles.amount} ${
            isIncome ? styles.income : styles.expense
          }`}
        >
          {formatAmount(amount)}
        </span>

        <div className={styles.tableActions}>
          <button
            type="button"
            className={styles.tableEditBtn}
            onClick={() => onEdit(transaction)}
          >
            <HiPencil />
          </button>

          <button
            type="button"
            className={styles.tableDeleteBtn}
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionsItem;