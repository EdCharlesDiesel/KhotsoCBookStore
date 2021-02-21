﻿// <auto-generated />
using System;
using KhotsoCBookStore.API.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace KhotsoCBookStore.API.Migrations
{
    [DbContext(typeof(KhotsoCBookStoreDbContext))]
    [Migration("20210221015309_AnotherMigration")]
    partial class AnotherMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("KhotsoCBookStore.API.Authentication.UserMaster", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("UserID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasMaxLength(6)
                        .IsUnicode(false)
                        .HasColumnType("varchar(6)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(40)
                        .IsUnicode(false)
                        .HasColumnType("varchar(40)");

                    b.Property<int>("UserTypeId")
                        .HasColumnType("int")
                        .HasColumnName("UserTypeID");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.HasKey("UserId")
                        .HasName("PK__UserMast__1788CCAC2694A2ED");

                    b.ToTable("UserMaster");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            FirstName = "Khotso",
                            Gender = "Male",
                            LastName = "Mokhethi",
                            Password = "IamBatman",
                            UserTypeId = 1,
                            Username = "Batman"
                        });
                });

            modelBuilder.Entity("KhotsoCBookStore.API.Authentication.UserType", b =>
                {
                    b.Property<int>("UserTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("UserTypeID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("UserTypeName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.HasKey("UserTypeId");

                    b.ToTable("UserType");

                    b.HasData(
                        new
                        {
                            UserTypeId = 1,
                            UserTypeName = "Admin"
                        },
                        new
                        {
                            UserTypeId = 2,
                            UserTypeName = "User"
                        });
                });

            modelBuilder.Entity("KhotsoCBookStore.API.Entities.Book", b =>
                {
                    b.Property<int>("BookId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("BookID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("CoverFileName")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(10,2)");

                    b.Property<string>("Title")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.HasKey("BookId");

                    b.ToTable("Book");

                    b.HasData(
                        new
                        {
                            BookId = 1,
                            Author = "Charles",
                            Category = "Development",
                            CoverFileName = "",
                            Price = 300m,
                            Title = "Webdevelopment-101"
                        },
                        new
                        {
                            BookId = 2,
                            Author = "Kagiso",
                            Category = "Development",
                            CoverFileName = "",
                            Price = 300m,
                            Title = "Webdevelopment-101"
                        });
                });

            modelBuilder.Entity("KhotsoCBookStore.API.Entities.Cart", b =>
                {
                    b.Property<string>("CartId")
                        .HasMaxLength(36)
                        .IsUnicode(false)
                        .HasColumnType("varchar(36)");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    b.HasKey("CartId");

                    b.ToTable("Cart");
                });

            modelBuilder.Entity("KhotsoCBookStore.API.Entities.CartItems", b =>
                {
                    b.Property<int>("CartItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CartId")
                        .IsRequired()
                        .HasMaxLength(36)
                        .IsUnicode(false)
                        .HasColumnType("varchar(36)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("CartItemId")
                        .HasName("PK__CartItem__488B0B0AA0297D1C");

                    b.ToTable("CartItems");
                });

            modelBuilder.Entity("KhotsoCBookStore.API.Entities.Categories", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CategoryID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.HasKey("CategoryId")
                        .HasName("PK__Categori__19093A2B46B8DFC9");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            CategoryId = 1,
                            CategoryName = "Web Development"
                        },
                        new
                        {
                            CategoryId = 2,
                            CategoryName = "Programming"
                        },
                        new
                        {
                            CategoryId = 3,
                            CategoryName = "Databases"
                        },
                        new
                        {
                            CategoryId = 4,
                            CategoryName = "Administration"
                        });
                });

            modelBuilder.Entity("KhotsoCBookStore.API.Entities.CustomerOrderDetails", b =>
                {
                    b.Property<int>("OrderDetailsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("OrderId")
                        .IsRequired()
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(10,2)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("OrderDetailsId")
                        .HasName("PK__Customer__9DD74DBD81D9221B");

                    b.ToTable("CustomerOrderDetails");
                });

            modelBuilder.Entity("KhotsoCBookStore.API.Entities.CustomerOrders", b =>
                {
                    b.Property<string>("OrderId")
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<decimal>("CartTotal")
                        .HasColumnType("decimal(10,2)");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    b.HasKey("OrderId")
                        .HasName("PK__Customer__C3905BCF96C8F1E7");

                    b.ToTable("CustomerOrders");
                });

            modelBuilder.Entity("KhotsoCBookStore.API.Entities.Wishlist", b =>
                {
                    b.Property<string>("WishlistId")
                        .HasMaxLength(36)
                        .IsUnicode(false)
                        .HasColumnType("varchar(36)");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    b.HasKey("WishlistId");

                    b.ToTable("Wishlist");
                });

            modelBuilder.Entity("KhotsoCBookStore.API.Entities.WishlistItems", b =>
                {
                    b.Property<int>("WishlistItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<string>("WishlistId")
                        .IsRequired()
                        .HasMaxLength(36)
                        .IsUnicode(false)
                        .HasColumnType("varchar(36)");

                    b.HasKey("WishlistItemId")
                        .HasName("PK__Wishlist__171E21A16A5148A4");

                    b.ToTable("WishlistItems");
                });
#pragma warning restore 612, 618
        }
    }
}
