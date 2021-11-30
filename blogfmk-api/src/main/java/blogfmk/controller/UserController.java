package blogfmk.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import blogfmk.model.Image;
import blogfmk.model.User;
import blogfmk.service.ImageService;
import blogfmk.service.UserService;


@RestController
@RequestMapping("users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private ImageService imageService;
		
	@GetMapping
	public ResponseEntity<?> findAllUsers(){
		List<User> listUser = userService.getAllUsers();		
		return listUser != null ? ResponseEntity.ok(listUser) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/{name}")
	public ResponseEntity<Optional<User>> findUserByUserName(@PathVariable String userName){
		Optional<User> user = userService.getUserByUserName(userName);		
		return user!= null ? ResponseEntity.ok(user) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	
	@PostMapping("/photos") 
	public ResponseEntity<?> savePhotoUser(@RequestParam("image") MultipartFile arquivo){
		Optional<Image> img = imageService.saveImage(arquivo);
		return img != null ? ResponseEntity.ok(img) : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
	}
	
	@PostMapping 
	public ResponseEntity<?> saveUser(@RequestBody User user){
		User UserSaved = userService.saveUser(user);		
		return UserSaved != null ? ResponseEntity.ok(UserSaved) : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
	}
	
	
	@GetMapping("/validatePassword")
	public ResponseEntity<?> validatePassword(@RequestParam String userName, @RequestParam String password ){
		return userService.validateCredentials(userName, password);

	}
}
