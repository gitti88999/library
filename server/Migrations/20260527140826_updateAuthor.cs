using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class updateAuthor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AutherId",
                table: "Books",
                newName: "AuthorId");

            migrationBuilder.RenameColumn(
                name: "AutherId",
                table: "BookArchive",
                newName: "AuthorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Books",
                newName: "AutherId");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "BookArchive",
                newName: "AutherId");
        }
    }
}
