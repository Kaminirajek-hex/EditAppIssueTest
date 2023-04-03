using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace dotnetEdit.BusinessEntities.Entities
{
    [BsonIgnoreExtraElements]
    public class Editentity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id  { get; set; }
        public string editone  { get; set; }
        public bool edittwo  { get; set; }
        public int editthree  { get; set; }
        
    }

}
