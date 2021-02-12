using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KhotsoCBookStore.API.Entities
{
    [Table("Books")]
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
    public class Book

    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        [MaxLength(2500)]
        public string Text { get; set; }

        [Required]
        public int PurchasePrice { get; set; }

        public int? AmountOfPages { get; set; }

        public Guid AuthorId { get; set; }
        public Author Author { get; set; }
    }

#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
}
