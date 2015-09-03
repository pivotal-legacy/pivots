package pivotal.directory;

import io.pivotal.directory.Employee;
import io.pivotal.directory.EmployeesRepo;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;

public class EmployeesRepoTest {

    @Before
    public void setUp() throws Exception {


    }

    @Test
    public void testGetAll() throws Exception {
        EmployeesRepo employeesRepo = new EmployeesRepo();

        List<Employee> employees = employeesRepo.getAll();
        assertThat(employees.get(0).getName(), is("aaa"));
    }
}
