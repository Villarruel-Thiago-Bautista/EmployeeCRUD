package com.exampleproject.employeecrud.Services;

import com.exampleproject.employeecrud.Dto.EmployeeDTO;
import com.exampleproject.employeecrud.Models.Entities.Employee;

import java.util.List;

public interface EmployeeService {

    EmployeeDTO saveEmployee(Employee employee);
    EmployeeDTO getEmployeeById(Long id);
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO updateEmployeeById(Long id, Employee employee);
    void deleteEmployeeById(Long id);
    void deleteAllEmployees();

}
