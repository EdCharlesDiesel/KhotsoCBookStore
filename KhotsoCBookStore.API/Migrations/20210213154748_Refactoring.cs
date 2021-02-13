using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KhotsoCBookStore.API.Migrations
{
    public partial class Refactoring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Authors_AuthorId",
                table: "Books");

            migrationBuilder.DropTable(
                name: "Authors");

            migrationBuilder.DropIndex(
                name: "IX_Books_AuthorId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "AmountOfPages",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Books");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AmountOfPages",
                table: "Books",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AuthorId",
                table: "Books",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Authors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authors", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Authors",
                columns: new[] { "Id", "FirstName", "LastName" },
                values: new object[,]
                {
                    { new Guid("d28888e9-2ba9-473a-a40f-e38cb54f9b35"), "George", "RR Martin" },
                    { new Guid("da2fd609-d754-4feb-8acd-c4f9ff13ba96"), "Stephen", "Fry" },
                    { new Guid("24810dfc-2d94-4cc7-aab5-cdf98b83f0c9"), "James", "Elroy" },
                    { new Guid("2902b665-1190-4c70-9915-b9c2d7680450"), "Douglas", "Adams" }
                });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("40ff5488-fdab-45b5-bc3a-14302d59869a"),
                column: "AuthorId",
                value: new Guid("2902b665-1190-4c70-9915-b9c2d7680450"));

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("493c3228-3444-4a49-9cc0-e8532edc59b2"),
                column: "AuthorId",
                value: new Guid("24810dfc-2d94-4cc7-aab5-cdf98b83f0c9"));

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("5b1c2b4d-48c7-402a-80c3-cc796ad49c6b"),
                column: "AuthorId",
                value: new Guid("d28888e9-2ba9-473a-a40f-e38cb54f9b35"));

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("d173e20d-159e-4127-9ce9-b0ac2564ad97"),
                column: "AuthorId",
                value: new Guid("da2fd609-d754-4feb-8acd-c4f9ff13ba96"));

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("d8663e5e-7494-4f81-8739-6e0de1bea7ee"),
                column: "AuthorId",
                value: new Guid("d28888e9-2ba9-473a-a40f-e38cb54f9b35"));

            migrationBuilder.CreateIndex(
                name: "IX_Books_AuthorId",
                table: "Books",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Authors_AuthorId",
                table: "Books",
                column: "AuthorId",
                principalTable: "Authors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
