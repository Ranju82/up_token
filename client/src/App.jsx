import { EthProvider } from "./contexts/EthContext";
import Content from "./components/content";


function App() {
  return (
    <EthProvider>
      <div id="App" >
       
        <Content/>
      </div>
    </EthProvider>
  );
}

export default App;
