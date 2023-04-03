using dotnetEdit.Data.Interfaces;
using dotnetEdit.BusinessEntities.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Bindings;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetEdit.Data.Repositories
{
    public class EditentityRepository : IEditentityRepository
    {
        private readonly IGateway _gateway;
        private readonly string _collectionName = "Editentity";

        public EditentityRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<Editentity> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<Editentity>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public Editentity Get(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Editentity>(_collectionName)
                            .Find(x => x.Id == id).Single();
            return result;
        }

        public bool Save(Editentity entity)
        {
            _gateway.GetMongoDB().GetCollection<Editentity>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public Editentity Update(string id, Editentity entity)
        {
            var update = Builders<Editentity>.Update
                .Set(e => e.editone, entity.editone )
                .Set(e => e.edittwo, entity.edittwo )
                .Set(e => e.editthree, entity.editthree );

            var result = _gateway.GetMongoDB().GetCollection<Editentity>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Editentity>(_collectionName)
                         .FindOneAndDelete(e => e.Id == id);
            if(result==null) return false;             
            return true;
        }
    }
}
