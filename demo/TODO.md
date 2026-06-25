## TODO

- [ ] Handle CSRF tokens for Angular frontend — Spring Security sends XSRF-TOKEN as a cookie; configure Angular HttpClient with withXsrfConfiguration() to send it on non-GET requests
- [ ] Remove @Order(0) from SecurityConfiguration — unnecessary with a single SecurityFilterChain
- [ ] Understand OAuth2UserService — learn how DefaultOAuth2UserService loads user info from the provider, how to wrap it to customize authorities/roles, and how userInfoEndpoint wires it into the login flow
- [ ] Crsf is disabled currently , put requests were not working. Find out why
  - [ ] [Read this](https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html#csrf-token-request-handler), especially the part on using a csrfToken in a cookie to support java-script based applications