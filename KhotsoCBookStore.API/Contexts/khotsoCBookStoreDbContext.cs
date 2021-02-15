﻿
using KhotsoCBookStore.API.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace KhotsoCBookStore.API.Contexts
{
    public class khotsoCBookStoreDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; }

        public khotsoCBookStoreDbContext(DbContextOptions<khotsoCBookStoreDbContext> options)
            : base(options)
        {
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {

            var addedOrUpdatedEntries = ChangeTracker.Entries()
                    .Where(x => x.State == EntityState.Added || x.State == EntityState.Modified);
            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // seed the database with dummy data
            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = Guid.Parse("5b1c2b4d-48c7-402a-80c3-cc796ad49c6b"),
                    Name = "A Dance with Dragons",
                    Text = "A Dance with Dragons is the fifth of seven planned novels in the epic fantasy series A Song of Ice and Fire.",
                    PurchasePrice = 150
                },
                new Book
                {
                    Id = Guid.Parse("d8663e5e-7494-4f81-8739-6e0de1bea7ee"),
                    Name = "A Game of Thrones",
                    Text = "A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by American author George R. R. ... In the novel, recounting events from various points of view, Martin introduces the plot-lines of the noble houses of Westeros, the Wall, and the Targaryens.",
                    PurchasePrice = 220
                },
                new Book
                {
                    Id = Guid.Parse("d173e20d-159e-4127-9ce9-b0ac2564ad97"),
                    Name = "Mythos",
                    Text = "The Greek myths are amongst the best stories ever told, passed down through millennia and inspiring writers and artists as varied as Shakespeare, Michelangelo, James Joyce and Walt Disney.  They are embedded deeply in the traditions, tales and cultural DNA of the West.You'll fall in love with Zeus, marvel at the birth of Athena, wince at Cronus and Gaia's revenge on Ouranos, weep with King Midas and hunt with the beautiful and ferocious Artemis. Spellbinding, informative and moving, Stephen Fry's Mythos perfectly captures these stories for the modern age - in all their rich and deeply human relevance.",
                    PurchasePrice = 550

                },
                new Book
                {
                    Id = Guid.Parse("493c3228-3444-4a49-9cc0-e8532edc59b2"),
                    Name = "American Tabloid",
                    Text = "American Tabloid is a 1995 novel by James Ellroy that chronicles the events surrounding three rogue American law enforcement officers from November 22, 1958 through November 22, 1963. Each becomes entangled in a web of interconnecting associations between the FBI, the CIA, and the mafia, which eventually leads to their collective involvement in the John F. Kennedy assassination.",
                    PurchasePrice = 750
                },
                new Book
                {
                    Id = Guid.Parse("40ff5488-fdab-45b5-bc3a-14302d59869a"),
                    Name = "The Hitchhiker's Guide to the Galaxy",
                    Text = "In The Hitchhiker's Guide to the Galaxy, the characters visit the legendary planet Magrathea, home to the now-collapsed planet-building industry, and meet Slartibartfast, a planetary coastline designer who was responsible for the fjords of Norway. Through archival recordings, he relates the story of a race of hyper-intelligent pan-dimensional beings who built a computer named Deep Thought to calculate the Answer to the Ultimate Question of Life, the Universe, and Everything.",
                    PurchasePrice = 850
                }
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
