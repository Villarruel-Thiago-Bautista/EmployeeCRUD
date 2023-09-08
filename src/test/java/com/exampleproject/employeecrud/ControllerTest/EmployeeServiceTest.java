package com.exampleproject.employeecrud.ControllerTest;

import com.exampleproject.employeecrud.Dto.EmployeeDTO;
import com.exampleproject.employeecrud.Exceptions.EmptyListException;
import com.exampleproject.employeecrud.Models.Entities.Employee;
import com.exampleproject.employeecrud.Models.Gender;
import com.exampleproject.employeecrud.Repositories.EmployeeRepository;
import com.exampleproject.employeecrud.Services.Implementation.EmployeeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;
    private EmployeeServiceImpl employeeServiceImpl;

    @BeforeEach
    public void setUp() {
        employeeServiceImpl = new EmployeeServiceImpl(employeeRepository);
    }


    @Test
    public void saveEmployeeTest(){
        Employee employee = new Employee();
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        EmployeeDTO result = employeeServiceImpl.saveEmployee(new Employee());

        assertNotNull(result);
        verify(employeeRepository, times(1)).save(any(Employee.class));

    }

    @Test
    public void getEmployeeByIdTest(){
        Employee employee = new Employee();
        employee.setId(1L);


        when(employeeRepository.findById(1L)).thenReturn(java.util.Optional.of(employee));

        EmployeeDTO result = employeeServiceImpl.getEmployeeById(1L);

        assertNotNull(result);


        verify(employeeRepository, times(1)).findById(1L);
    }

    @Test
    public void GetAllEmployeesTest() {
        List<Employee> employeeList = new ArrayList<>();
        employeeList.add(new Employee());
        employeeList.add(new Employee());

        when(employeeRepository.findAll()).thenReturn(employeeList);

        List<EmployeeDTO> result = employeeServiceImpl.getAllEmployees();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        verify(employeeRepository, times(1)).findAll();
    }

    @Test
    public void getEmployeesByGenderTest() {
        List<Employee> employeesList = new ArrayList<>();
        employeesList.add(new Employee(1L, "Thiago", "uihdwiu", 39, "example@example.com", 123456789L, Gender.MALE, "1234567"));
        employeesList.add(new Employee(1L, "Thiago", "uihdwiu", 39, "example@example.com", 123456789L, Gender.MALE, "1234567"));

        Gender genderToFilter = Gender.MALE;

        when(employeeRepository.findAllByGender(genderToFilter)).thenReturn(employeesList);
        List<EmployeeDTO> result = employeeServiceImpl.getEmployeesByGender(genderToFilter);

        assertNotNull(result);
        assertEquals(2,result.size());
    }

    @Test
    public void deleteEmployeeByIdTest() {
        Employee employee = new Employee();
        employee.setId(1L);
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        doNothing().when(employeeRepository).deleteById(1L);

        employeeServiceImpl.deleteEmployeeById(1L);


        verify(employeeRepository, times(1)).deleteById(1L);
    }


    @Test
    public void updateEmployeeById(){
        Long id = 1L;
        Employee employee = new Employee();
        Employee employeeUpdate = new Employee();
        employee.setId(1L);
        employee.setName("Thiago");
        employeeUpdate.setId(1L);
        employeeUpdate.setName("GordoTrolo");

        when(employeeRepository.findById(id)).thenReturn(java.util.Optional.of(employeeUpdate));

        EmployeeDTO result = employeeServiceImpl.updateEmployeeById(id, employeeUpdate);

        verify(employeeRepository, times(1)).findById(id);
        verify(employeeRepository, times(1)).save(employeeUpdate);

        assertEquals(employeeUpdate.getName(), result.getName());
    }




}
