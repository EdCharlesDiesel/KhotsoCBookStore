using System.ComponentModel.DataAnnotations;

namespace KhotsoCBookStore.API.Models
{
    public class BookForUpdateDto : BookAbstractBase
    {

        [Required(ErrorMessage = "You should fill out a text.")]
        public override string Text { get => base.Text; set => base.Text = value; }
    }
}
