using KhotsoCBookStore.API.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KhotsoCBookStore.API.Services
{
    public interface IBookRepository : IDisposable
    {
        Task<IEnumerable<Book>> GetAllBooksAsync();

        Task<Book> GetBookAsync(Guid bookId);

        Task AddBookAsync(Book book);

        Task UpdateBook(Book book);
        
        Task DeleteBook(Book book);        

        Task<bool> BookExists(Guid Id);

        Task<bool> SaveChangesAsync();
    }
}
