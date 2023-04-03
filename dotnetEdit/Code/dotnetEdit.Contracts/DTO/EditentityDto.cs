using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes; 
using System.Runtime.Serialization; 
namespace dotnetEdit.Contracts.DTO {
   public class EditentityDto { 
     public string Id { get; set; }
        public string editone { get; set; } 
        public bool edittwo { get; set; } 
        public int editthree { get; set; } 
} 
}
