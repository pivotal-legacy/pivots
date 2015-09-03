package pivotal.directory;


import io.pivotal.directory.Employee;
import io.pivotal.directory.EmployeesController;
import io.pivotal.directory.EmployeesRepo;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static java.util.Arrays.asList;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

public class EmployeesControllerTest {
    MockMvc mockMvc;
    EmployeesRepo repo;

    @Before
    public void setUp() throws Exception {
        repo = mock(EmployeesRepo.class);
        EmployeesController employeesController = new EmployeesController(repo);

        mockMvc = standaloneSetup(employeesController).build();
    }

    @Test
    public void testWiring() throws Exception {
        List<Employee> allEmployees = asList(new Employee("Alice"), new Employee("Bob"));
        when(repo.getAll()).thenReturn(allEmployees);

        mockMvc.perform(get("/")).andExpect(status().isOk());
        verify(repo).getAll();
    }
}
