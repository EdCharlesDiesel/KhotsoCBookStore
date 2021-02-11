using AutoMapper;
using KhotsoCBookStore.API.Models;

namespace KhotsoCBookStore.API.Profiles
{
    public class AuthorProfile : Profile
    {
        public AuthorProfile()
        {
            CreateMap<Entities.Author, Models.AuthorDto>();

            CreateMap<AuthorForUpdateDto, Entities.Author>();

            CreateMap<Models.AuthorForCreationDto, Entities.Author>();
        }
    }
}
