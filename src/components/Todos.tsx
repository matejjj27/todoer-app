import Todo from "./Todo";
import { ITodo, ITodoCategory } from "../utils/types";

interface TodosProps {
  todos: ITodo[];
  todoCategory: ITodoCategory;
}

const Todos = ({ todos, todoCategory }: TodosProps) => {
  return (
    <div className="mt-1 flex flex-col gap-1">
      {todos.map((todo: ITodo) => (
        <Todo key={todo.id} todo={todo} todoCategory={todoCategory} />
      ))}
    </div>
  );
};

export default Todos;
