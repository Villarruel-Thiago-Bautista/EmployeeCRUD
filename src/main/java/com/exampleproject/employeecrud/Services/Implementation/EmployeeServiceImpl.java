package com.exampleproject.employeecrud.Services.Implementation;

import com.exampleproject.employeecrud.Dto.EmployeeDTO;
import com.exampleproject.employeecrud.Exceptions.EmployeeGenderNotFound;
import com.exampleproject.employeecrud.Exceptions.EmployeeNotFoundException;
import com.exampleproject.employeecrud.Exceptions.EmptyListException;
import com.exampleproject.employeecrud.Mapper.EmployeeMapper;
import com.exampleproject.employeecrud.Models.Entities.Employee;
import com.exampleproject.employeecrud.Models.Gender;
import com.exampleproject.employeecrud.Repositories.EmployeeRepository;
import com.exampleproject.employeecrud.Services.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    @Override
    public EmployeeDTO saveEmployee(Employee employee) {

        employeeRepository.save(employee);
        return EmployeeMapper.INSTANCE.employeeToEmployeeDTO(employee);
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id).orElseThrow(()-> new EmployeeNotFoundException(id));
        return EmployeeMapper.INSTANCE.employeeToEmployeeDTO(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {

        List<Employee> employeeList = employeeRepository.findAll();
        if(employeeList.isEmpty()) {
            throw new EmptyListException();
        } else {
            return EmployeeMapper.INSTANCE.employeeListToEmployeeDTOList(employeeList);
        }
    }

    @Override
    public List<EmployeeDTO> getEmployeesByGender(Gender gender) {

        List<Employee> employeeList = employeeRepository.findAllByGender(gender);
        if(gender == Gender.MASCULINO  && employeeList.stream().noneMatch(employee -> employee.getGender() == gender) || gender == Gender.FEMENINO && employeeList.stream().noneMatch(employee -> employee.getGender() == gender)) {
            throw new EmployeeGenderNotFound(gender);
        } else {
            return EmployeeMapper.INSTANCE.employeeListToEmployeeDTOList(employeeList);
        }
    }


    @Override
    public EmployeeDTO updateEmployeeById(Long id, Employee employee) {

        Employee employeeUpdated = employeeRepository.findById(id).orElseThrow(()-> new EmployeeNotFoundException(id));
        employeeUpdated.setName(employee.getName());
        employeeUpdated.setLastName(employee.getLastName());
        employeeUpdated.setAge(employee.getAge());
        employeeUpdated.setEmail(employee.getEmail());
        employeeUpdated.setCellphone(employee.getCellphone());
        employeeUpdated.setGender(employee.getGender());
        employeeUpdated.setDni(employee.getDni());
        employeeRepository.save(employeeUpdated);
        return EmployeeMapper.INSTANCE.employeeToEmployeeDTO(employeeUpdated);

    }

    @Override
    public void deleteEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id).orElseThrow(()-> new EmployeeNotFoundException(id));
        employeeRepository.deleteById(id);
    }

    @Override
    public void deleteAllEmployees() {

        List<Employee> employeeList = employeeRepository.findAll();
        if (employeeList.isEmpty()) {
            throw new EmptyListException();
        } else {
            employeeRepository.deleteAll();
        }
    }

}
