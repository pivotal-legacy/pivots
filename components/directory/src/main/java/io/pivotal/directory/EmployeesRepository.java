package io.pivotal.directory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class EmployeesRepository {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public EmployeesRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Employee> selectAll() {
        return jdbcTemplate.query("SELECT * FROM employees", (rs, rowNum) -> {
            return new Employee(rs.getInt(1), rs.getString(2));
        });
    }

    public Optional<Employee> selectById(long id) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM employees WHERE id = (?)", (rs, rowNum) -> {
                return Optional.of(new Employee(rs.getInt(1), rs.getString(2)));
            }, id);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }
}
