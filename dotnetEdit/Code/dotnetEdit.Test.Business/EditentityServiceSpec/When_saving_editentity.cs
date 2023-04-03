using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using dotnetEdit.BusinessEntities.Entities;

namespace dotnetEdit.Test.Business.EditentityServiceSpec
{
    public class When_saving_editentity : UsingEditentityServiceSpec
    {
        private Editentity _result;

        private Editentity _editentity;

        public override void Context()
        {
            base.Context();

            _editentity = new Editentity
            {
                editone = "editone",
                edittwo = true,
                editthree = 19
            };

            _editentityRepository.Save(_editentity).Returns(true);
        }
        public override void Because()
        {
            _result = subject.Save(_editentity);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _editentityRepository.Received(1).Save(_editentity);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Editentity>();

            _result.ShouldBe(_editentity);
        }
    }
}