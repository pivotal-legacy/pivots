package io.pivotal.directory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeesController {

    private EmployeesRepo employeesRepo;

    @Autowired
    public EmployeesController(EmployeesRepo employeesRepo) {
        this.employeesRepo = employeesRepo;
    }

    @RequestMapping(value = "/")
    public void getAllEmployees() {
        employeesRepo.getAll();
    }
}
