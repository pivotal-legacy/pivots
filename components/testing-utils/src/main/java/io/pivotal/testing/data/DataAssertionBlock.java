package io.pivotal.testing.data;

import java.sql.ResultSet;
import java.sql.SQLException;

@FunctionalInterface
public interface DataAssertionBlock {
    void examine(ResultSet ts) throws SQLException;
}
