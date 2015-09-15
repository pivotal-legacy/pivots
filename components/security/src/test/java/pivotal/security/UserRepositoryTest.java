package pivotal.security;

import io.pivotal.security.User;
import io.pivotal.security.UserRepository;
import org.junit.Before;
import org.junit.Test;

import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class UserRepositoryTest {
    UserRepository userRepository;

    @Before
    public void setUp() throws Exception {
        userRepository = new UserRepository();
    }

    @Test
    public void testFindByUsername() throws Exception {
        Optional<User> user = userRepository.findByUsername("user");

        assertThat(user.get().getUsername(), is("user"));
    }
}
