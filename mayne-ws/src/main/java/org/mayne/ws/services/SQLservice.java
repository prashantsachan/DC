package org.mayne.ws.services;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


public interface SQLservice {
	@POST
	@Path("/runQuery")
	@Produces("application/json")
	public Response runQuery(String queryString) ;
}
