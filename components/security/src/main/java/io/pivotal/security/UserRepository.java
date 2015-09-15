package io.pivotal.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;

@Repository
public class UserRepository {

    private final List<User> users;

    public UserRepository() {
        User user1 = new User("user", new BCryptPasswordEncoder().encode("user"));
        user1.grantRole(UserRole.USER);

        User user2 = new User("admin", new BCryptPasswordEncoder().encode("admin"));
        user2.grantRole(UserRole.USER);

        users = asList(user1, user2);
    }

    public Optional<User> findByUsername(String username) {
        return users
                .stream()
                .filter((u) -> u.getUsername().equals(username))
                .findFirst();
    }
}
