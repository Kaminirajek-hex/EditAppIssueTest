package com.comptest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.comptest.entity.Testentity;
import com.comptest.service.TestentityService;
import com.comptest.dto.TestentityDto;

@RestController
public class TestentityController {

	@Autowired
	private TestentityService testentityService;

	@GetMapping("/testentity")
	public List<Testentity> fetchAll() {
		return this.testentityService.fetchAll();
	}

	@GetMapping("/testentity/{id}")
	public Testentity fetchById(@PathVariable Long id) {
		return this.testentityService.fetchById(id);
	}

	@DeleteMapping("/testentity/{id}")
	public void delete(@PathVariable Long id) {
		this.testentityService.delete(id);
	}

	@PostMapping("/testentity")
	public Testentity create(@RequestBody TestentityDto testentityDto) {
		return this.testentityService.create(testentityDto);
	}
	
	@PutMapping("/testentity/{id}")
	public ResponseEntity<Object> update(@RequestBody TestentityDto testentityDto, @PathVariable Long id) {
		
		return this.testentityService.update(testentityDto, id);
	}
}