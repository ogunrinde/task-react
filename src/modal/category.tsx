import { Col, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { ChangeEvent, useState } from "react";

type CategoryProps = {
  show: boolean;
  handleCloseBtn: () => void;
  taskCategories: Category[];
  Save: (category: Partial<addCategory>) => void;
};
const CategoryModal: React.FC<CategoryProps> = ({
  show,
  handleCloseBtn,
  taskCategories,
  Save,
}) => {
  const initialState = {
    name: "",
    afterCategoryId: "",
    completed: false,
  };
  const [category, setCategory] = useState<Partial<addCategory>>(initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleInputChange2 = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };
  return (
    <div className="App">
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleCloseBtn}>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={category.name}
              placeholder=""
              required
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="12"
            controlId="validationCustom03"
            style={{ marginTop: 10 }}
          >
            <Form.Label>After Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="afterCategoryId"
              defaultValue={category.afterCategoryId}
              onChange={handleInputChange2}
            >
              <option></option>
              {taskCategories.map((taskcategory, index) => (
                <option key={index} value={taskcategory.categoryId}>
                  {taskcategory.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ marginTop: 10 }}>
            <Button type="submit" onClick={() => Save(category)}>
              Save
            </Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CategoryModal;
