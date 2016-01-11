package org.mayne.ws.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.mayne.ws.exceptions.ConfigIOException;

public class PropertiesHolder extends Properties {

    private static PropertiesHolder instance;

    public static PropertiesHolder getInstance() throws ConfigIOException{
        if(instance == null){
            synchronized (PropertiesHolder.class) {
                if(instance == null){
                	instance = new PropertiesHolder();
                }
            }
        }

        return instance;
    }

    private PropertiesHolder() throws ConfigIOException {
        super();

        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        URL url = classLoader.getResource(ConfigConstt.CONFIG_FILE_NAME);
        File file = new File(url.getPath());
        try{
            InputStream is = new FileInputStream(file);
            this.load(is);
        }catch(IOException e){
        	throw new ConfigIOException(e);
        }
    }
}
