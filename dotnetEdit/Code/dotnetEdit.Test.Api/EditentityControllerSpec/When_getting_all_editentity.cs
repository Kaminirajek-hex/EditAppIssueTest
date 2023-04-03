using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using dotnetEdit.BusinessEntities.Entities;
using dotnetEdit.Contracts.DTO;

namespace dotnetEdit.Test.Api.EditentityControllerSpec
{
    public class When_getting_all_editentity : UsingEditentityControllerSpec
    {
        private ActionResult<IEnumerable<EditentityDto>> _result;

        private IEnumerable<Editentity> _all_editentity;
        private Editentity _editentity;

        private IEnumerable<EditentityDto>  _all_editentityDto;
        private EditentityDto _editentityDto;
    

        public override void Context()
        {
            base.Context();

            _editentity = new Editentity{
                editone = "editone",
                edittwo = false,
                editthree = 59
            };

            _editentityDto = new EditentityDto{
                    editone = "editone",
                    edittwo = false,
                    editthree = 71
                };

            _all_editentity = new List<Editentity> { _editentity};
            _editentityService.GetAll().Returns(_all_editentity);
            _all_editentityDto  = new List<EditentityDto> {_editentityDto};
            _mapper.Map<IEnumerable<EditentityDto>>(_all_editentity).Returns( _all_editentityDto);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _editentityService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<EditentityDto>>();

            List<EditentityDto> resultList = resultListObject as List<EditentityDto>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_editentityDto);
        }
    }
}