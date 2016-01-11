package org.mayne.ws.util;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SqlUtil {
	public static List<Map<String, Object>>convertToMap(ResultSet rs, String[] colLabels) throws SQLException{
		List<Map<String,Object>> out= new ArrayList<Map<String,Object>>();
		while(rs.next()){
			Map<String,Object> m = new HashMap<String, Object>();
			for(String label: colLabels)
				m.put(label, rs.getObject(label));
			out.add(m);
		}
		return out;
	}
}
