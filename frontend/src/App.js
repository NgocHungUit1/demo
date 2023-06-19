import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { RoutesConfig } from "./routes";
import classNames from "classnames/bind";
import styles from "./App.css";
const cx = classNames.bind(styles);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={cx("App")}>
          <RoutesConfig />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
