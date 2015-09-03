package io.pivotal.directory;

import org.springframework.stereotype.Repository;

import java.util.List;

import static java.util.Arrays.asList;

@Repository
public class EmployeesRepository {
    public List<Employee> getAll() {
        return asList(
                new Employee(1, "Danny"),
                new Employee(2, "Jeana"),
                new Employee(3, "Whitney"),
                new Employee(4, "Heewon"),
                new Employee(5, "Yuki"),
                new Employee(6, "Eno")
        );
    }
}
