import { useContext } from "react";
import { ITodoCategory } from "../utils/types";
import { PlusIcon } from "@heroicons/react/24/solid";
import { TodoContext } from "../context/TodoContext";
import Category from "./Category";
import Todos from "./Todos";

interface TodoCardProps {
  todoCategory: ITodoCategory;
}

function TodoCard({ todoCategory }: TodoCardProps) {
  const { todos } = todoCategory;
  const { addNewTodo } = useContext(TodoContext);

  return (
    <div className="todo-card p-4 rounded-lg shadow-md flex flex-col justify-between gap-2">
      <div>
        <Category todoCategory={todoCategory} />

        <Todos todos={todos} todoCategory={todoCategory} />
        {/* <div className="mt-1 flex flex-col gap-1">
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} todoCategory={todoCategory} />
          ))}
        </div> */}
      </div>

      <PlusIcon
        height={22}
        color="white"
        className="cursor-pointer self-center"
        onClick={() => addNewTodo(todoCategory)}
      />
    </div>
  );
}

export default TodoCard;
