import Modelselector from "./components/modelselector/Modelselector"
import Navbar from "./components/navbar/Navbar"


function App() {

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <Modelselector />
      </div>
    </div>
  )
}

export default App
