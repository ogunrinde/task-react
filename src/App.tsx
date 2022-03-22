import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./list";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import CategoryModal from "./modal/category";
import Data from "./data";
import { Check2Circle } from "react-bootstrap-icons";
import TaskStatusModal from "./modal/updateTaskStatus";

function App() {
  const [show, setShow] = useState<boolean>(false);
  const [taskCategories, setTaskCategories] = useState<Category[]>(Data);
  const [showStatusModal, setStatusModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [currTaskId, setTaskId] = useState<number>(0);
  const handleShow = () => {
    setShow(!show);
  };
  const handleCloseBtn = () => {
    setShow(false);
    setStatusModal(false);
  };

  const Save = (category: Partial<addCategory>) => {
    const { name, afterCategoryId } = category;
    if (name == undefined || afterCategoryId == undefined) return false;
    const newCategory = {
      categoryId: Data.length + 1,
      completed: false,
      name: name,
      afterCategoryId: parseInt(afterCategoryId),
      tasks: [],
    };
    const index = taskCategories.findIndex(
      (x) => x.categoryId === parseInt(afterCategoryId)
    );

    alert(JSON.stringify(newCategory));
    Data.splice(index + 1, 0, newCategory);
    //Data.push(newCategory);
    handleCloseBtn();
    //setTaskCategories((taskCategories) => [...taskCategories, newCategory]);
    alert("New Category Added");
  };

  const SaveTaskStatus = (taskInfo: updateTaskStatus) => {
    const { completed } = taskInfo;
    const index = Data.findIndex((task) => task.categoryId === categoryId);

    if (index == -1) {
      alert("category ID not Found");
      return false;
    }

    //Is the previous Category tasks Completed
    const aftercategoryId = Data[index].afterCategoryId;
    if (aftercategoryId != null) {
      const previous_category_index = Data.findIndex(
        (task) => task.categoryId == aftercategoryId
      );
      if (Data[previous_category_index].completed == false) {
        alert(
          `Kindly complete all Tasks in ${Data[previous_category_index].name}`
        );
        return false;
      }
    }
    const task = Data[index].tasks.find((task) => task.taskId === currTaskId);

    if (!task) {
      alert("Task not Found");
      return false;
    }

    task.completed = completed;
    Data[index].tasks.map((task) =>
      task.taskId === currTaskId ? { ...task, completed: completed } : task
    );

    //Is all task under a category completed
    const index_of_pending_task = Data[index].tasks.findIndex(
      (task) => task.completed == false
    );
    //If all tasks are completed
    if (index_of_pending_task == -1) {
      //all tasks under categoryId are completed
      Data[index].completed = true;
      //Update completed to true
      setTaskCategories(
        taskCategories.map((taskCategory) =>
          taskCategory.categoryId === categoryId
            ? { ...taskCategory, completed: true }
            : taskCategory
        )
      );
    }

    alert("Update Successful");
    handleCloseBtn();
  };

  const updateTaskStatus = async (taskId: number, categoryId: number) => {
    setTaskId(taskId);
    setCategoryId(categoryId);
    setStatusModal(!showStatusModal);
  };

  return (
    <div className="App">
      <Container>
        <CategoryModal
          show={show}
          handleCloseBtn={handleCloseBtn}
          taskCategories={taskCategories}
          Save={Save}
        />
        <TaskStatusModal
          showStatusModal={showStatusModal}
          handleCloseBtn={handleCloseBtn}
          SaveTaskStatus={SaveTaskStatus}
        />
        <div style={{ margin: 10 }}>
          <Button variant="primary" size="sm" onClick={handleShow}>
            Add Category
          </Button>
        </div>
        <Tabs
          defaultActiveKey={
            taskCategories[0].name != undefined ? taskCategories[0].name : ""
          }
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          {taskCategories.map((taskCategory, index) => (
            <Tab
              key={index}
              eventKey={taskCategory.name}
              title={
                <span>
                  {taskCategory.completed == true && (
                    <Check2Circle size={30} color="green" />
                  )}{" "}
                  {taskCategory.name}
                </span>
              }
            >
              <List
                taskCategory={taskCategory}
                updateTaskStatus={updateTaskStatus}
              />
            </Tab>
          ))}
        </Tabs>
      </Container>
    </div>
  );
}

export default App;
