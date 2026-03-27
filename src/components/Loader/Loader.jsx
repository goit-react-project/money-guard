import styles from './Loader.module.css';
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { selectIsLoading } from "../../redux/global/globalSelectors";

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);
  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <ThreeDots color="#FFB627" height={80} width={80} />
    </div>
  );
};

export default Loader;
