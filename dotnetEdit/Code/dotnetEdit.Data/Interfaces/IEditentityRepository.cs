using dotnetEdit.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetEdit.Data.Interfaces
{
    public interface IEditentityRepository : IGetAll<Editentity>,IGet<Editentity,string>, ISave<Editentity>, IUpdate<Editentity, string>, IDelete<string>
    {
    }
}
