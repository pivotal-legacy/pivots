package pivotal.security;

import io.pivotal.security.TokenAuthenticationService;
import io.pivotal.security.TokenService;
import io.pivotal.security.User;
import io.pivotal.testing.http.FakeHttpRequest;
import io.pivotal.testing.http.FakeHttpResponse;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.core.Authentication;

import static javax.servlet.http.HttpServletResponse.SC_NO_CONTENT;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;

public class TokenAuthenticationServiceTest {
    TokenAuthenticationService tokenAuthenticationService;
    FakeHttpResponse httpResponse;
    User user;
    TokenService tokenService;
    FakeHttpRequest httpRequest;

    @Before
    public void setUp() throws Exception {
        tokenService = mock(TokenService.class);
        tokenAuthenticationService = new TokenAuthenticationService(tokenService);

        httpRequest = new FakeHttpRequest();
        httpResponse = new FakeHttpResponse();

        user = new User("Rina");
    }

    @Test
    public void testAddAuthentication_addsUserTokenToResponse() throws Exception {
        when(tokenService.createTokenForUser(any())).thenReturn("some-jwt-token");


        tokenAuthenticationService.addAuthentication(httpResponse, user);


        assertThat(httpResponse.getStatus(), is(SC_NO_CONTENT));
        assertThat(httpResponse.getHeader("X-AUTH-TOKEN"), is("some-jwt-token"));
        verify(tokenService).createTokenForUser(user);
    }

    @Test
    public void testGetAuthentication_returnsAUserFromAToken() throws Exception {
        httpRequest.addHeader("X-AUTH-TOKEN", "some-jwt-token");
        when(tokenService.parseUserFromToken(any())).thenReturn(user);


        Authentication authentication = tokenAuthenticationService.getAuthentication(httpRequest);


        assertThat(authentication.getDetails(), is(user));
        verify(tokenService).parseUserFromToken("some-jwt-token");
    }

    @Test
    public void testGetAuthentication_returnsNullWhenNoTokenIsPresent() throws Exception {
        Authentication authentication = tokenAuthenticationService.getAuthentication(httpRequest);

        assertThat(authentication, nullValue());
    }

    @Test
    public void testGetAuthentication_returnsNull_forAGarbageToken() throws Exception {
        httpRequest.addHeader("X-AUTH-TOKEN", "some-garbage-token");
        when(tokenService.parseUserFromToken(any())).thenReturn(null);


        Authentication authentication = tokenAuthenticationService.getAuthentication(httpRequest);


        assertThat(authentication, nullValue());
    }
}
