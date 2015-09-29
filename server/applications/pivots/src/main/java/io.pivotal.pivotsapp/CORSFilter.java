package io.pivotal.pivotsapp;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CORSFilter implements Filter {

    public static final String CACHE_TIME = "3600";
    public static final String ALLOWED_METHODS = "POST, GET, OPTIONS, DELETE";
    public static final String ALLOWED_ORIGIN = "*";
    public static final String ALLOWED_HEADERS = "Content-Type, Accept, X-AUTH-TOKEN";
    public static final String EXPOSED_HEADERS = "X-AUTH-TOKEN";
    public static final String OPTIONS = "OPTIONS";

    // Note that some of the following headers are used only
    // for responses to preflight requests, i.e., those added to OPTIONS requests.
    //
    // For details on the use of the following headers, see here:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        response.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
        response.setHeader("Access-Control-Expose-Headers", EXPOSED_HEADERS);

        if (request.getMethod().equals(OPTIONS)) {
            response.setHeader("Access-Control-Allow-Methods", ALLOWED_METHODS);
            response.setHeader("Access-Control-Max-Age", CACHE_TIME);
            response.setHeader("Access-Control-Allow-Headers", ALLOWED_HEADERS);
        }

        chain.doFilter(req, res);
    }

    public void init(FilterConfig filterConfig) {
    }

    public void destroy() {
    }
}
