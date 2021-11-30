package blogfmk.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import blogfmk.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	 Optional<User> findByUserName(String userName);
}
