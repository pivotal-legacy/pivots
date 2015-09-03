package io.pivotal.pivotsapp;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);
    private static final String CONFIG_LOCATION = "io.pivotal";
    private static final String CONTEXT_PATH = "/";
    private static final String MAPPING_URL = "/*";
    public static final String DEFAULT_PORT = System.getenv("PORT");

    public static void main(String[] args) throws Exception {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.setConfigLocation(CONFIG_LOCATION);

        ServletContextHandler contextHandler = new ServletContextHandler();
        contextHandler.setErrorHandler(null);
        contextHandler.setContextPath(CONTEXT_PATH);
        contextHandler.addServlet(new ServletHolder(new DispatcherServlet(context)), MAPPING_URL);
        contextHandler.addEventListener(new ContextLoaderListener(context));

        logger.debug("Starting server at port {}", DEFAULT_PORT);
        Server server = new Server(Integer.valueOf(DEFAULT_PORT));
        server.setHandler(contextHandler);
        server.start();
        logger.info("Server started at port {}", DEFAULT_PORT);
        server.join();
    }

}
