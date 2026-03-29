import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/finance/financeOperations";

const AddTransactionForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.finance);

  useEffect(() => {
    dispatch(fetchCategories()); // component mount olunca categories fetch edilir
  }, [dispatch]);

  return (
    <select name="category">
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default AddTransactionForm;