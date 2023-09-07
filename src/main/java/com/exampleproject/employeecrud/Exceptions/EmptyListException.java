package com.exampleproject.employeecrud.Exceptions;

public class EmptyListException extends RuntimeException{

    public EmptyListException(){
        super("No employees are loaded in the database");
    }
}
