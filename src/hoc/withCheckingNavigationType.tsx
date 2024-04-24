import { Navigate, useNavigationType } from "react-router-dom";

type PropType = {
  [key: string]: unknown;
};

function withCheckingNavigationType<T extends PropType>(
  Component: React.ComponentType<T>
) {
  return function WithCheckingNavigationType(props: T) {
    const navigationType = useNavigationType();

    if (navigationType === "POP") return <Navigate to="/home" replace />;
    return <Component {...props} />;
  };
}

export default withCheckingNavigationType;
