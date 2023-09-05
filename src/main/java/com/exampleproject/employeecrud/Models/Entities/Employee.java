package com.exampleproject.employeecrud.Models.Entities;

import com.exampleproject.employeecrud.Models.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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

    @Column(name = "email", nullable = false)
    @NotBlank(message = "El campo no puede estar vacio")
    @NotNull(message = "El campo no puede ser nulo")
    @Email(message = "El campo debe contener un formato de direccion de correo electronico valido")
    private String email;

    @Column(name = "gender", nullable = false)
    @NotNull(message = "El campo no puede ser nulo")
    @Enumerated(value = EnumType.STRING)
    private Gender gender;

    @Column(name = "dni", nullable = false)
    @NotBlank(message = "El campo no puede estar vacio")
    @NotNull(message = "El campo no puede ser nulo")
    private String dni;



}
