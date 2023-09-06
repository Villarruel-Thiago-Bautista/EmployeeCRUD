package com.exampleproject.employeecrud.Models.Entities;

import com.exampleproject.employeecrud.Models.Gender;
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
    @NotBlank(message = "El campo no puede estar vacio")
    @NotNull(message = "El campo no puede ser nulo")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "El campo nombre no puede contener números ni caracteres especiales")
    private String name;

    @Column(name = "lastName", nullable = false)
    @NotBlank(message = "El campo no puede estar vacio")
    @NotNull(message = "El campo no puede ser nulo")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "El campo nombre no puede contener números ni caracteres especiales")
    private String lastName;

    @Column(name = "age", nullable = false)
    @Positive(message = "Debe ser positivo y no nulo")
    @NotNull(message = "El campo no puede ser nulo")
    private Integer age;

    @Column(name = "email", nullable = false)
    @NotBlank(message = "El campo no puede estar vacio")
    @NotNull(message = "El campo no puede ser nulo")
    @Email(message = "El campo debe contener un formato de direccion de correo electronico valido")
    private String email;

    @Column(name = "cellphone", nullable = false)
    @Positive(message = "Debe ser positivo y no nulo")
    @NotNull(message = "El campo no puede ser nulo")
    private Long cellphone;

    @Column(name = "gender", nullable = false)
    @NotNull(message = "El campo no puede ser nulo")
    @Enumerated(value = EnumType.STRING)
    private Gender gender;

    @Column(name = "dni", nullable = false)
    @NotBlank(message = "El campo no puede estar vacio")
    @NotNull(message = "El campo no puede ser nulo")
    @Pattern(regexp = "^[0-9]{8}$", message = "El campo DNI debe contener 8 dígitos numéricos")
    private String dni;



}
