package pivotal.directory;


import io.pivotal.directory.Employee;
import io.pivotal.directory.EmployeesController;
import io.pivotal.directory.EmployeesRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static java.util.Arrays.asList;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class EmployeesControllerTest {
    MockMvc mockMvc;
    EmployeesRepository repo;

    @Before
    public void setUp() throws Exception {
        repo = mock(EmployeesRepository.class);
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
