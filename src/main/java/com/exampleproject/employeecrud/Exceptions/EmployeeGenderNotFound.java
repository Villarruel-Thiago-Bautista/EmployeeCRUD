package com.exampleproject.employeecrud.Exceptions;

import com.exampleproject.employeecrud.Models.Gender;

public class EmployeeGenderNotFound extends RuntimeException{

    public EmployeeGenderNotFound(Gender gender){
        super("No se han encontrado empleados con el genero: " + gender);
    }
}
