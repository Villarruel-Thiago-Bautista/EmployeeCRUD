package com.exampleproject.employeecrud.Services;

import com.exampleproject.employeecrud.Dto.EmployeeDTO;
import com.exampleproject.employeecrud.Models.Entities.Employee;
import com.exampleproject.employeecrud.Models.Gender;

import java.util.List;

public interface EmployeeService {

    //POST

    EmployeeDTO saveEmployee(Employee employee);

    //GET

    EmployeeDTO getEmployeeById(Long id);
    List<EmployeeDTO> getAllEmployees();
    List<EmployeeDTO> getEmployeesByGender(Gender gender);

    //PUTT

    EmployeeDTO updateEmployeeById(Long id, Employee employee);

    //DELETE

    void deleteEmployeeById(Long id);
    void deleteAllEmployees();

}
