package com.exampleproject.employeecrud.Exceptions;

public class EmployeeNotFoundException extends RuntimeException {

    public EmployeeNotFoundException(Long id){
        super("No se encontró un empleado con el id especificado");
    }
}
