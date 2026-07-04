package com.example.demo.configuration;

import lombok.Getter;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ResourceOwnerConfiguration {

    String uniqueIdentifier;

    public void setUniqueIdentifier(String opaqueToken) {
        if(this.uniqueIdentifier == null) {
            this.uniqueIdentifier = opaqueToken;
        }
        else{
            throw new IllegalArgumentException("uniqueIdentifier already set");
        }
    }

    public String getUniqueIdentifier(){
        return this.uniqueIdentifier;
    }



}
