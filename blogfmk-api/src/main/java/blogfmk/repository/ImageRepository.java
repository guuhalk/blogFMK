package blogfmk.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import blogfmk.model.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {

	public Optional<Image> findByName(String name);
	
	public Optional<Image> findById(Long Id);

}
