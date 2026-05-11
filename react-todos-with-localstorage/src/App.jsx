import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import "./config/global";
import { ConfigProvider } from "antd";

import Routes from "./pages/Routes"

const App = () => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1d3557" }, components: { Button: { controlOutline: 0, primaryShadow: "none" } } }}>
      <Routes />
    </ConfigProvider>
  )
}

export default App