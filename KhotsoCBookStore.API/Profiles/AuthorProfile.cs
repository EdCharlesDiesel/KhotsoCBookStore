using AutoMapper;
using KhotsoCBookStore.API.Entities;
using KhotsoCBookStore.API.Models;

namespace KhotsoCBookStore.API.Profiles
{
    public class AuthorProfile : Profile
    {
        public AuthorProfile()
        {
            CreateMap<Author, Models.Author>();

            CreateMap<AuthorForUpdate, Author>();
        }
    }
}
