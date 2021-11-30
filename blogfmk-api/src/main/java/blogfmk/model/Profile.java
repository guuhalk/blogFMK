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
@Table(name = "SYS_PERFIL")
public class Profile {

	@Id
	@GeneratedValue
	@Column(name = "PRF_ID")
	private Long idProfile;
	
	@Column(name = "PRF_DESCRICAO")
	private String description;
	
	@Column(name = "PRF_STATUS")
	private Integer status;
	
	
	
	}