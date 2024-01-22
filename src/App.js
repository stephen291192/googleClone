import logo from "./logo.svg";
import "./App.css";
import Search from "./Search.js";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Search />
      </ChakraProvider>
    </div>
  );
}

export default App;
