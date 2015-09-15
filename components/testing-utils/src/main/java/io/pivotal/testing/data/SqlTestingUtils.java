package io.pivotal.testing.data;

import org.postgresql.ds.PGSimpleDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class SqlTestingUtils {

    public static DataSource prepareTestingDataSource() {
        PGSimpleDataSource source = new PGSimpleDataSource();
        source.setUrl("jdbc:postgresql://localhost:5432/pivots_test");
        return source;
    }

    public static void assertData(DataSource dataSource, String sql, DataAssertionBlock assertionBlock) {
        try {
            try (Connection conn = dataSource.getConnection();
                 PreparedStatement stmt = conn.prepareCall(sql);
                 ResultSet rs = stmt.executeQuery()
            ) {
                assertionBlock.examine(rs);
            }
        } catch (SQLException ex) {
            throw new RuntimeException("SQL Exception", ex);
        }
    }

}
