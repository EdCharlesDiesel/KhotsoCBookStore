using KhotsoCBookStore.API.Entities;
using System.Collections.Generic;

namespace KhotsoCBookStore.API.Services
{
    public interface IBookSubscriptionService
    {
        List<BookSubscription> GetBooksSubscrption();
        int AddBookSubscription(BookSubscription bookSubscriptions);        
        BookSubscription GetSingleBookSubscription(int subscriptionbookId);
        string BookDeleteSubscription(int subscriptionbookId);        
    }
}
