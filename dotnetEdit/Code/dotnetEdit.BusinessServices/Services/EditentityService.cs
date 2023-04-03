using dotnetEdit.BusinessServices.Interfaces;
using dotnetEdit.Data.Interfaces;
using dotnetEdit.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetEdit.BusinessServices.Services
{
    public class EditentityService : IEditentityService
    {
        readonly IEditentityRepository _EditentityRepository;

        public EditentityService(IEditentityRepository EditentityRepository)
        {
           this._EditentityRepository = EditentityRepository;
        }
        public IEnumerable<Editentity> GetAll()
        {
            return _EditentityRepository.GetAll();
        }

        public Editentity Get(string id)
        {
            return _EditentityRepository.Get(id);
        }

        public Editentity Save(Editentity editentity)
        {
            _EditentityRepository.Save(editentity);
            return editentity;
        }

        public Editentity Update(string id, Editentity editentity)
        {
            return _EditentityRepository.Update(id, editentity);
        }

        public bool Delete(string id)
        {
            return _EditentityRepository.Delete(id);
        }

    }
}
