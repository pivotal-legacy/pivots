package pivotal.directory;

import io.pivotal.directory.Employee;
import io.pivotal.directory.EmployeesRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

public class EmployeesRepositoryTest {

    JdbcTemplate jdbcTemplate;
    EmployeesRepository employeesRepository;

    @Before
    public void setUp() throws Exception {
        jdbcTemplate = new JdbcTemplate(SqlTestingUtils.prepareTestingDataSource());
        employeesRepository = new EmployeesRepository(jdbcTemplate);
    }

    @Test
    public void testGetAll() throws Exception {
        try {
            jdbcTemplate.update("INSERT INTO employees (first_name) VALUES ('Rina'), ('Shintaro')");

            List<Employee> employees = employeesRepository.getAll();

            assertThat(employees.get(0).getName(), equalTo("Rina"));
            assertThat(employees.get(1).getName(), equalTo("Shintaro"));

        } finally {
            jdbcTemplate.update("DELETE FROM employees");
        }
    }

    @Test
    public void testFindById() throws Exception {
        try {
            long employeeId = jdbcTemplate.queryForObject(
                    "INSERT INTO employees (first_name) VALUES ('Rina') RETURNING id",
                    (rs, rowNum) -> { return rs.getLong(1); }
            );

            Employee employee = employeesRepository.findById(employeeId);

            assertThat(employee.getId(), equalTo(employeeId));
            assertThat(employee.getName(), equalTo("Rina"));

        } finally {
            jdbcTemplate.update("DELETE FROM employees");
        }
    }
}
