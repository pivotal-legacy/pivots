package io.pivotal.pivotsapp;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component
public class CORSFilter implements Filter {

    public static final String CACHE_TIME = "3600";
    public static final String ALLOWED_METHODS = "POST, GET, OPTIONS, DELETE";
    public static final String ALLOWED_ORIGIN = "*";
    public static final String ALLOWED_HEADERS = "Content-Type, Accept";

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
        response.setHeader("Access-Control-Allow-Methods", ALLOWED_METHODS);
        response.setHeader("Access-Control-Max-Age", CACHE_TIME);
        response.setHeader("Access-Control-Allow-Headers", ALLOWED_HEADERS);

        chain.doFilter(req, res);
    }

    public void init(FilterConfig filterConfig) {}

    public void destroy() {}
}
