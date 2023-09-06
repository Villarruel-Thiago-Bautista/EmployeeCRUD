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
    @NotBlank(message = "El campo no puede estar vacio")
    @NotNull(message = "El campo no puede ser nulo")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "El campo nombre no puede contener números ni caracteres especiales")
    @Schema(description = "Nombre del empleado", example = "John")
    private String name;

    @Column(name = "lastName", nullable = false)
    @NotBlank(message = "El campo no puede estar vacio")
    @NotNull(message = "El campo no puede ser nulo")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "El campo nombre no puede contener números ni caracteres especiales")
    @Schema(description = "Apellido del empleado", example = "Doe")
    private String lastName;

    @Column(name = "age", nullable = false)
    @Positive(message = "Debe ser positivo y no nulo")
    @NotNull(message = "El campo no puede ser nulo")
    @Schema(description = "Edad del empleado", example = "30")
    private Integer age;

    @Column(name = "email", nullable = false)
    @NotBlank(message = "El campo no puede estar vacio")
    @NotNull(message = "El campo no puede ser nulo")
    @Email(message = "El campo debe contener un formato de direccion de correo electronico valido")
    @Schema(description = "Correo electrónico del empleado", example = "example@example.com")
    private String email;

    @Column(name = "cellphone", nullable = false)
    @Positive(message = "Debe ser positivo y no nulo")
    @NotNull(message = "El campo no puede ser nulo")
    @Schema(description = "Número de teléfono del empleado", example = "123456789")
    private Long cellphone;

    @Column(name = "gender", nullable = false)
    @NotNull(message = "El campo no puede ser nulo")
    @Enumerated(value = EnumType.STRING)
    @Schema(description = "Género del empleado", example = "MASCULINO")
    private Gender gender;

    @Column(name = "dni", nullable = false)
    @NotBlank(message = "El campo no puede estar vacio")
    @NotNull(message = "El campo no puede ser nulo")
    @Pattern(regexp = "^[0-9]{8}$", message = "El campo DNI debe contener 8 dígitos numéricos")
    @Schema(description = "DNI del empleado", example = "12345678")
    private String dni;



}
