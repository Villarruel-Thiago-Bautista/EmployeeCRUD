package com.exampleproject.employeecrud.Controller;

import com.exampleproject.employeecrud.Exceptions.EmployeeGenderNotFound;
import com.exampleproject.employeecrud.Exceptions.EmployeeNotFoundException;
import com.exampleproject.employeecrud.Exceptions.EmptyListException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionsController {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity EmployeNotFoundExceptionHandler(EmployeeNotFoundException exception) {

        String message;
        message = exception.getMessage();
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmptyListException.class)
    public ResponseEntity EmptyListExceptionHandler(EmptyListException exception) {

        String message;
        message = exception.getMessage();
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmployeeGenderNotFound.class)
    public ResponseEntity EmployeeGenderNotFoundHandler(EmployeeGenderNotFound exception) {

        String message;
        message = exception.getMessage();
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
}
