using KhotsoCBookStore.API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KhotsoCBookStore.API.Services
{
    public interface IBookRepository : IDisposable
    {
        Task<IEnumerable<Book>> GetBooksAsync(Guid authorId);

        Task<Book> GetBookAsync(Guid authorId, Guid bookId);

        Task<Book> GetBookForAuthorAsync(Guid authorId, Guid bookId);

        void AddBook(Book bookToAdd);

        void AddBook(Guid authorId, Book book);
        void UpdateBook(Book book);
        void DeleteBook(Book book);

        Task<Author> GetAuthorAsync(Guid authorId);
        Task<bool> AuthorExists(Guid authorId);

        Task<bool> SaveChangesAsync();
    }
}
