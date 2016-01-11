package org.mayne.ws.exceptions;

public class InvalidParamsException extends Exception{
	String msg; 
	public InvalidParamsException(String msg) {
		this.msg = msg;
	}
	
	@Override
	public String toString() {
		return msg;
	}
	public String getMsg(){
		return msg;
	}
}
