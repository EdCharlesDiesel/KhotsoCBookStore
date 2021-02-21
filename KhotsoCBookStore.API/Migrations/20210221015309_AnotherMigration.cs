using Microsoft.EntityFrameworkCore.Migrations;

namespace KhotsoCBookStore.API.Migrations
{
    public partial class AnotherMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Book",
                columns: new[] { "BookID", "Author", "Category", "CoverFileName", "Price", "Title" },
                values: new object[] { 1, "Charles", "Development", "", 300m, "Webdevelopment-101" });

            migrationBuilder.InsertData(
                table: "Book",
                columns: new[] { "BookID", "Author", "Category", "CoverFileName", "Price", "Title" },
                values: new object[] { 2, "Kagiso", "Development", "", 300m, "Webdevelopment-101" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Book",
                keyColumn: "BookID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Book",
                keyColumn: "BookID",
                keyValue: 2);
        }
    }
}
