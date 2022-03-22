import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Check2Circle } from "react-bootstrap-icons";
import { useState } from "react";
import TaskModal from "./modal/task";
import Data from "./data";

type TaskCategory = {
  taskCategory: Category;
  updateTaskStatus: (taskId: number, categoryId: number) => void;
};
const List: React.FC<TaskCategory> = ({ taskCategory, updateTaskStatus }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleCloseBtn = () => {
    setShow(false);
  };

  const SaveTask = (task: addTask) => {
    const { name } = task;
    if (name == undefined) return false;
    const index = Data.findIndex(
      (x) => x.categoryId === taskCategory.categoryId
    );
    if (index == -1) {
      alert("Category Id not Found");
      return false;
    }
    const newtask = {
      taskId: Data[index].tasks.length + 1,
      name: name,
      completed: false,
    };

    Data[index].tasks.push(newtask);
    handleCloseBtn();
    //setTaskCategories((taskCategories) => [...taskCategories, newCategory]);
    alert("New Task Added");
  };

  return (
    <div className="App">
      <TaskModal
        show={show}
        handleCloseBtn={handleCloseBtn}
        SaveTask={SaveTask}
        taskCategories={Data}
        categoryId={taskCategory.categoryId}
      />
      {/* <TaskStatusModal
        showStatusModal={showStatusModal}
        handleCloseBtn={handleCloseBtn}
        SaveTaskStatus={SaveTaskStatus}
        categoryId={taskCategory.categoryId}
      /> */}
      <div style={{ marginBottom: 10 }}>
        <Button variant="primary" size="sm" onClick={handleShow}>
          Add Task
        </Button>
      </div>
      <ListGroup as="ol" numbered>
        {taskCategory.tasks.map((task, index) => (
          <ListGroup.Item
            key={index}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              {task.name}
              <div>
                <Button
                  variant="link"
                  onClick={() =>
                    updateTaskStatus(task.taskId, taskCategory.categoryId)
                  }
                >
                  Update
                </Button>
              </div>
            </div>
            {task.completed == true && <Check2Circle size={30} color="green" />}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default List;
