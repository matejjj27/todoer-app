import { RouterProvider } from "react-router-dom";
import router from "./navigation/router";
import TodoProvider from "./context/TodoContext";
import UIProvider from "./context/UIContext";

function App() {
  return (
    <UIProvider>
      <TodoProvider>
        <RouterProvider router={router} />
      </TodoProvider>
    </UIProvider>
  );
}

export default App;
