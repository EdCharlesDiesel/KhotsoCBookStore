using Microsoft.EntityFrameworkCore.Migrations;

namespace KhotsoCBookStore.API.Migrations
{
    public partial class CoverFileNameField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CoverFileName",
                table: "BookSubscriptions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "BookSubscriptions",
                columns: new[] { "Id", "BookName", "CoverFileName", "UserId" },
                values: new object[] { 1, "Webdevelopment-101", "", 1 });

            migrationBuilder.InsertData(
                table: "BookSubscriptions",
                columns: new[] { "Id", "BookName", "CoverFileName", "UserId" },
                values: new object[] { 2, "Webdevelopment-102", "", 1 });

            migrationBuilder.InsertData(
                table: "BookSubscriptions",
                columns: new[] { "Id", "BookName", "CoverFileName", "UserId" },
                values: new object[] { 3, "Webdevelopment-103", "", 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BookSubscriptions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "BookSubscriptions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "BookSubscriptions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "CoverFileName",
                table: "BookSubscriptions");
        }
    }
}
