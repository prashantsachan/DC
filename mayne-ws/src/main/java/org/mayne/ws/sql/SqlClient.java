package org.mayne.ws.sql;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.mayne.ws.exceptions.ConfigIOException;
import org.mayne.ws.util.ConfigConstt;
import org.mayne.ws.util.PropertiesHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SqlClient {
	private static Logger logger = LoggerFactory.getLogger(SqlClient.class);
	private static Connection connection;
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";

	public static Connection getConnection() {
		if (connection == null) {
			synchronized (SqlClient.class) {
				if (connection == null)
					connection = initConnection();
			}
		}
		return connection;
	}

	private static Connection initConnection() {
		try{
		Class.forName(JDBC_DRIVER);
		String sqlHost = PropertiesHolder.getInstance().getProperty(ConfigConstt.PROP_SQL_HOST);
		String sqlDbName = PropertiesHolder.getInstance().getProperty(ConfigConstt.PROP_SQL_DBNAME);
		String sqlUser= PropertiesHolder.getInstance().getProperty(ConfigConstt.PROP_SQL_USERNAME);
		String sqlPass = PropertiesHolder.getInstance().getProperty(ConfigConstt.PROP_SQL_PASSWORD);
		String dbUrl = "jdbc:mysql://"+sqlHost+"/"+sqlDbName;
		// STEP 3: Open a connection
		logger.trace("Connecting to database...{}", dbUrl);
		return  DriverManager.getConnection(dbUrl, sqlUser, sqlPass);
		}catch (SQLException e) {
			logger.debug(ExceptionUtils.getStackTrace(e));
		} catch (ClassNotFoundException e) {
			logger.debug(ExceptionUtils.getStackTrace(e));
		} catch (ConfigIOException e) {
			logger.debug(ExceptionUtils.getStackTrace(e));
		}
		return null;
	}
}
