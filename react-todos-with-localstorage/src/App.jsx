import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import "./config/global";
import { ConfigProvider } from "antd";
import { useAuth } from "./context/Auth";

import Routes from "./pages/Routes"
import ScreenLoader from "./components/ScreenLoader";

const App = () => {

  const { isAppLoading } = useAuth()

  console.log('import.meta.env', import.meta.env)

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1d3557" }, components: { Button: { controlOutline: 0, primaryShadow: "none" } } }}>

      {isAppLoading
        ? <ScreenLoader />
        : <Routes />
      }

    </ConfigProvider>
  )
}

export default App