package io.pivotal.pivotsapp.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.pivotal.security.TokenAuthenticationService;
import io.pivotal.security.User;
import io.pivotal.security.UserAuthentication;
import io.pivotal.security.PersistedUserDetailsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class StatelessLoginFilter extends AbstractAuthenticationProcessingFilter {

    public static final String POST = "POST";
    private final TokenAuthenticationService tokenAuthenticationService;
    private final PersistedUserDetailsService userDetailsService;

    public StatelessLoginFilter(
            String urlMapping,
            TokenAuthenticationService tokenAuthenticationService,
            PersistedUserDetailsService userDetailsService,
            AuthenticationManager authManager
    ) {
        super(new AntPathRequestMatcher(urlMapping, POST));
        this.userDetailsService = userDetailsService;
        this.tokenAuthenticationService = tokenAuthenticationService;

        setAuthenticationManager(authManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {

        final User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
        final UsernamePasswordAuthenticationToken loginToken = new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                user.getPassword()
        );

        return getAuthenticationManager().authenticate(loginToken);
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authentication
    ) throws IOException, ServletException {

        final User authenticatedUser = userDetailsService.loadUserByUsername(authentication.getName());
        final UserAuthentication userAuthentication = new UserAuthentication(authenticatedUser);

        tokenAuthenticationService.addAuthentication(response, authenticatedUser);

        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(userAuthentication);
    }

}
