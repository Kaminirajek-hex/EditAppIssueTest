using System.Collections.Generic;
using dotnetEdit.BusinessServices.Interfaces;
using dotnetEdit.BusinessEntities.Entities;
using dotnetEdit.Contracts.DTO;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace dotnetEdit.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EditentityController : ControllerBase
    {
        readonly IEditentityService _EditentityService;
        private readonly IMapper _mapper;
        public EditentityController(IEditentityService EditentityService,IMapper mapper)
        {
            _EditentityService = EditentityService;
            _mapper = mapper;
        }

        // GET: api/Editentity
        [HttpGet]
        public ActionResult<IEnumerable<EditentityDto>> Get()
        {
            var EditentityDTOs = _mapper.Map<IEnumerable<EditentityDto>>(_EditentityService.GetAll());
            return Ok(EditentityDTOs);
        }

        [HttpGet("{id}")]
        public ActionResult<EditentityDto> GetById(string id)
        {
            var EditentityDTO = _mapper.Map<EditentityDto>(_EditentityService.Get(id));
            return Ok(EditentityDTO);
        }

        [HttpPost]
        public ActionResult<EditentityDto> Save(Editentity Editentity)
        {
            var EditentityDTOs = _mapper.Map<EditentityDto>(_EditentityService.Save(Editentity));
            return Ok(EditentityDTOs);
        }

        [HttpPut("{id}")]
        public ActionResult<EditentityDto> Update([FromRoute] string id, Editentity Editentity)
        {
            var EditentityDTOs = _mapper.Map<EditentityDto>(_EditentityService.Update(id, Editentity));
            return Ok(EditentityDTOs);
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete([FromRoute] string id)
        {
            bool res = _EditentityService.Delete(id);
            return Ok(res);
    }


    }
}
