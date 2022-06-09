const mysql = require("mysql");

class DatabaseConnection {
    constructor(config) {
        this.config = config;
        this.connection = mysql.createConnection({
            ...this.config,
            multipleStatements: true
        });
    }

    connect(cb) {
        this.connection.connect(err => {
            if (err) {
                throw err;
            }

            cb();
        });
    }

    disconnect() {
        this.connection.end();
    }

    getALLEmployees(cb) {
        this.runQuery(
            `SELECT e.id, e.first_name, e.last_name, title, department, salary, 
      concat(m.first_name, ' ', m.last_name) AS manager FROM employees e
      INNER JOIN positions ON e.position_id = positions.id
      INNER JOIN departments ON positions.department_id = departments.id
      LEFT JOIN employees m ON e.manager_id = m.id
      ORDER BY e.id`,
      null,
      cb
    );
  }

  getALLEmployeesByDepartment(department, cb) {
      this.runQuery(
        `SELECT e.id, e.first_name, e.last_name, title, salary,
        concat(m.first_name, ' ', m.last_name) AS manager FROM employees e
        INNER JOIN positions ON e.position_id = positions.id
        LEFT JOIN employees m ON e.manager_id = m.id
        WHERE ?
        ORDER BY e.id;`,
        department,
        cb
      );
  }

  getEmployees(cb) {
      this.runQuery(
        `SELECT concat(first_name, ' ', last_name) AS name, id FROM employees`,
        null,
        cb
      );
  }

  getManagers(cb) {
      this.runQuery(
        `SELECT DISTINCT concat(m.first_name, ' ', m.last_name) AS name, m.id FROM employees m
        INNER JOIN employees e ON e.manager_id = m.id
        ORDER BY m.id`,
        null,
        cb
      );
  }

  getPositionsAndEmployees(cb) {
      this.runQuery(
        `SELECT title, id FROM positions;
      SELECT concat(first_name, ' ', last_name) AS name, id FROM employees`,
      null,
      cb
      );
  }

  addEmployee(employee, cb) {
      this.runQuery(`INSERT INTO employees SET ?`, employee, cb);
  }

  updateEmployee(employee, value, cb) {
    this.runQuery(`UPDATE employees SET ? WHERE ?`, [value, employee], cb);
  }

  deleteEmployee(employee, cb) {
    this.runQuery(`DELETE FROM employees WHERE ?`, employee, cb);
  }

  getPositions(cb) {
      this.runQuery(
        `SELECT positions.id, title, salary, department FROM positions 
        INNER JOIN departments ON positions.department_id = departments.id
        ORDER BY positions.id`,
        null,
        cb
      );
  }

  getPositionsNamesIds(cb) {
      this.runQuery(`SELECT id, title FROM positions`, null, cb);
  }

  addPosition(position, cb) {
    this.runQuery(`INSERT INTO positions SET ?`, position, cb);
  }

  updatePosition(position, value, cb) {
    this.runQuery(`UPDATE positions SET ? WHERE ?`, [value, position], cb);
  }

  deletePosition(position, cb) {
    this.runQuery(`DELETE FROM positions WHERE ?`, position, cb);
  }

  getDepartments(cb) {
    this.runQuery(`SELECT id, department FROM departments`, null, cb);


  }

  getDepartmentsBudget(department, cb) {
    this.runQuery(
      `SELECT sum(salary) AS totalSalary FROM employees e
      INNER JOIN positions ON e.position_id = positions.id
      WHERE ?`,
      department,
      cb
    );
  }

  addDepartment(department, cb) {
    this.runQuery(`INSERT INTO departments SET ?`, department, cb);
  }

  deleteDepartment(department, cb) {
    this.runQuery(`DELETE FROM departments WHERE ?`, department, cb);
  }

  runQuery(sql, values, cb) {
    this.connection.query(sql, values, (err, res) => {
      if (err) {
        if (err.fatal) throw err; 
        console.log("Sorry, I can't process this request"); 
        return cb();
      }

      return cb(res);
    });
  }
}

module.exports = DatabaseConnection;