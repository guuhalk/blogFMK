package blogfmk.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "PTS_LINKS")
public class Links {

	@Id
	@GeneratedValue
	@Column(name = "LK_ID")
	private Long idComments;

	@Column(name = "LK_DESCRICAO")
	private String description;

}
