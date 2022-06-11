const inquirer = require("inquirer");
const cTable = require("console.table");
const DatabaseConnection = require("./db");

const dbc = new DatabaseConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "D:Ue5kj2/_#!Adi",
    database: "employees_db"
});

const actions = [
    {name: "View All Employees", value: viewEmployees },
    { name: "View All Employees by Department", value: viewEmployeesByDeparment},
    {name: "View All Employees By Manager", value: viewEmployeesByManager},
    {name: "Add Employee", value: addEmployee},
    { name: "Update Employee Position", value: updateEmployeePosition},
  {name: "Update Employee Manager", value: updateEmployeeManager},
  {name: "Delete Employee", value: deleteEmployee},
  {name: "View Positions", value: viewPositions},
  {name: "Add Position", value: addPosition},
  {name: "Update Position Salary", value: updatePositionSalary},
  {name: "Delete Position", value: deletePosition},
  {name: "View Departments", value: viewDepartments},
  {name: "View Total Budget of Department", value: viewTotalBudgetOfDepartment},
  {name: "Add Department", value: addDepartment},
  {name: "Delete Department", value: deleteDepartment},
  {name: "Quit", value: quit}
];

dbc.connect(() => begin());

function begin() {
    inquirer
      .prompt([
          {name: "action",
          type: "list",
          message: "Please selection an option.",
          choices: actions
        }
      ])
      .then(answer => {
          answer.action();
      });
}

function quit() {
    dbc.disconnect();
}

function viewEmployees() {
    dbc.getALLEmployees(resultCb(printTable));
}

function viewEmployeesByManager() {
    dbc.getManagers(managers => {
        inquirer
          .prompt([
              {
                  name: "manager_id",
                  type: "list",
                  message: "Which manager list would you like to view?",
                  choices: managers.map(man => ({ name: man.name, value: man.id }))
                }
            ])
            .then(manager => {
                dbc.getAllEmployeesByManager(manager, resultCb(printTable));
            })
    })
}

function viewEmployeesByDeparment() {
    dbc.getDepartments(departments => {
        inquirer
          .prompt([
              {
                  name: "department_id",
                  type: "list",
                  message: "Which department list would you like to view",
                  choices: departments.map(dep => ({
                      name: dep.department,
                      value: dep.id
                  }))
              }
          ])
          .then(department => {
              dbc.getALLEmployeesByDepartment(
                  department,
                  resultCb(employees => {
                      if (employees.length > 0) {
                          printTable(employees);
                      } else {
                          console.log("No employees in the selected department");
                      }
                  })
              );
          });
    });
}

function addEmployee() {
    dbc.getPositionsAndEmployees(results => {
      inquirer
        .prompt([
          {
            name: "first_name",
            message: "What is the first name of the employee?"
          },
          {
            name: "last_name",
            message: "What is the last name of the employee?"
          },
          {
            name: "position_id",
            type: "list",
            message: "What is the employee's position?",
            choices: results[0].map(position => ({
              name: position.title,
              value: position.id
            }))
          },
          {
            name: "manager_id",
            type: "list",
            message: "Who is the employee's manager?",
            choices: [
              { name: "None", value: null },
              ...results[1].map(emp => ({ name: emp.name, value: emp.id }))
            ]
          }
        ])
        .then(employee => {
          dbc.addEmployee(employee, resultCb("Employee has been added to the database"));
        });
    });
  }

  function updateEmployeePosition() {
    dbc.getPositionsAndEmployees(results => {
      inquirer
        .prompt([
          {
            name: "id",
            type: "list",
            message: "Which employee's position do you want to update?",
            choices: results[1].map(emp => ({ name: emp.name, value: emp.id }))
          },
          {
            name: "position_id",
            type: "list",
            message: "Which position do you want to give the selected employee?",
            choices: results[0].map(position => ({
              name: position.title,
              value: position.id
            }))
          }
        ])
        .then(answers => {
          dbc.updateEmployee(
            { id: answers.id },
            { position_id: answers.position_id },
            resultCb("Updated employee's position.")
          );
        });
    });
  }

  function updateEmployeeManager() {
    dbc.getEmployees(employees => {
      inquirer
        .prompt([
          {
            name: "id",
            type: "list",
            message: "Which employee's manager do you want to update?",
            choices: employees.map(emp => ({ name: emp.name, value: emp.id }))
          },
          {
            name: "manager_id",
            type: "list",
            message:
              "Which employee do you want to set as manager for the selected employee?",
            choices: ans =>
              employees
                .filter(emp => emp.id !== ans.id)
                .map(emp => ({ name: emp.name, value: emp.id }))
          }
        ])
        .then(answers => {
          dbc.updateEmployee(
            { id: answers.id },
            { manager_id: answers.manager_id },
            resultCb("Updated employee's manager.")
          );
        });
    });
  }

  function deleteEmployee() {
    dbc.getEmployees(employees => {
      inquirer
        .prompt([
          {
            name: "id",
            type: "list",
            message: "Which employee do you want to delete?",
            choices: employees.map(emp => ({ name: emp.name, value: emp.id }))
          }
        ])
        .then(employee => {
          dbc.deleteEmployee(employee, resultCb("Deleted employee."));
        });
    });
  }

  function viewPositions() {
    dbc.getPositions(resultCb(printTable));
  }

  function addPosition() {
    dbc.getDepartments(departments => {
      inquirer
        .prompt([
          {
            name: "title",
            message: "What is the position title?"
          },
          {
            name: "salary",
            message: "What is the position's salary?"
          },
          {
            name: "department_id",
            type: "list",
            message: "Which department is the position a part of?",
            choices: departments.map(dep => ({
              name: dep.department,
              value: dep.id
            }))
          }
        ])
        .then(position => {
          dbc.addPosition(position, resultCb("Added positon to the database."));
        });
    });
  }

  function updatePositionSalary() {
    dbc.getPositionsNamesIds(positions => {
      inquirer
        .prompt([
          {
            name: "id",
            type: "list",
            message: "Which position's salary do you want to update?",
            choices: positions.map(position => ({ name: position.title, value: position.id }))
          },
          {
            name: "salary",
            message: "Please add a salary to the selected position?"
          }
        ])
        .then(answers => {
          dbc.updatePosition(
            { id: answers.id },
            { salary: answers.salary },
            resultCb("Position's salary updated.")
          );
        });
    });
  }

  function deletePosition() {
    dbc.getPositionsNamesIds(positions => {
      inquirer
        .prompt([
          {
            name: "id",
            type: "list",
            message: "Which position do you want to delete?",
            choices: positions.map(position => ({ name: position.title, value: position.id }))
          }
        ])
        .then(position => {
          dbc.deleteposition(position, resultCb("Position deleted."));
        });
    });
  }

  function viewDepartments() {
    dbc.getDepartments(resultCb(printTable));
  }

  function viewTotalBudgetOfDepartment() {
    dbc.getDepartments(departments => {
      inquirer
        .prompt([
          {
            name: "department_id",
            type: "list",
            message: "Which department do you want to view the budget of?",
            choices: departments.map(dep => ({
              name: dep.department,
              value: dep.id
            }))
          }
        ])
        .then(department => {
          dbc.getDepartmentsBudget(
            department,
            resultCb(res => {
              console.log(`Total budget: ${res[0].totalSalary.toLocaleString()}`);
            })
          );
        });
    });
  }
  
  function addDepartment() {
    inquirer
      .prompt([
        {
          name: "department",
          message: "What is the department name?"
        }
      ])
      .then(department => {
        dbc.addDepartment(
          department,
          resultCb("Department added to database")
        );
      });
  }

  function deleteDepartment() {
    dbc.getDepartments(departments => {
      inquirer
        .prompt([
          {
            name: "id",
            type: "list",
            message: "Which department do you want to delete?",
            choices: departments.map(dep => ({
              name: dep.department,
              value: dep.id
            }))
          }
        ])
        .then(department => {
          dbc.deleteDepartment(department, resultCb("Department deleted."));
        });
    });
  }
  
  function resultCb(handler) {
    return res => {
      if (res) {
        if (typeof handler === "string") {
          console.log(handler);
        } else {
          handler(res);
        }
      }
      begin();
    };
  }
  
  function printTable(table) {
    console.log();
    console.table(table);
  }