using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using dotnetEdit.BusinessEntities.Entities;

namespace dotnetEdit.Test.Business.EditentityServiceSpec
{
    public class When_getting_all_editentity : UsingEditentityServiceSpec
    {
        private IEnumerable<Editentity> _result;

        private IEnumerable<Editentity> _all_editentity;
        private Editentity _editentity;

        public override void Context()
        {
            base.Context();

            _editentity = new Editentity{
                editone = "editone",
                edittwo = false,
                editthree = 1
            };

            _all_editentity = new List<Editentity> { _editentity};
            _editentityRepository.GetAll().Returns(_all_editentity);
        }
        public override void Because()
        {
            _result = subject.GetAll();
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _editentityRepository.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<List<Editentity>>();

            List<Editentity> resultList = _result as List<Editentity>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_editentity);
        }
    }
}