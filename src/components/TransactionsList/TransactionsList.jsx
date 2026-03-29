import styles from "./TransactionsList.module.css";

const TransactionsList = ({ transactions = [], onDelete, onEdit }) => {
  return (
    <div className={styles.list}>
      {transactions.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.leftBorder}></div>

          <div className={styles.row}>
            <span className={styles.label}>Date</span>
            <span className={styles.value}>{item.date}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Type</span>
            <span className={styles.value}>{item.type}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Category</span>
            <span className={styles.value}>{item.category}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Comment</span>
            <span className={styles.value}>{item.comment}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Sum</span>
            <span className={styles.sum}>{item.sum}</span>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>

            <button
              type="button"
              className={styles.editBtn}
              onClick={() => onEdit(item)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsList;