using AutoMapper;
using KhotsoCBookStore.API.Models;

namespace KhotsoCBookStore.API.Profiles
{
    public class AuthorProfile : Profile
    {
        public AuthorProfile()
        {
            CreateMap<Entities.Author, Models.Author>();

            CreateMap<AuthorForUpdate, Entities.Author>();

            CreateMap<Models.AuthorForCreation, Entities.Author>();
        }
    }
}
