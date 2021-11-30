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

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "SYS_USUARIO")
public class User {

	@Id
	@GeneratedValue
	@Column(name = "USU_ID")
	private Long idUser;
	
	@Column(name = "USU_LOGIN")
	private String userName;
	
	@Column(name = "USU_SENHA")
	private String password;
	
	@Column(name = "USU_NOME")
	private String name;
	
	@Column(name = "USU_EMAIL")
	private String email;
	
	@Column(name = "USU_STATUS")
	private Integer  status;
	
	@Column(name = "USU_IDIMAGEM")
	private Integer idImagem;
	
	@OneToMany(targetEntity = Profile.class, cascade = CascadeType.ALL)
	@JoinColumn(name="USUPRF_ID")
    private List<Profile> profile;
	
	
	
}
