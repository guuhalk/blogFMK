package blogfmk.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import blogfmk.model.Image;
import blogfmk.repository.ImageRepository;

@Service
public class ImageService {

	final String pathImage = "C:\\imagens\\";
	
	@Autowired
	private ImageRepository imgRepository;

	public Optional<Image> saveImage(MultipartFile arquivo) {
		try {
			Path caminho = Paths.get(pathImage + arquivo.getOriginalFilename());
			Files.write(caminho, arquivo.getBytes());
			
			Image img = new Image();
			img.setName(arquivo.getOriginalFilename());
			img.setPath(caminho.toString());
			
			imgRepository.save(img);
			
			Optional<Image> imageSaved = imgRepository.findByName(img.getName());
			return imageSaved.isPresent() ? imageSaved : null;
		

		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

}
