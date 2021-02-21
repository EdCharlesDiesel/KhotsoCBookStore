using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KhotsoCBookStore.API.Entities
{
    public class BookSubscription
    {
        public int Id { get; set; }
        public string BookName { get; set; }
        public int UserId { get; set; }

    }
}
