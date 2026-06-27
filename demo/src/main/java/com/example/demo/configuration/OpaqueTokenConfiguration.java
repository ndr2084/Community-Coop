package com.example.demo.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
class OpaqueTokenConfiguration {

    private String opaqueToken;

    void setOpaqueToken(String opaqueToken){
        if(this.opaqueToken == null) {
            this.opaqueToken = opaqueToken;
        }
    }
}
