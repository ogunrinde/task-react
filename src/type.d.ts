type Category = {
  categoryId: number;
  name: string;
  afterCategoryId: number | null;
  completed: boolean;
  tasks: Task[];
};

type Task = {
  taskId: number;
  name: string;
  completed: boolean;
};

type addCategory = {
  categoryId: number;
  name: string;
  afterCategoryId: string;
};

type addTask = {
  name: string;
  categoryId: number;
};

type updateTaskStatus = {
  completed: boolean;
};
