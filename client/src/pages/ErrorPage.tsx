import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError() as Error;
    return (
      <div>
        <h2>Oops! Something went wrong 🙈</h2>
        <p>{error.message}</p>
      </div>
    );
  };