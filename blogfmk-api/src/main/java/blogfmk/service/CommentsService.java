package blogfmk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blogfmk.repository.CommentsRepository;

@Service
public class CommentsService {

	@Autowired
	private CommentsRepository commentsRepository;
	
	public boolean deletePosts (String idComments) {
		try {
			commentsRepository.deleteById(Long.parseLong(idComments));
			return true;
		} catch (Exception e) {
			return false;		
		}	
	}
}
