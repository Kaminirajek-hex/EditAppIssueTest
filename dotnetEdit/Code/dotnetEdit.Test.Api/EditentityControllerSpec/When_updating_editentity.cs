using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using dotnetEdit.BusinessEntities.Entities;
using dotnetEdit.Contracts.DTO;
using dotnetEdit.BusinessServices.Services;

namespace dotnetEdit.Test.Api.EditentityControllerSpec
{
    public class When_updating_editentity : UsingEditentityControllerSpec
    {
        private ActionResult<EditentityDto > _result;
        private Editentity _editentity;
        private EditentityDto _editentityDto;

        public override void Context()
        {
            base.Context();

            _editentity = new Editentity
            {
                editone = "editone",
                edittwo = true,
                editthree = 17
            };

            _editentityDto = new EditentityDto{
                    editone = "editone",
                    edittwo = true,
                    editthree = 97
            };

            _editentityService.Update(_editentity.Id, _editentity).Returns(_editentity);
            _mapper.Map<EditentityDto>(_editentity).Returns(_editentityDto);
            
        }
        public override void Because()
        {
            _result = subject.Update(_editentity.Id, _editentity);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _editentityService.Received(1).Update(_editentity.Id, _editentity);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<EditentityDto>();

            var resultList = resultListObject as EditentityDto;

            resultList.ShouldBe(_editentityDto);
        }
    }
}