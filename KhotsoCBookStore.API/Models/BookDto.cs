﻿using System;

namespace KhotsoCBookStore.API.Models
{
    public class BookDto
    {
        public Guid Id { get; set; }

        public string AuthorFirstName { get; set; }

        public string AuthorLastName { get; set; }

        public string Name { get; set; }

        public string Text { get; set; }
    }
}