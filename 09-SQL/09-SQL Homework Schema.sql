''' This creates all the tables. '''

CREATE TABLE departments (
    dept_no varchar   NOT NULL primary key,
    dept_name varchar   NOT NULL
    );

CREATE TABLE titles (
    title_id varchar   NOT NULL primary key,
    title varchar   NOT NULL
    );

CREATE TABLE employees (
    emp_no int   NOT NULL primary key,
    emp_title varchar   NOT NULL,
    birth_date date   NOT NULL,
    first_name varchar   NOT NULL,
    last_name varchar   NOT NULL,
    sex char(1)   NOT NULL,
    hire_date date   NOT NULL
	);

CREATE TABLE salaries (
    emp_no int   NOT NULL,
    salary real   NOT NULL,
	foreign key (emp_no) references employees(emp_no)
	);
	
CREATE TABLE dept_manager (
    dept_no varchar   NOT NULL,
    emp_no int   NOT NULL,
	foreign key (dept_no) references departments(dept_no),
	foreign key (emp_no) references employees(emp_no)
	);

CREATE TABLE dept_emp (
	emp_no int   NOT NULL,
    dept_no varchar   NOT NULL,
    foreign key (dept_no) references departments(dept_no),
	foreign key (emp_no) references employees(emp_no)
	);
	
	