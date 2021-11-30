package blogfmk.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import blogfmk.model.Comments;
import blogfmk.model.Image;
import blogfmk.model.Posts;
import blogfmk.service.ImageService;
import blogfmk.service.PostsService;


@RestController
@RequestMapping("posts")
public class PostsController {

	@Autowired
	private PostsService postsService;
	
	
	
	@Autowired
	private ImageService imageService;
		
	@GetMapping
	public ResponseEntity<?> findAllPosts(){
		List<Posts> listPosts = postsService.getAllPosts();		
		return listPosts != null ? ResponseEntity.ok(listPosts) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/comments/{idPost}")
	public ResponseEntity<?> findCommentsByPosts(@PathVariable String idPost){
		List<Comments> listComments = postsService.getCommentsByPosts(idPost);		
		return listComments != null ? ResponseEntity.ok(listComments) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/photos") 
	public ResponseEntity<?> savePhotoUser(@RequestParam("image") MultipartFile arquivo){
		Optional<Image> img = imageService.saveImage(arquivo);
		return img != null ? ResponseEntity.ok(img) : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
	}
	
	@PostMapping("/comments/{idPost}") 
	public ResponseEntity<?> saveCommentsUser(@RequestBody Comments comments, @PathVariable String idPost){
		boolean com = postsService.saveComments(comments, Integer.parseInt(idPost));
		return com ? ResponseEntity.ok(com) : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
	}
	
	@PostMapping 
	public ResponseEntity<?> savePost(@RequestBody Posts post){ 
		Posts PostSaved = postsService.savePost(post);		
		return PostSaved != null ? ResponseEntity.ok(PostSaved) : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
	}
	
	@DeleteMapping("{idPost}")
	public ResponseEntity<?> deletePosts(@PathVariable String idPost){
		boolean deleted = postsService.deletePosts(idPost);		
		return deleted ? ResponseEntity.ok(deleted) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
}
