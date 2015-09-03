package io.pivotal.pivotsapp;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Configuration
public class PersistenceConfig {
    private static Pattern DATABASE_URL_PATTERN = Pattern.compile("jdbc:postgresql://([^:]*):([^@]*)@(.*)/(.*)");

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }

    private DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");

        Matcher matcher = DATABASE_URL_PATTERN.matcher(databaseUrl);

        if (matcher.matches()) {
            String databaseUser = matcher.group(1);
            String databasePassword = matcher.group(2);
            String databaseHostname = matcher.group(3);
            String databaseName = matcher.group(4);

            HikariDataSource dataSource = new HikariDataSource();

            dataSource.setDataSourceClassName("org.postgresql.ds.PGSimpleDataSource");
            dataSource.setJdbcUrl(databaseUrl);
            dataSource.setUsername(databaseUser);
            dataSource.setPassword(databasePassword);

            // The Postgres Driver has a bug in it
            // and requires the following test query for Hikari CP to work correctly
            // See here: https://github.com/brettwooldridge/HikariCP/issues/225
            dataSource.setConnectionTestQuery("SELECT 1");

            dataSource.addDataSourceProperty("serverName", databaseHostname);
            dataSource.addDataSourceProperty("databaseName", databaseName);

            return dataSource;
        }

        throw new RuntimeException("A valid postgres DATABASE_URL environment variable must be present");
    }
}
