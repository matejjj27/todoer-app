const useTodoCategories = () => {
  return {
    todoCounter: 26,
    categoryCounter: 17,
    categories: [
      {
        id: "0",
        label: "Finished",
        bgColor: "red",
        todos: [
          {
            id: "2",
            label: "make categories editable",
            todoDate: "2024-01-18T17:14:46.482Z",
            isCompleted: true
          },
          {
            id: "1",
            label: "fix delete todo button breaking",
            todoDate: "2024-01-18T17:14:46.482Z",
            isCompleted: true
          },
          {
            id: "3",
            label: "fix ids",
            todoDate: "2024-01-18T17:14:46.482Z",
            isCompleted: true
          }
        ]
      },
      {
        id: "1",
        label: "To do",
        bgColor: "green",
        todos: [
          {
            id: "4",
            label: "introduce filters",
            todoDate: "2024-01-18T17:14:46.482Z",
            isCompleted: false
          },
          {
            id: "18",
            label: "side menu only filters",
            isCompleted: false
          },
          {
            id: "0",
            label: "add due date to each todo",
            todoDate: "2024-01-18T17:14:46.482Z",
            isCompleted: false
          }
        ]
      },
      {
        id: "2",
        label: "Backlog",
        bgColor: "blue",
        todos: [
          {
            id: "20",
            label: "todo color change ?",
            isCompleted: false
          },
          {
            id: "6",
            label: "todo details ?",
            todoDate: "2024-01-18T17:14:46.482Z",
            isCompleted: false
          },
          {
            id: "21",
            label: "reorder categories ?",
            isCompleted: false
          },
          {
            id: "25",
            label: "category Icon ?",
            isCompleted: false
          },
          {
            id: "26",
            label: "create backend ?",
            isCompleted: false
          }
        ]
      }
    ]
  };
};

export default useTodoCategories;
