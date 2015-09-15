package pivotal.directory;

import io.pivotal.directory.Employee;
import io.pivotal.directory.EmployeesRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Optional;

import static io.pivotal.testing.data.SqlTestingUtils.prepareTestingDataSource;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class EmployeesRepositoryTest {

    JdbcTemplate jdbcTemplate;
    EmployeesRepository employeesRepository;

    @Before
    public void setUp() throws Exception {
        jdbcTemplate = new JdbcTemplate(prepareTestingDataSource());
        employeesRepository = new EmployeesRepository(jdbcTemplate);
    }

    @Test
    public void testSelectAll() throws Exception {
        try {
            jdbcTemplate.update("INSERT INTO employees (first_name) VALUES ('Rina'), ('Shintaro')");

            List<Employee> employees = employeesRepository.selectAll();

            assertThat(employees.get(0).getFirstName(), equalTo("Rina"));
            assertThat(employees.get(1).getFirstName(), equalTo("Shintaro"));

        } finally {
            jdbcTemplate.update("DELETE FROM employees");
        }
    }

    @Test
    public void testSelectById() throws Exception {
        try {
            long employeeId = jdbcTemplate.queryForObject(
                    "INSERT INTO employees (first_name) VALUES ('Rina') RETURNING id",
                    (rs, rowNum) -> {
                        return rs.getLong(1);
                    }
            );

            Employee employee = employeesRepository.selectById(employeeId).get();

            assertThat(employee.getId(), equalTo(employeeId));
            assertThat(employee.getFirstName(), equalTo("Rina"));

        } finally {
            jdbcTemplate.update("DELETE FROM employees");
        }
    }

    @Test
    public void testSelectById_whenNotFound() throws Exception {
        Optional<Employee> optionalEmployee = employeesRepository.selectById(1L);

        assertThat(optionalEmployee.isPresent(), is(false));
    }
}
