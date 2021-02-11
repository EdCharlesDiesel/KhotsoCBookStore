using KhotsoCBookStore.API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KhotsoCBookStore.API.Services
{
    public interface IAuthorRepository : IDisposable
    {
        Task AddAuthorAsync(Author author);

        void DeleteAuthor(Author author);

        Task<bool> AuthorExistsAsync(Guid authorId);

        Task<IEnumerable<Author>> GetAuthorsAsync();

        Task<Author> GetAuthorAsync(Guid authorId);

        void UpdateAuthor(Author author);

        Task<bool> SaveChangesAsync();
        
    }
}
