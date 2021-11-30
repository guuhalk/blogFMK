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
@Table(name = "SYS_IMAGE")
public class Image {

	@Id
	@GeneratedValue
	@Column(name = "IMG_ID")
	private Long idImage;
	
	@Column(name = "IMG_NOME")
	private String name;
	
	@Column(name = "IMG_PATH")
	private String path;
	
	
	
	}