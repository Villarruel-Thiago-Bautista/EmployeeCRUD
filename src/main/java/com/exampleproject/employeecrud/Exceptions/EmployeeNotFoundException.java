package com.exampleproject.employeecrud.Exceptions;

public class EmployeeNotFoundException extends RuntimeException {

    public EmployeeNotFoundException(Long id){
        super("No employee found with the specified ID");
    }
}
