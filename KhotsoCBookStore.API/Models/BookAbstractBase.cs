using System.ComponentModel.DataAnnotations;

namespace KhotsoCBookStore.API.Models
{

    public abstract class BookAbstractBase
    {
        [Required(ErrorMessage = "You should fill out a title.")]
        [MaxLength(100, ErrorMessage = "The name shouldn't have more than 100 characters.")]
        public string Name { get; set; }

        [MaxLength(1500, ErrorMessage = "The text shouldn't have more than 1500 characters.")]
        public virtual string Text { get; set; }
    }
}
