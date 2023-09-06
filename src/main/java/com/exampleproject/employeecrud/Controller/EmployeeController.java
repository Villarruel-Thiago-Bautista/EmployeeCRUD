package com.exampleproject.employeecrud.Controller;

import com.exampleproject.employeecrud.Dto.EmployeeDTO;
import com.exampleproject.employeecrud.Models.Entities.Employee;
import com.exampleproject.employeecrud.Models.Gender;
import com.exampleproject.employeecrud.Services.Implementation.EmployeeServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    @Operation(summary = "Insertar Persona", description = "Inserta una nueva persona.")
    @ApiResponse(responseCode = "200", description = "Persona insertada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeDTO.class)))
    @ApiResponse(responseCode = "400", description = "Error en la solicitud")
    @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    public EmployeeDTO saveEmployee(@Valid @RequestBody Employee employee){
        return employeeServiceImpl.saveEmployee(employee);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener Persona por ID", description = "Obtiene una persona por su ID.")
    @ApiResponse(responseCode = "200", description = "Persona encontrada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeDTO.class)))
    @ApiResponse(responseCode = "400", description = "Error en la solicitud")
    @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    @ApiResponse(responseCode = "404", description = "Persona no encontrada")
    public EmployeeDTO getEmployeeById(@PathVariable Long id) {
        return employeeServiceImpl.getEmployeeById(id);
    }

    @GetMapping("/")
    @Operation(summary = "Obtener Todas las Personas", description = "Obtiene todas las personas.")
    @ApiResponse(responseCode = "200", description = "Lista de todas las personas", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = EmployeeDTO.class))))
    @ApiResponse(responseCode = "400", description = "Error en la solicitud")
    @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    @ApiResponse(responseCode = "404", description = "Lista de personas vacía")
    public List<EmployeeDTO> getAllEmployees(){
        return employeeServiceImpl.getAllEmployees();
    }

    @GetMapping("/gender/{gender}")
    @Operation(summary = "Obtener Lista de Personas por Género", description = "Obtiene una lista de personas por su género.")
    @ApiResponse(responseCode = "200", description = "Lista de personas por género", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = EmployeeDTO.class))))
    @ApiResponse(responseCode = "400", description = "Error en la solicitud")
    @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    @ApiResponse(responseCode = "404", description = "Persona no encontrada por género")
    public List<EmployeeDTO> getEmployeesByGender(@PathVariable Gender gender) {
        return employeeServiceImpl.getEmployeesByGender(gender);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar Persona", description = "Actualiza una persona existente por su ID.")
    @ApiResponse(responseCode = "200", description = "Persona actualizada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeDTO.class)))
    @ApiResponse(responseCode = "400", description = "Error en la solicitud")
    @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    public EmployeeDTO updateEmployeeById(@Valid @PathVariable Long id, @RequestBody Employee employee){
        return employeeServiceImpl.updateEmployeeById(id, employee);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar Persona por ID", description = "Elimina una persona por su ID.")
    @ApiResponse(responseCode = "200", description = "Persona eliminada exitosamente")
    @ApiResponse(responseCode = "400", description = "Error en la solicitud")
    @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    @ApiResponse(responseCode = "404", description = "Persona no encontrada")
    public void deleteEmployeeById(@PathVariable Long id){
        employeeServiceImpl.deleteEmployeeById(id);
    }

    @DeleteMapping("/")
    @Operation(summary = "Eliminar Todas las Personas", description = "Elimina todas las personas.")
    @ApiResponse(responseCode = "200", description = "Todas las personas eliminadas exitosamente")
    @ApiResponse(responseCode = "400", description = "Error en la solicitud")
    @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    @ApiResponse(responseCode = "404", description = "Lista de personas vacía")
    public void deleteEmployeeById(){
        employeeServiceImpl.deleteAllEmployees();
    }

}