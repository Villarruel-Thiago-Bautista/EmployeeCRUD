package com.exampleproject.employeecrud.Exceptions;

import com.exampleproject.employeecrud.Models.Gender;

public class GenderNotFound extends RuntimeException{

    public GenderNotFound(Gender gender){
        super("No employees found with the " + gender  + " gender ");
    }
}
