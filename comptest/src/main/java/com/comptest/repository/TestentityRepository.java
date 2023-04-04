package com.comptest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.comptest.entity.Testentity;

@Repository
public interface TestentityRepository extends JpaRepository<Testentity, Long> {
  
}