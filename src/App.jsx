import { RouterProvider } from "react-router-dom";
import Router from "./router/Router";
import "./styles/styles.css";

const App = () => {
    return (
        <>
            <RouterProvider router={Router} />
        </>
    );
};

export default App;
