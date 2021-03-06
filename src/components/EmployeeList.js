import Employee from "./Employee";
import PaginationLine from "./Pagination";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { map, slice } from "lodash";
import AddForm from "./AddForm";

const EmployeeList = () => {
  const { sortedEmployees } = useContext(EmployeeContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(4);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const toggleModal = (value) => {
    setModalIsVisible((prevState) =>
      typeof value === "boolean" ? value : !prevState
    );
  };

  useEffect(() => {
    toggleModal(false);
  }, [sortedEmployees]);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = slice(
    sortedEmployees,
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage);

  return (
    <>
      <div className='table-title'>
        <div className='row'>
          <div className='col-6'>
            <h2>
              Manage <b>Employees</b>
            </h2>
          </div>
          <div className='col-6'>
            <Button
              onClick={toggleModal}
              className='btn btn-success'
              data-toggle='modal'
            >
              <i className='material-icons'>&#xE147;</i>
              <span className='mt-0'>Add New Employee</span>
            </Button>
          </div>
        </div>
      </div>

      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {map(currentEmployees, (employee, index) => (
            <tr key={employee.id}>
              <td>{index}</td>
              <Employee employee={employee} />
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationLine
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentEmployees={currentEmployees}
        sortedEmployees={sortedEmployees}
      />

      <Modal show={modalIsVisible} onHide={toggleModal}>
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => toggleModal(false)} variant='secondary'>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeList;
