using dotnetEdit.BusinessEntities.Entities;
using dotnetEdit.Contracts.DTO;
using AutoMapper;
namespace dotnetEdit.Api.Middleware
{
public class MappingFile : Profile
{
    public MappingFile()
    {
        // Mapping variables
		CreateMap<Editentity , EditentityDto>(); 
    }
  }
}
