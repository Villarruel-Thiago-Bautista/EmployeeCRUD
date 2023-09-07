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
    @Operation(summary = "Insert person", description = "Insert a new person.")
    @ApiResponse(responseCode = "200", description = "Person inserted successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeDTO.class)))
    @ApiResponse(responseCode = "400", description = "Request error")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public EmployeeDTO saveEmployee(@Valid @RequestBody Employee employee){
        return employeeServiceImpl.saveEmployee(employee);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get person by ID", description = "Gets a person by their id.")
    @ApiResponse(responseCode = "200", description = " Person found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeDTO.class)))
    @ApiResponse(responseCode = "400", description = "Request error")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    @ApiResponse(responseCode = "404", description = "Person not found")
    public EmployeeDTO getEmployeeById(@PathVariable Long id) {
        return employeeServiceImpl.getEmployeeById(id);
    }

    @GetMapping("/")
    @Operation(summary = "Get all persons", description = "Gets all persons.")
    @ApiResponse(responseCode = "200", description = "List of all persons", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = EmployeeDTO.class))))
    @ApiResponse(responseCode = "400", description = "Request error")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    @ApiResponse(responseCode = "404", description = "Empty list of persons")
    public List<EmployeeDTO> getAllEmployees(){
        return employeeServiceImpl.getAllEmployees();
    }

    @GetMapping("/gender/{gender}")
    @Operation(summary = "Get list of persons by gender", description = "Gets a list of persons by their gender.")
    @ApiResponse(responseCode = "200", description = "List of persons by gender", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = EmployeeDTO.class))))
    @ApiResponse(responseCode = "400", description = "Request error")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    @ApiResponse(responseCode = "404", description = "Person not found by gender")
    public List<EmployeeDTO> getEmployeesByGender(@PathVariable Gender gender) {
        return employeeServiceImpl.getEmployeesByGender(gender);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update person", description = "Updates an existing person by their ID.")
    @ApiResponse(responseCode = "200", description = "Person updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeDTO.class)))
    @ApiResponse(responseCode = "400", description = "Request error")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public EmployeeDTO updateEmployeeById(@Valid @PathVariable Long id, @RequestBody Employee employee){
        return employeeServiceImpl.updateEmployeeById(id, employee);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete person by ID", description = "Deletes a person by their ID.")
    @ApiResponse(responseCode = "200", description = "Person deleted successfully")
    @ApiResponse(responseCode = "400", description = "Request error")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    @ApiResponse(responseCode = "404", description = "Person not found")
    public void deleteEmployeeById(@PathVariable Long id){
        employeeServiceImpl.deleteEmployeeById(id);
    }

    @DeleteMapping("/")
    @Operation(summary = "Delete all persons", description = "Deletes all persons.")
    @ApiResponse(responseCode = "200", description = "All persons deleted successfully")
    @ApiResponse(responseCode = "400", description = "Request error")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    @ApiResponse(responseCode = "404", description = "Empty list of persons")
    public void deleteEmployeeById(){
        employeeServiceImpl.deleteAllEmployees();
    }

}