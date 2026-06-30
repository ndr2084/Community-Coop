package com.example.demo.configuration;

import lombok.Getter;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ResourceOwnerConfiguration {

    @Getter private String gmail;
    @Getter private String authority;
    @Getter private String opaqueToken;

    public void setResourceOwner(String gmail, String authority, String opaqueToken) {
        this.gmail = gmail;
        this.authority = authority;
        if(this.opaqueToken == null) {
            this.opaqueToken = opaqueToken;
        }
    }


}
