using MongoDB.Driver;

namespace dotnetEdit.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
