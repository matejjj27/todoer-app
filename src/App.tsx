import { RouterProvider } from "react-router-dom";
import router from "./navigation/router";
import TodoProvider from "./context/TodoProvider";
import UIProvider from "./context/UIProvider";

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
