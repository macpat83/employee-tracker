# Employee Manager

## Description

Employee Manager is a Node CLI tool that allows users to manage the departments, roles, and employees of a company. The user can perform various tasks like adding, removing, or updating employees, roles, and departments. For a full list of what tasks a user can perform, start the application and see what actions are available in the list when prompted with "What would you like to do?".

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Example Usage](#example-usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

To install the required dependencies, run `npm init` then `npm install`
If you run into any errors with the mysql and console-table modules you can install them again using `npm install mysql` and `npm install console.table --save`

This project assumes there is a MySQL server running on localhost:3306. Please also enter your mysql password to log in.


Please run the the `CREATE DATABASE employees_db;` and `USE employees_db;` then seed both files using `source db\schema.sql` and `source db\seed.sql` so you have a database with entries for test cases.

## Usage

To start the application, run `npm start`

To exit the application, select `Quit` from the list within the application when prompted with "What would you like do?".

## Example Usage

Video Demonstration: https://drive.google.com/file/d/1qLgREA0rULmGKIsIlgetkJnbfL8wHlOV/view 


## Contributing

If you want to contribute, open a Pull Request and include a detailed description and screenshots of the changes.

## Questions

If you have any questions about the repo, open an issue or contact me at macpat@gmail.com
