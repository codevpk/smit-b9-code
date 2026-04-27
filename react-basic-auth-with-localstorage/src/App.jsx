import "./App.scss"
import "./config/global.jsx"
import "bootstrap/dist/js/bootstrap.bundle"
import Routes from "./pages/Routes"
import { ConfigProvider } from "antd"

const App = () => {
  return (
    <>
      <ConfigProvider theme={{ token: { colorPrimary: "#1d3557" }, components: { Button: { controlOutline: 0 } } }}>
        <Routes />
      </ConfigProvider>
    </>
  )
}

export default App