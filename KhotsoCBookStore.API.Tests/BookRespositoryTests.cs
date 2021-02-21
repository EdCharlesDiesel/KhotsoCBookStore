using KhotsoCBookStore.API.Contexts;
using KhotsoCBookStore.API.Repositories;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;
using Xunit.Abstractions;

namespace KhotsoCBookStore.API.Tests
{
    public class BookRespositoryTests
    {
        private readonly ITestOutputHelper _output;
        public BookRespositoryTests(ITestOutputHelper output)
        {
            _output = output;
        }

           
         [Fact]
        public void GetBooks_That_ReturnsThreeBooks()
        {
           // Arrange

           var connectionStringBuilder =
               new SqliteConnectionStringBuilder { DataSource = ":memory:" };
            var connection = new SqliteConnection(connectionStringBuilder.ToString());

            var options = new DbContextOptionsBuilder<KhotsoCBookStoreDbContext>()
                .UseSqlite(connection)
                .Options;


            using (var context = new KhotsoCBookStoreDbContext(options))
            {
                //context.Database.OpenConnection();
                //context.Database.EnsureCreated();
                //context.Countries.Add(new Entities.Country()
                //{
                //    Id = "BE",
                //    Description = "Belgium"
                //});

                //context.Countries.Add(new Entities.Country()
                //{
                //    Id = "US",
                //    Description = "United States of America"
                //});

                //context.Books.Add(new Entities.Author()
                //{ FirstName = "Kevin", LastName = "Dockx", CountryId = "BE" });
                //context.Books.Add(new Entities.Author()
                //{ FirstName = "Gill", LastName = "Cleeren", CountryId = "BE" });
                //context.Books.Add(new Entities.Author()
                //{ FirstName = "Julie", LastName = "Lerman", CountryId = "US" });
                //context.Books.Add(new Entities.Author()
                //{ FirstName = "Shawn", LastName = "Wildermuth", CountryId = "BE" });
                //context.Books.Add(new Entities.Author()
                //{ FirstName = "Deborah", LastName = "Kurata", CountryId = "US" });

                context.SaveChanges();
            }

            using (var context = new KhotsoCBookStoreDbContext(options))
            {
                var bookRepository = new BookRepository(context);

                // Act
                var books = bookRepository.GetAllBooks();
                
                // Assert
                Assert.Equal(3, books.Count());
            }
        }
        
    }
}
