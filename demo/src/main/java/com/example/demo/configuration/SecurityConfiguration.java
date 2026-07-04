package com.example.demo.configuration;
import com.example.demo.repository.UserRepository;
import com.example.demo.table.Profile;
import org.jspecify.annotations.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
@EnableWebSecurity
class SecurityConfiguration {

    private final ResourceOwnerConfiguration resourceOwnerConfiguration;
    private final UserRepository userRepository;

    public SecurityConfiguration(ResourceOwnerConfiguration resourceOwnerConfiguration,
                                 UserRepository userRepository) {
        this.resourceOwnerConfiguration = resourceOwnerConfiguration;
        this.userRepository = userRepository;
    }

    @Bean
    @Order(0)
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(req -> req
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").hasRole("USER")
                        .anyRequest()
                        .authenticated()
                )

                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:4200/signup", true)
                        .userInfoEndpoint(userInfo -> userInfo
                                .oidcUserService(oidcUserService()))
                )
                .cors(Customizer.withDefaults())
                .csrf(CsrfConfigurer::spa //<-ATTACHES 'XSRF-TOKEN' COOKIE TO document.cookie AFTER LOGIN AND ALL RESPONSES HEREON AFTER
                );

        return http.build();
    }

    private OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        OidcUserService delegate = new OidcUserService();
        List<String> admins = List.of(
                "ndrous2084@gmail.com"
        );
        return new OAuth2UserService<OidcUserRequest, OidcUser> (){
            @Override
            public OidcUser loadUser(@NonNull OidcUserRequest request) {
                OidcUser user = delegate.loadUser(request);
                String email = user.getAttribute("email");
                String subject = user.getAttribute("sub");
                String authority = "USER";
                Set<GrantedAuthority> authorities = new HashSet<>(user.getAuthorities());
                authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

                if (admins.contains(email)) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                    authority = "ADMIN";
                }
                resourceOwnerConfiguration.setUniqueIdentifier(subject);
                Profile userinfo = new Profile(subject);
                userinfo.setUser(email, authority);
                userRepository.save(userinfo);


                return new DefaultOidcUser(authorities, user.getIdToken(), user.getUserInfo());
            }
        };
    }
}