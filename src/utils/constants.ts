import { TodoCategory } from "./types";

export const categories: TodoCategory[] = [
  {
    label: "General",
    todos: [
      {
        label: "todo 1",
        isCompleted: true
      },
      {
        label: "todo 2",
        isCompleted: false
      },
      {
        label: "todo 3",
        isCompleted: false
      }
    ]
  },
  {
    label: "Home",
    todos: [
      {
        label: "todo 1",
        isCompleted: false
      },
      {
        label: "todo 2",
        isCompleted: false
      }
    ]
  },
  {
    label: "Work",
    todos: [
      {
        label: "todo 1",
        isCompleted: true
      }
    ]
  }
];
