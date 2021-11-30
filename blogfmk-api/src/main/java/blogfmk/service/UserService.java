package blogfmk.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import blogfmk.model.User;
import blogfmk.repository.UserRepository;



@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder encoder;

	public List<User> getAllUsers() {
		List<User> listUsers = userRepository.findAll();
		return !listUsers.isEmpty() ? listUsers : null;

	}

	public Optional<User> getUserByUserName(String userName) {

		if (userName == null || userName.isEmpty()) {
			return null;
		}

		Optional<User> user = userRepository.findByUserName(userName);
		return user.isPresent() ? user : null;
	}

	public User saveUser(User user) {

		if (user == null) {
			return null;
		}

		user.setPassword(encoder.encode(user.getPassword()));
		User userSaved = userRepository.save(user);

		return userSaved.getName() != null ? user : null;
	}
	
	public ResponseEntity<?> validateCredentials(String userName, String password) {

		Optional<User> optUser = userRepository.findByUserName(userName);
	
		if (!optUser.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
		}
		 
		boolean valid = encoder.matches(password, optUser.get().getPassword());
		
		HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
		
		return ResponseEntity.status(status).body(valid);
	}
	

}
