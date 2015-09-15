package io.pivotal.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static javax.servlet.http.HttpServletResponse.SC_NO_CONTENT;

@Service
public class TokenAuthenticationService {

    private static final String AUTH_HEADER_NAME = "X-AUTH-TOKEN";
    private TokenService tokenService;

    @Autowired
    public TokenAuthenticationService(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    public void addAuthentication(HttpServletResponse response, User authenticatedUser) {
        String userToken = tokenService.createTokenForUser(authenticatedUser);

        response.addHeader(AUTH_HEADER_NAME, userToken);
        response.setStatus(SC_NO_CONTENT);
    }

    public Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(AUTH_HEADER_NAME);

        if (token != null) {

            User user = tokenService.parseUserFromToken(token);

            if (user != null) {
                return new UserAuthentication(user);
            }
        }

        return null;
    }
}
