using NSubstitute;
using dotnetEdit.Test.Framework;
using dotnetEdit.Api.Controllers;
using dotnetEdit.BusinessServices.Interfaces;
using AutoMapper;
using dotnetEdit.BusinessEntities.Entities;
using dotnetEdit.Contracts.DTO;


namespace dotnetEdit.Test.Api.EditentityControllerSpec
{
    public abstract class UsingEditentityControllerSpec : SpecFor<EditentityController>
    {
        protected IEditentityService _editentityService;
        protected IMapper _mapper;

        public override void Context()
        {
            _editentityService = Substitute.For<IEditentityService>();
            _mapper = Substitute.For<IMapper>();
            subject = new EditentityController(_editentityService,_mapper);

        }

    }
}
