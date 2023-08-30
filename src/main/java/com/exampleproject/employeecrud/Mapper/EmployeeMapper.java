package com.exampleproject.employeecrud.Mapper;

import com.exampleproject.employeecrud.Dto.EmployeeDTO;
import com.exampleproject.employeecrud.Models.Entities.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EmployeeMapper {

    EmployeeMapper INSTANCE = Mappers.getMapper(EmployeeMapper.class);

    EmployeeDTO EmployeeToEmployeeDTO(Employee employee);
    Employee EmploteeDTOToEmployee(EmployeeDTO employeeDTO);
}
