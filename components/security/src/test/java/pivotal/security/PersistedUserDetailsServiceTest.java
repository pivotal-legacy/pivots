package pivotal.security;

import io.pivotal.security.PersistedUserDetailsService;
import io.pivotal.security.User;
import io.pivotal.security.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class PersistedUserDetailsServiceTest {
    PersistedUserDetailsService persistedUserDetailsService;
    UserRepository userRepository;
    User user;

    @Before
    public void setUp() throws Exception {
        userRepository = mock(UserRepository.class);
        user = new User("Shintaro");

        persistedUserDetailsService = new PersistedUserDetailsService(userRepository);
    }

    @Test
    public void testLoadUserByUsername() throws Exception {
        when(userRepository.findByUsername(anyString())).thenReturn(user);

        User foundUser = persistedUserDetailsService.loadUserByUsername("Shintaro");

        assertThat(foundUser, is(user));
    }

    @Test(expected = UsernameNotFoundException.class)
    public void testLoadByUsername_throwsAnExceptionWhenTheUserIsNotFound() throws Exception {
        when(userRepository.findByUsername(anyString())).thenReturn(null);

        persistedUserDetailsService.loadUserByUsername("Shintaro");
    }
}
