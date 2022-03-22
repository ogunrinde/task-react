import { Col, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { ChangeEvent, useState } from "react";

type TaskProps = {
  show: boolean;
  handleCloseBtn: () => void;
  taskCategories: Category[];
  SaveTask: (task: addTask) => void;
  categoryId: number;
};
const TaskModal: React.FC<TaskProps> = ({
  show,
  handleCloseBtn,
  SaveTask,
  categoryId,
}) => {
  const initialState = {
    name: "",
    categoryId: categoryId,
  };
  const [task, setTask] = useState<addTask>(initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  return (
    <div className="App">
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleCloseBtn}>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={task.name}
              placeholder=""
              required
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: 10 }}>
            <Button type="submit" onClick={() => SaveTask(task)}>
              Save
            </Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskModal;
