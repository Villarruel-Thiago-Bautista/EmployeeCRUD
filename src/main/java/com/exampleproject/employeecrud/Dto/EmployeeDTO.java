package com.exampleproject.employeecrud.Dto;

import com.exampleproject.employeecrud.Models.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {

    private Long id;
    private String name;
    private String lastName;
    private Integer age;
    private String email;
    private Long cellphone;
    private Gender gender;
    private String dni;

}