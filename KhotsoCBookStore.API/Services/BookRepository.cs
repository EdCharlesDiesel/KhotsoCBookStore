using KhotsoCBookStore.API.Contexts;
using KhotsoCBookStore.API.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KhotsoCBookStore.API.Services
{
    public class BookRepository : IBookRepository, IDisposable
    {
        private khotsoCBookStoreDbContext _context;

        public BookRepository(khotsoCBookStoreDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public async Task AddBookAsync(Book book)
        {
            await _context.Books.AddAsync(book);
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public void DeleteBook(Book book)

        {
            if (book == null)
            {
                throw new ArgumentNullException(nameof(book));
            }
            _context.Books.Remove(book);
        }
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously

        public async Task<bool> BookExists(Guid Id)
        {
            return await _context.Books.AnyAsync(t => t.Id == Id);
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task UpdateBook(Book book)
        {
            // no code in this implementation
        }
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously


        public async Task<IEnumerable<Book>> GetAllBooksAsync()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book> GetBookAsync(Guid Id)
        {
            if (Id == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(Id));
            }

            return await _context.Books.FirstOrDefaultAsync(a => a.Id == Id);
        }
        public Book GetBook(Guid bookId)
        {

            if (bookId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(bookId));
            }

            return _context.Books.FirstOrDefault(a => a.Id == bookId);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_context != null)
                {
                    _context.Dispose();
                    _context = null;
                }
            }
        }

    }
}
