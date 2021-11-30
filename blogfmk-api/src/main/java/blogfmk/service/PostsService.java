package blogfmk.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blogfmk.model.Comments;
import blogfmk.model.Image;
import blogfmk.model.Posts;
import blogfmk.model.User;
import blogfmk.repository.CommentsRepository;
import blogfmk.repository.ImageRepository;
import blogfmk.repository.PostsRepository;
import blogfmk.repository.UserRepository;

@Service
public class PostsService {

	@Autowired
	private PostsRepository postsRepository;

	@Autowired
	private CommentsRepository commentsRepository;

	@Autowired
	private ImageRepository imgRepository;

	@Autowired
	private UserRepository usuRepository;

	public boolean saveComments(Comments coments, Integer idPost) {
		if (coments == null) {
			return false;
		}

		try {
			Comments comentsSaved = commentsRepository.saveAndFlush(coments);

			Optional<Posts> postSelecionado = postsRepository.findById(idPost.longValue());
			List<Comments> listComments = postSelecionado.get().getComentarios();
			listComments.add(comentsSaved);
			postSelecionado.get().setComentarios(listComments);
			postsRepository.saveAndFlush(postSelecionado.get());
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	public List<Comments> getCommentsByPosts(String idPost) {

		Optional<Posts> posts = postsRepository.findById(Long.parseLong(idPost));
		return posts.get().getComentarios().size() > 0 ? posts.get().getComentarios() : null;

	}

	public List<Posts> getAllPosts() {
		List<Posts> listPosts = new ArrayList<>();
		List<Posts> listPostAux = postsRepository.findAll();

		for (Posts posts : listPostAux) {
			Optional<Image> img = imgRepository.findById(posts.getIdImagem().longValue());

			Posts pts = new Posts();
			pts.setDescription(posts.getDescription());
			pts.setIdImagem(posts.getIdImagem());
			pts.setIdPost(posts.getIdPost());
			pts.setTitle(posts.getTitle());
			pts.setUser(posts.getUser());
			pts.setComentarios(posts.getComentarios());

			if (img.isPresent()) {
				String encodedString = encodeImage(img.get().getPath());
				pts.setUrlImage(encodedString == null ? "" : encodedString);

			} else {
				pts.setUrlImage("");
			}

			Optional<User> user = usuRepository.findByUserName(posts.getUser());

			if (user.get().getIdImagem() != null) {

				Optional<Image> imgUser = imgRepository.findById(user.get().getIdImagem().longValue());

				if (imgUser.isPresent()) {
					String encodedString = encodeImage(imgUser.get().getPath());
					pts.setUrlImageUser(encodedString == null ? "" : encodedString);
				} else {
					pts.setUrlImageUser("");
				}

			} else {
				pts.setUrlImageUser("");

			}

			listPosts.add(pts);
		}

		return !listPosts.isEmpty() ? listPosts : null;

	}

	public Posts savePost(Posts post) {

		if (post == null) {
			return null;
		}

		Posts postSaved = postsRepository.save(post);

		return postSaved.getDescription() != null ? postSaved : null;
	}
	
	public boolean deletePosts (String idPost) {
		try {
			postsRepository.deleteById(Long.parseLong(idPost));
			return true;
		} catch (Exception e) {
			return false;		
		}	
	}
	
	public String encodeImage(String caminho) {

		byte[] fileContent = null;

		try {
			fileContent = FileUtils.readFileToByteArray(new File(caminho));
		} catch (IOException e) {
			e.printStackTrace();
		}

		return Base64.getEncoder().encodeToString(fileContent);

	}

}
