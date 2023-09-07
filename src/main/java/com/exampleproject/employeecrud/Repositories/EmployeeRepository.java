package com.exampleproject.employeecrud.Repositories;

import com.exampleproject.employeecrud.Models.Entities.Employee;
import com.exampleproject.employeecrud.Models.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findAllByGender(Gender gender);

}
