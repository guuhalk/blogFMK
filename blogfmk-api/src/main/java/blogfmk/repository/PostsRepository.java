package blogfmk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import blogfmk.model.Posts;

public interface PostsRepository extends JpaRepository<Posts, Long> {

}
