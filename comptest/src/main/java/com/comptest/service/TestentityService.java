
package com.comptest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import com.comptest.entity.Testentity;
import com.comptest.exception.EntityNotFoundException;
import com.comptest.repository.TestentityRepository;
import com.comptest.dto.TestentityDto;

@Service  
public class TestentityService {

  @Autowired
  private TestentityRepository testentityRepo;

  public List<Testentity> fetchAll() {
    return testentityRepo.findAll();
  }

  public Testentity fetchById(final Long id) {
    Optional<Testentity> testentity = testentityRepo.findById(id);

		if (!testentity.isPresent()){
			throw new EntityNotFoundException("id-" + id);
    }
		return testentity.get();
  }

  public void delete(final Long id) {
    testentityRepo.deleteById(id);
  }

  public Testentity create(final TestentityDto testentityDto) {
    Testentity testentity = new Testentity();
		testentity.setId(testentityDto.getId());
			testentity.setRed(testentityDto.getRed());			testentity.setTesttwo(testentityDto.getTesttwo());			testentity.setTett(testentityDto.getTett());    return testentityRepo.save(testentity);
  }

  public ResponseEntity<Object> update(final TestentityDto testentityDto, final Long id) {
    Testentity testentity = new Testentity();
			testentity.setRed(testentityDto.getRed());			testentity.setTesttwo(testentityDto.getTesttwo());			testentity.setTett(testentityDto.getTett());    Optional<Testentity> testentityOptional = testentityRepo.findById(id);
		if (!testentityOptional.isPresent()) {
			return ResponseEntity.notFound().build();
    }
		testentity.setId(id);
		testentityRepo.save(testentity);
		return ResponseEntity.noContent().build();
  }

}
