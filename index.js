const inquirer = require("inquirer");
const DatabaseConnection = require("./db");

const dbc = new DatabaseConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_db"
});

const actions = [
    {name: "View All Employees", value: viewEmployees },
    { name: "View All Employees by Department", value: viewEmployeesByDeparment},
    {name: "View All Employees By Manager", value: viewEmployeesByManager},
    {name: "Add Employee", value: addEmployee},
    { name: "Update Employee Position", value: updateEmployeePosition},
  {name: "Update Employee Manager", value: updateEmployeeManager},
  {name: "Remove Employee", value: removeEmployee},
  {name: "View Positions", value: viewPositions},
  {name: "Add Position", value: addPosition},
  {name: "Update Position Salary", value: updatePositionsalary},
  {name: "Remove Position", value: removePosition},
  {name: "View Departments", value: viewDepartments},
  {name: "View Total Budget of Department", value: viewTotalBudgetOfDepartment},
  {name: "Add Department", value: addDepartment},
  {name: "Remove Department", value: removeDepartment},
  {name: "Exit", value: exit}
];
