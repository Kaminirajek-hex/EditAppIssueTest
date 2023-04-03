using dotnetEdit.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetEdit.BusinessServices.Interfaces
{
    public interface IEditentityService
    {      
        IEnumerable<Editentity> GetAll();
        Editentity Get(string id);
        Editentity Save(Editentity editentity);
        Editentity Update(string id, Editentity editentity);
        bool Delete(string id);

    }
}
