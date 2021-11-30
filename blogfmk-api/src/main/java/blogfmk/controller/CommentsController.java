package blogfmk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import blogfmk.service.CommentsService;

@RestController
@RequestMapping("comments")
public class CommentsController {

	@Autowired
	private CommentsService commentsService;
	
	
	@DeleteMapping("{idComment}")
	public ResponseEntity<?> deleteComments(@PathVariable String idComment){
		boolean deleted = commentsService.deletePosts(idComment);		
		return deleted ? ResponseEntity.ok(deleted) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
