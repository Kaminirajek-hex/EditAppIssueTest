using NSubstitute;
using dotnetEdit.Test.Framework;
using dotnetEdit.BusinessServices.Services;
using dotnetEdit.Data.Interfaces;

namespace dotnetEdit.Test.Business.EditentityServiceSpec
{
    public abstract class UsingEditentityServiceSpec : SpecFor<EditentityService>
    {
        protected IEditentityRepository _editentityRepository;

        public override void Context()
        {
            _editentityRepository = Substitute.For<IEditentityRepository>();
            subject = new EditentityService(_editentityRepository);

        }

    }
}