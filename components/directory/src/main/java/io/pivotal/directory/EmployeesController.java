package io.pivotal.directory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EmployeesController {

    private EmployeesRepository employeesRepository;

    @Autowired
    public EmployeesController(EmployeesRepository employeesRepository) {
        this.employeesRepository = employeesRepository;
    }

    @RequestMapping(value = "/employees")
    public List<Employee> getAllEmployees() {
        return employeesRepository.getAll();
    }
}
