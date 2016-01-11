package org.mayne.ws.services.impl;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.Response;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.mayne.ws.services.SQLservice;
import org.mayne.ws.sql.SqlClient;
import org.mayne.ws.util.SqlUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SqlServiceImpl implements SQLservice {
	private static Logger logger  = LoggerFactory.getLogger(SqlServiceImpl.class);
	public Response runQuery(String queryString) {
		Connection conn = SqlClient.getConnection();
		if(conn ==null)
			return Response.serverError().entity("can't connect to sql server").build();
		else{
			try {
				logger.trace("running following query \n {}", queryString);
				ResultSet rs = conn.createStatement().executeQuery(queryString);
				ResultSetMetaData meta = rs.getMetaData();
				int colCount = meta.getColumnCount();
				String[] colLabels = new String[colCount];
				for(int i=1;i<=colCount;i++)
					colLabels[i-1] = meta.getColumnLabel(i);
				List<Map<String,Object>> output = SqlUtil.convertToMap(rs, colLabels);
				String s = new ObjectMapper().writeValueAsString(output);
				logger.trace("returning response String as follows \n {}", s);
				return Response.ok(s).build();
			} catch (SQLException e) {
				logger.debug(ExceptionUtils.getStackTrace(e));
				return Response.serverError().entity("error in executing query").build();
			} catch (JsonGenerationException e) {
				logger.debug(ExceptionUtils.getStackTrace(e));
				return Response.serverError().entity("error in converting response to JSON").build();
			} catch (JsonMappingException e) {
				logger.debug(ExceptionUtils.getStackTrace(e));
				return Response.serverError().entity("error in converting response to JSON").build();
			} catch (IOException e) {
				logger.debug(ExceptionUtils.getStackTrace(e));
				return Response.serverError().entity("error in converting response to JSON").build();
			}
		}
	}

}
