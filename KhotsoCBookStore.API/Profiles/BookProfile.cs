using AutoMapper;
using KhotsoCBookStore.API.Models;

namespace KhotsoCBookStore.API.Profiles
{
    public class BookProfile : Profile
    {
        public BookProfile()
        {   

            CreateMap<Entities.Book, BookDto>();
         
            CreateMap<BookForCreationDto, Entities.Book>();

            CreateMap<BookForUpdateDto, Entities.Book>().ReverseMap();
        }
    }
}
