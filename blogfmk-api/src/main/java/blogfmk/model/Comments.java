package blogfmk.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "PTS_COMENTARIOS")
public class Comments {

	
	@Id
	@GeneratedValue
	@Column(name = "CM_ID")
	private Long idComments;
	
	@Column(name = "CM_DESCRICAO")
	private String description;
	
	@Column(name = "CM_USU")
	private String user;
	
	
}
