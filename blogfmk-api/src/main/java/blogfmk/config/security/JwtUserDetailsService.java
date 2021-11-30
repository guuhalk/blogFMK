package blogfmk.config.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import blogfmk.model.User;
import blogfmk.repository.UserRepository;


@Component
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findByUserName(userName);
		if(!user.isPresent()) {
			throw new UsernameNotFoundException("Usuário [ "+ userName + " ] não encontrado.");
		}
		
		return new DetailUserDate(user);
	}
}
