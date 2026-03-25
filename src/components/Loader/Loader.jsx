import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { selectIsLoading } from "../../redux/global/globalSlice";

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);
  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <ThreeDots color="#FFC727" height={80} width={80} />
    </div>
  );
};

export default Loader;
