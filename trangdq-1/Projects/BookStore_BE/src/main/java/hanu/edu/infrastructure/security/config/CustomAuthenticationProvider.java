package hanu.edu.infrastructure.security.config;

import hanu.edu.application.service.user.UserResourceService;
import hanu.edu.domain.model.user.User;
import hanu.edu.infrastructure.security.exception.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;


@Slf4j
@Component
// provide authentication
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private UserResourceService userResourceService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        log.info("Start actual authentication.");

        // get user information
        final String username = authentication.getName();
        final String password = authentication.getCredentials().toString();

        User user = userResourceService.getByUsername(username);

        // get authenticating user
        if (user == null) {
            throw new BaseException(String.valueOf(HttpStatus.UNAUTHORIZED.value()), "User not found!");
        }
        // authorities --> authority, as project statement
        List<GrantedAuthority> authority = List.of(new SimpleGrantedAuthority(user.getRole()));
        // provide authentication
        Authentication auth = new UsernamePasswordAuthenticationToken(username, password, authority);
        log.info("End actual authentication.");
        return auth;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
