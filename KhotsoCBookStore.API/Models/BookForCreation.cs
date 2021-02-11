using System.ComponentModel.DataAnnotations;

namespace KhotsoCBookStore.API.Models
{
    public class BookForCreation
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
