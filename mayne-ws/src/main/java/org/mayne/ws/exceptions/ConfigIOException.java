package org.mayne.ws.exceptions;

import java.io.IOException;
/**
 * Exception thrown in case the project config is not proper
 * @author prashantsachan
 *
 */
public class ConfigIOException extends IOException{
	public ConfigIOException() {
		super();
	}
	public ConfigIOException(String msg){
		super(msg);
	}
	public ConfigIOException(IOException e) {
		super(e);
	}
	
	
}
