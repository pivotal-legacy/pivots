package pivotal.directory;


import io.pivotal.directory.Employee;
import io.pivotal.directory.EmployeesController;
import io.pivotal.directory.EmployeesRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static java.util.Arrays.asList;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class EmployeesControllerTest {
    MockMvc mockMvc;
    EmployeesRepository employeesRepository;

    @Before
    public void setUp() throws Exception {
        employeesRepository = mock(EmployeesRepository.class);
        EmployeesController employeesController = new EmployeesController(employeesRepository);

        mockMvc = standaloneSetup(employeesController).build();
    }

    @Test
    public void testGettingListOfEmployees() throws Exception {
        List<Employee> allEmployees = asList(new Employee(1, "Rina"), new Employee(2, "Shintaro"));
        when(employeesRepository.selectAll()).thenReturn(allEmployees);

        mockMvc.perform(get("/employees"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", equalTo(1)))
                .andExpect(jsonPath("$[0].name", equalTo("Rina")));

        verify(employeesRepository).selectAll();
    }

    @Test
    public void testGettingASingleEmployee() throws Exception {
        Employee employee = new Employee(1, "Rina");
        when(employeesRepository.selectById(1)).thenReturn(employee);

        mockMvc.perform(get("/employees/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", equalTo(1)))
                .andExpect(jsonPath("$.name", equalTo("Rina")));

        verify(employeesRepository).selectById(1L);
    }
}
