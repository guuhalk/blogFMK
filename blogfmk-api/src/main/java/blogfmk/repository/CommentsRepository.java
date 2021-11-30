package blogfmk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import blogfmk.model.Comments;

public interface CommentsRepository extends JpaRepository<Comments, Long> {

	@Query(value = "insert into pts_comentarios (cm_id, cm_descricao, cm_usu, pstcm_id) values(?1, ?2, ?3, ?4)", nativeQuery = true)
	void saveIdComments(Long id, String descricao, String usuario, Long idPost);

}
