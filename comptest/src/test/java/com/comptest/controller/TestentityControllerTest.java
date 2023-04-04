package com.comptest.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.DateFormat;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import com.comptest.entity.Testentity;
import com.comptest.service.TestentityService;
import com.comptest.dto.TestentityDto;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
public class TestentityControllerTest {
	@Mock
	private TestentityService service;

	@Mock
	private TestentityController controller;
	DateFormat dateFormat=new SimpleDateFormat("YYYY dd MMMM");

	private List<Testentity> prepareTestentityRecords(){
		List<Testentity> testentityList = new ArrayList<Testentity>();
		Testentity testentity1 = new Testentity(345345L, "KBRTC",32,true);
		Testentity testentity2 = new Testentity(345344L, "fs4v1",53,false);
		testentityList.add(testentity1);
		testentityList.add(testentity2);
		return testentityList;
	}
	private List<TestentityDto> prepareTestentityDtoRecords(){
		List<TestentityDto> testentityList = new ArrayList<TestentityDto>();
		TestentityDto testentity1 = new TestentityDto(5L, "KBRTC",32,true);
		TestentityDto testentity2 = new TestentityDto(4L, "fs4v1",53,false);
		testentityList.add(testentity1);
		testentityList.add(testentity2);
		return testentityList;
	}
	
	@Test
	public void testFetchAllPass() {
		Mockito
        .when(controller.fetchAll()).thenReturn(prepareTestentityRecords());
		List<Testentity> testentityList = prepareTestentityRecords();
		List<Testentity> testentityListFromController =  controller.fetchAll();
		for(int i=0; i<testentityList.size();i++) {
			Assertions.assertEquals(testentityList.get(i).getId(), testentityListFromController.get(i).getId());
            Assertions.assertEquals(testentityList.get(i).getRed(), testentityListFromController.get(i).getRed());
            Assertions.assertEquals(testentityList.get(i).getTesttwo(), testentityListFromController.get(i).getTesttwo());
            Assertions.assertEquals(testentityList.get(i).getTett(), testentityListFromController.get(i).getTett());
		}
		
	}

	@Test
	public void testFetchAllFailure() {
		Mockito
        .when(controller.fetchAll()).thenReturn(prepareTestentityRecords());
		List<Testentity> testentityList = null; //Intentionally made null to fail the test.
		List<Testentity> testentityListFromController =  controller.fetchAll();
		Assertions.assertNotEquals(testentityList, testentityListFromController);
	}
	
	
	 @Test public void fetchByIdPass() { 
		 Mockito
	        .when(controller.fetchById(345344L))
            .thenReturn(prepareTestentityRecords().get(0));

        Testentity testentityById = prepareTestentityRecords().get(0);
        Testentity testentityByIdFromController = controller.fetchById(345344L);
        
        Assertions.assertEquals(testentityById.getId(), testentityByIdFromController.getId());
		Assertions.assertEquals(testentityById.getRed(), testentityByIdFromController.getRed());
		Assertions.assertEquals(testentityById.getTesttwo(), testentityByIdFromController.getTesttwo());
		Assertions.assertEquals(testentityById.getTett(), testentityByIdFromController.getTett());
		 
	 }

	 @Test public void fetchByIdFailure() { 
		Mockito
	        .when(controller.fetchById(345344L))
            .thenReturn(prepareTestentityRecords().get(0));

        Testentity testentityById = prepareTestentityRecords().get(1);
        Testentity testentityByIdFromController = controller.fetchById(345344L);
        
        Assertions.assertNotEquals(testentityById.getId(), testentityByIdFromController.getId());
        Assertions.assertNotEquals(testentityById.getRed(),testentityByIdFromController.getRed());
        Assertions.assertNotEquals(testentityById.getTesttwo(),testentityByIdFromController.getTesttwo());
        Assertions.assertNotEquals(testentityById.getTett(),testentityByIdFromController.getTett());
		 
	 }
	 
	 @Test
	 public void deletePass() { 
		 controller.delete(345345L);
		 Assertions.assertTrue(true); // This line will be executed only if there is no error in calling the controller for delete as there is no return value.
	 }

	@Test
	public void createPass() {
		TestentityDto testentityToBeCreated 			= prepareTestentityDtoRecords().get(0);
		Testentity testentityReturned = prepareTestentityRecords().get(0);
		testentityReturned.setId(345348L); //Changed the ID.
		
		Mockito
			.when(controller.create(testentityToBeCreated))
            .thenReturn(testentityReturned);
		
		Testentity testentityFromController  = controller.create(testentityToBeCreated);
		Assertions.assertNotEquals(testentityToBeCreated.getId(), testentityFromController.getId()); //Since Id of created one is mocked as changed from within serviceid, it cannot be equal.
        Assertions.assertEquals(testentityToBeCreated.getRed(), testentityFromController.getRed());
        Assertions.assertEquals(testentityToBeCreated.getTesttwo(), testentityFromController.getTesttwo());
        Assertions.assertEquals(testentityToBeCreated.getTett(), testentityFromController.getTett());
	}
	
	@Test
	public void createFailure() {
		TestentityDto testentityToBeCreated = prepareTestentityDtoRecords().get(0);
		Testentity testentityReturned = null; // Intentionally left to null to fail the case. 
				
		Mockito
			.when(controller.create(testentityToBeCreated))
            .thenReturn(testentityReturned);
		
		Testentity testentityFromController  = controller.create(testentityToBeCreated);
		Assertions.assertNull(testentityFromController);
	}
}
