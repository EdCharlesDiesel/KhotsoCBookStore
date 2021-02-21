using Microsoft.EntityFrameworkCore.Migrations;

namespace KhotsoCBookStore.API.Migrations
{
    public partial class UpdatedCovername : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Book",
                keyColumn: "BookID",
                keyValue: 1,
                column: "CoverFileName",
                value: "Default_image");

            migrationBuilder.UpdateData(
                table: "Book",
                keyColumn: "BookID",
                keyValue: 2,
                column: "CoverFileName",
                value: "Default_image");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Book",
                keyColumn: "BookID",
                keyValue: 1,
                column: "CoverFileName",
                value: "");

            migrationBuilder.UpdateData(
                table: "Book",
                keyColumn: "BookID",
                keyValue: 2,
                column: "CoverFileName",
                value: "");
        }
    }
}
