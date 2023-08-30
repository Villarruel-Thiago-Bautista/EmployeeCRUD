package com.exampleproject.employeecrud.Exceptions;

public class EmptyListException extends RuntimeException{

    public EmptyListException(){
        super("No se encuentran empleados cargados en la base de datos");
    }
}
