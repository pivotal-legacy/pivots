package io.pivotal.pivotsapp;

import io.pivotal.security.PersistedUserDetailsService;
import io.pivotal.security.TokenAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.OPTIONS;
import static org.springframework.http.HttpMethod.POST;

@EnableWebSecurity
@Configuration
@Order(1)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    public static final String ALL_ENDPOINTS = "/**";
    public static final String LOGIN_ENDPOINT = "/login";

    @Autowired
    private PersistedUserDetailsService userDetailsService;

    @Autowired
    private TokenAuthenticationService tokenAuthenticationService;

    public SecurityConfig() {
        super(true);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()

                .antMatchers(OPTIONS, ALL_ENDPOINTS).permitAll()

                .antMatchers(POST, LOGIN_ENDPOINT).permitAll()

                .anyRequest().hasRole("USER").and()

                .addFilterBefore(
                        new StatelessLoginFilter(
                                LOGIN_ENDPOINT,
                                tokenAuthenticationService,
                                userDetailsService,
                                authenticationManager()
                        ),
                        UsernamePasswordAuthenticationFilter.class
                )

                .addFilterBefore(
                        new AuthenticationFilter(tokenAuthenticationService),
                        UsernamePasswordAuthenticationFilter.class
                )

                .anonymous();

    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected PersistedUserDetailsService userDetailsService() {
        return userDetailsService;
    }
}
