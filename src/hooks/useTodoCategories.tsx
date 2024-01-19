const useTodoCategories = () => {
  return {
    todoCounter: 7,
    categoryCounter: 3,
    categories: [
      {
        id: "0",
        label: "General",
        bgColor: "red",
        todos: [
          {
            id: "0",
            label: "add due date to each todo",
            todoDate: new Date(),
            isCompleted: false
          },
          {
            id: "1",
            label: "fix delete todo button breaking",
            todoDate: new Date(),
            isCompleted: true
          },
          {
            id: "2",
            label: "make categories editable",
            todoDate: new Date(),
            isCompleted: true
          },
          {
            id: "3",
            label: "fix ids",
            todoDate: new Date(),
            isCompleted: true
          }
        ]
      },
      {
        id: "1",
        label: "Home",
        bgColor: "green",
        todos: [
          {
            id: "4",
            label: "todo 1",
            todoDate: new Date(),
            isCompleted: false
          },
          {
            id: "5",
            label: "todo 2",
            todoDate: new Date(),
            isCompleted: false
          }
        ]
      },
      {
        id: "2",
        label: "Work",
        bgColor: "blue",
        todos: [
          {
            id: "6",
            label: "todo 1",
            todoDate: new Date(),
            isCompleted: true
          }
        ]
      }
    ]
  };
};

export default useTodoCategories;
