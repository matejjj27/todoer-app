const useTodoCategories = () => {
  return {
    todoCounter: 7,
    categoryCounter: 3,
    categories: [
      {
        id: "0",
        label: "General",
        todos: [
          {
            id: "0",
            label: "add due date to each todo",
            isCompleted: false
          },
          {
            id: "1",
            label: "fix delete todo button breaking",
            isCompleted: true
          },
          {
            id: "2",
            label: "make categories editable",
            isCompleted: true
          },
          {
            id: "3",
            label: "fix ids",
            isCompleted: false
          }
        ]
      },
      {
        id: "1",
        label: "Home",
        todos: [
          {
            id: "4",
            label: "todo 1",
            isCompleted: false
          },
          {
            id: "5",
            label: "todo 2",
            isCompleted: false
          }
        ]
      },
      {
        id: "2",
        label: "Work",
        todos: [
          {
            id: "6",
            label: "todo 1",
            isCompleted: true
          }
        ]
      }
    ]
  };
};

export default useTodoCategories;
