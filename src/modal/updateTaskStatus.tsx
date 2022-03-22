import { Col, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { ChangeEvent, useState } from "react";

type TaskProps = {
  showStatusModal: boolean;
  handleCloseBtn: () => void;
  SaveTaskStatus: (task: updateTaskStatus) => void;
};
const TaskStatusModal: React.FC<TaskProps> = ({
  showStatusModal,
  handleCloseBtn,
  SaveTaskStatus,
}) => {
  const initialState = {
    completed: false,
  };
  const [task, setTask] = useState<updateTaskStatus>(initialState);

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value == "1" ? true : false });
  };

  return (
    <div className="App">
      <Modal show={showStatusModal}>
        <Modal.Header closeButton onClick={handleCloseBtn}>
          <Modal.Title>Update Task Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group
            as={Col}
            md="12"
            controlId="validationCustom03"
            style={{ marginTop: 10 }}
          >
            <Form.Select
              aria-label="Default select example"
              name="completed"
              defaultValue="0"
              onChange={handleInputChange}
            >
              <option value="0"></option>
              <option value="1">Completed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ marginTop: 10 }}>
            <Button type="submit" onClick={() => SaveTaskStatus(task)}>
              Save
            </Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskStatusModal;
