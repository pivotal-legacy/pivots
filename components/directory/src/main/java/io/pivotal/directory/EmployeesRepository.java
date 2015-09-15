package io.pivotal.directory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class EmployeesRepository {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
    public EmployeesRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Employee> selectAll() {
        return jdbcTemplate.query(
                "SELECT * FROM employees",
                (rs, rowNum) -> {
                    return buildEmployee(rs);
                }
        );
    }

    public Optional<Employee> selectById(long id) {
        try {
            return jdbcTemplate.queryForObject(
                    "SELECT * FROM employees WHERE id = (?)",
                    (rs, rowNum) -> {
                        return Optional.of(buildEmployee(rs));
                    },
                    id
            );
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    private Employee buildEmployee(ResultSet rs) throws SQLException {
        return new Employee(
                rs.getInt("id"),
                rs.getString("first_name"),
                rs.getString("last_name"),
                rs.getString("image_url"),
                rs.getString("title"),
                rs.getString("manager"),
                rs.getString("email"),
                rs.getString("location"),
                rs.getString("start_date")
        );
    }
}
