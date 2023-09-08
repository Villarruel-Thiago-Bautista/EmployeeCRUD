package com.exampleproject.employeecrud.Models.Entities;

import com.exampleproject.employeecrud.Models.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Employees")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "The field cannot be empty")
    @NotNull(message = "The field cannot be null")
    @Pattern(regexp = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$", message = "The name field cannot contain numbers or special characters")
    @Schema(description = "Employee's name", example = "John")
    private String name;

    @Column(name = "lastName", nullable = false)
    @NotBlank(message = "The field cannot be empty")
    @NotNull(message = "The field cannot be null")
    @Pattern(regexp = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$", message = "The lastname field cannot contain numbers or special characters")
    @Schema(description = "Employee's name", example = "Doe")
    private String lastName;

    @Column(name = "age", nullable = false)
    @Positive(message = "Must be positive and non-null")
    @NotNull(message = "The field cannot be null")
    @Schema(description = "Employee's age", example = "30")
    private Integer age;

    @Column(name = "email", nullable = false)
    @NotBlank(message = "The field cannot be empty")
    @NotNull(message = "The field cannot be null")
    @Email(message = "The field must contain a valid email address format")
    @Schema(description = "Employee's email address.", example = "example@example.com")
    private String email;

    @Column(name = "cellphone", nullable = false)
    @Positive(message = "Must be positive and non-null")
    @NotNull(message = "The field cannot be null")
    @Schema(description = "Employee's phone number", example = "123456789")
    private Long cellphone;

    @Column(name = "gender", nullable = false)
    @NotNull(message = "The field cannot be null")
    @Enumerated(value = EnumType.STRING)
    @Schema(description = "Employee's phone number", example = "MALE")
    private Gender gender;

    @Column(name = "dni", nullable = false)
    @NotBlank(message = "The field cannot be empty")
    @NotNull(message = "The field cannot be null")
    @Pattern(regexp = "^[0-9]{7,8}$", message = "The DNI (National Identification Document) field must contain 7 or 8 numeric digits.")
    @Schema(description = "Employee's DNI (National Identification Document)", example = "12345678 or 1234567")
    private String dni;



}
