package io.pivotal.directory;

import org.springframework.stereotype.Repository;

import java.util.List;

import static java.util.Arrays.asList;

@Repository
public class EmployeesRepository {
    public List<Employee> getAll() {
        return asList();
    }
}
