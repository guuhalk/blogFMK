package blogfmk.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "PTS_POSTS")
public class Posts {

	@Id
	@GeneratedValue
	@Column(name = "PST_ID")
	private Long idPost;
	
	@Column(name = "PST_TITULO")
	private String title;
	
	@Column(name = "PST_DESCRICAO")
	private String description;
	
	@Column(name = "PST_USU")
	private String user;
	
	@Column(name = "PST_IDIMAGEM")
	private Integer idImagem;
	
	@Transient
	private String urlImage;
	
	@Transient
	private String urlImageUser;
	
	@OneToMany(targetEntity = Comments.class, cascade = CascadeType.ALL)
	@JoinColumn(name="PSTCM_ID")
    private List<Comments> comentarios;
	
	
	
}
