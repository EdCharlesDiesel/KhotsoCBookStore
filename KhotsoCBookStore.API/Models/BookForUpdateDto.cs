using System.ComponentModel.DataAnnotations;

namespace KhotsoCBookStore.API.Models
{
    public class BookForUpdateDto : BookAbstractBase
    {

        [Required(ErrorMessage = "You should fill out the purchase price.")]
        public override int PurchasePrice { get => base.PurchasePrice   ; set => base.PurchasePrice = value; }
    }
}
