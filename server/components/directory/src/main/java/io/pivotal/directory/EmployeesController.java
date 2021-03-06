package io.pivotal.directory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class EmployeesController {

    private EmployeesRepository employeesRepository;

    @Autowired
    public EmployeesController(EmployeesRepository employeesRepository) {
        this.employeesRepository = employeesRepository;
    }

    @RequestMapping(value = "/employees", method = GET)
    public List<Employee> getAllEmployees() {
        return employeesRepository.selectAll();
    }

    @RequestMapping(value = "/employees/{id}", method = GET)
    public Employee getSingleEmployee(@PathVariable long id) {
        Optional<Employee> employee = employeesRepository.selectById(id);

        if (employee.isPresent()) {
            return employee.get();
        }

        throw new RestControllerException("The employee with ID " + id + " was not found.");
    }

}
