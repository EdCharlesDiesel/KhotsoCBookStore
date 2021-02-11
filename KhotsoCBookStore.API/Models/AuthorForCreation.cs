using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KhotsoCBookStore.API.Models
{
    public class AuthorForCreation
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<BookForCreation> Books { get; set; }
          = new List<BookForCreation>();

    }
}
