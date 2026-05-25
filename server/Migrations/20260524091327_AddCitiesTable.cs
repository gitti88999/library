using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddCitiesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Cities",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Cities");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Cities",
                newName: "CityName");

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Cities",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cities",
                table: "Cities",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Collaborators_CityId",
                table: "Collaborators",
                column: "CityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Collaborators_Cities_CityId",
                table: "Collaborators",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "CityId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Collaborators_Cities_CityId",
                table: "Collaborators");

            migrationBuilder.DropIndex(
                name: "IX_Collaborators_CityId",
                table: "Collaborators");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cities",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Cities");

            migrationBuilder.RenameColumn(
                name: "CityName",
                table: "Cities",
                newName: "Name");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Cities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cities",
                table: "Cities",
                column: "Id");
        }
    }
}
