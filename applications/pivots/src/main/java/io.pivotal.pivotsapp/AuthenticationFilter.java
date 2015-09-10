package io.pivotal.pivotsapp;

import io.pivotal.security.TokenAuthenticationService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

class AuthenticationFilter extends GenericFilterBean {

    private final TokenAuthenticationService tokenAuthenticationService;

    protected AuthenticationFilter(TokenAuthenticationService tokenAuthService) {
        this.tokenAuthenticationService = tokenAuthService;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = tokenAuthenticationService.getAuthentication((HttpServletRequest) req);
        context.setAuthentication(authentication);

        chain.doFilter(req, res); // always continue
    }

}
