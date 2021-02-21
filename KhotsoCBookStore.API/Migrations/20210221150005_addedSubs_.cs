using Microsoft.EntityFrameworkCore.Migrations;

namespace KhotsoCBookStore.API.Migrations
{
    public partial class addedSubs_ : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BookSubscriptions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CoverFileName",
                value: "Default_image");

            migrationBuilder.UpdateData(
                table: "BookSubscriptions",
                keyColumn: "Id",
                keyValue: 2,
                column: "CoverFileName",
                value: "Default_image");

            migrationBuilder.UpdateData(
                table: "BookSubscriptions",
                keyColumn: "Id",
                keyValue: 3,
                column: "CoverFileName",
                value: "Default_image");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BookSubscriptions",
                keyColumn: "Id",
                keyValue: 1,
                column: "CoverFileName",
                value: "");

            migrationBuilder.UpdateData(
                table: "BookSubscriptions",
                keyColumn: "Id",
                keyValue: 2,
                column: "CoverFileName",
                value: "");

            migrationBuilder.UpdateData(
                table: "BookSubscriptions",
                keyColumn: "Id",
                keyValue: 3,
                column: "CoverFileName",
                value: "");
        }
    }
}
