using KhotsoCBookStore.API.Contexts;
using KhotsoCBookStore.API.Entities;
using KhotsoCBookStore.API.Models;
using KhotsoCBookStore.API.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KhotsoCBookStore.API.Repositories
{
    public class BookSubscriptionRepository : IBookSubscriptionService
    {
        readonly KhotsoCBookStoreDbContext _dbContext;

        public BookSubscriptionRepository(KhotsoCBookStoreDbContext dbContext)
        {
            _dbContext = dbContext;
        }           

        public List<BookSubscription> GetBooksSubscrption()
        {
            try
            {                
                return _dbContext.BookSubscriptions.AsNoTracking().ToList();
            }
            catch
            {
                throw;
            }
        }

        public int AddBookSubscription(BookSubscription bookSubscription)
        {
                  try
            {
                _dbContext.BookSubscriptions.Add(bookSubscription);
                _dbContext.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        public BookSubscription GetSingleBookSubscription(int subscriptionbookId)
        {
            try
            {
                BookSubscription sub = _dbContext.BookSubscriptions.FirstOrDefault(x => x.Id == subscriptionbookId);
                if (sub != null)
                {
                    _dbContext.Entry(sub).State = EntityState.Detached;
                    return sub;
                }
                return null;
            }
            catch
            {
                throw;
            }
        }

        public string BookDeleteSubscription(int subscriptionbookId)
        {
                  try
            {
                BookSubscription sub = _dbContext.BookSubscriptions.Find(subscriptionbookId);
                _dbContext.BookSubscriptions.Remove(sub);
                _dbContext.SaveChanges();

                return sub.BookName;
            }
            catch
            {
                throw;
            }
        }
    }
}
