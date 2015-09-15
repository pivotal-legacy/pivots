package pivotal.security;

import io.pivotal.security.TokenAuthenticationService;
import io.pivotal.security.TokenService;
import io.pivotal.security.User;
import io.pivotal.security.UserAuthentication;
import io.pivotal.testing.FakeHttpResponse;
import org.junit.Before;
import org.junit.Test;

import static javax.servlet.http.HttpServletResponse.SC_NO_CONTENT;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class TokenAuthenticationServiceTest {
    private TokenAuthenticationService tokenAuthenticationService;
    private FakeHttpResponse httpResponse;
    private UserAuthentication userAuthentication;
    private User user;
    private TokenService tokenService;

    @Before
    public void setUp() throws Exception {
        tokenService = mock(TokenService.class);
        tokenAuthenticationService = new TokenAuthenticationService(tokenService);

        httpResponse = new FakeHttpResponse();
        user = new User("Rina");
        userAuthentication = new UserAuthentication(user);
    }

    @Test
    public void testAddAuthentication_addsUserTokenToResponse() throws Exception {
        when(tokenService.createTokenForUser(any())).thenReturn("jwt-token");

        tokenAuthenticationService.addAuthentication(httpResponse, userAuthentication);

        assertThat(httpResponse.getStatus(), is(SC_NO_CONTENT));
        assertThat(httpResponse.getHeader("X-AUTH-TOKEN"), is("jwt-token"));

        verify(tokenService).createTokenForUser(user);
    }

}
