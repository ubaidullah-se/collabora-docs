import { useSelector } from "react-redux";
import { ReduxStoreState } from "../redux/store";

type Props = {
  children: React.ReactElement | React.ReactElement[];
  loadingComponent: React.ReactElement;
};

export default function LoadingProvider({ children, loadingComponent }: Props) {
  const isLoading = useSelector(
    (state: ReduxStoreState) => state.isLoading.value
  );
  return (
    <>
      {isLoading ? loadingComponent : null}
      {children}
    </>
  );
}
