using System.ComponentModel.DataAnnotations;

namespace KhotsoCBookStore.API.Models
{

    public abstract class BookAbstractBase
    {
        [Required(ErrorMessage = "You should fill out a title.")]
        [MaxLength(100, ErrorMessage = "The name shouldn't have more than 100 characters.")]
        public string Name { get; set; }        

        [Required(ErrorMessage = "You should fill out a title.")]
        [MaxLength(1500, ErrorMessage = "The text shouldn't have more than 1500 characters.")]
        public string Text { get; set; }

        [Required(ErrorMessage = "You should fill out a purchase price.")]        
        public virtual  int PurchasePrice { get; set; }        
    }
}
