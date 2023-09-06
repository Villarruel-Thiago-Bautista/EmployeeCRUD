package com.exampleproject.employeecrud.Controller;

import com.exampleproject.employeecrud.Dto.EmployeeDTO;
import com.exampleproject.employeecrud.Models.Entities.Employee;
import com.exampleproject.employeecrud.Models.Gender;
import com.exampleproject.employeecrud.Services.Implementation.EmployeeServiceImpl;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController{

    private final EmployeeServiceImpl employeeServiceImpl;

    public EmployeeController(EmployeeServiceImpl employeeServiceImpl) {
        this. employeeServiceImpl = employeeServiceImpl;
    }

    @PostMapping("/")
    public EmployeeDTO saveEmployee(@Valid @RequestBody Employee employee){
        return employeeServiceImpl.saveEmployee(employee);
    }

    @GetMapping("/{id}")
    public EmployeeDTO getEmployeeById(@PathVariable Long id) {
        return employeeServiceImpl.getEmployeeById(id);
    }

    @GetMapping("/")
    public List<EmployeeDTO> getAllEmployees(){
        return employeeServiceImpl.getAllEmployees();
    }

    @GetMapping("/gender/{gender}")
    public List<EmployeeDTO> getEmployeesByGender(@PathVariable Gender gender) {
        return employeeServiceImpl.getEmployeesByGender(gender);
    }

    @PutMapping("/{id}")
    public EmployeeDTO updateEmployeeById(@Valid @PathVariable Long id, @RequestBody Employee employee){
        return employeeServiceImpl.updateEmployeeById(id, employee);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployeeById(@PathVariable Long id){
        employeeServiceImpl.deleteEmployeeById(id);
    }

    @DeleteMapping("/")
    public void deleteEmployeeById(){
        employeeServiceImpl.deleteAllEmployees();
    }

}