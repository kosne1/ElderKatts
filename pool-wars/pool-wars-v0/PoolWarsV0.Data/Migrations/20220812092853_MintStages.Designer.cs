﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using PoolWarsV0.Data;

#nullable disable

namespace PoolWarsV0.Data.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20220812092853_MintStages")]
    partial class MintStages
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("PoolWarsV0.Data.Models.CardMetadataDao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CardMintId")
                        .HasColumnType("integer");

                    b.Property<int>("Strength")
                        .HasColumnType("integer");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CardMintId")
                        .IsUnique();

                    b.ToTable("CardMetadata");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.MintStageDao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Stage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("StartsAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("Stage")
                        .IsUnique();

                    b.ToTable("MintStages");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolDao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PoolWarId")
                        .HasColumnType("integer");

                    b.Property<string>("PrivateKey")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Address")
                        .IsUnique();

                    b.HasIndex("PoolWarId");

                    b.HasIndex("PrivateKey")
                        .IsUnique();

                    b.ToTable("Pools");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolDepositDao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CardMetadataId")
                        .HasColumnType("integer");

                    b.Property<int>("PoolId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CardMetadataId");

                    b.HasIndex("UserId");

                    b.HasIndex("PoolId", "CardMetadataId")
                        .IsUnique();

                    b.ToTable("Deposits");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolWarDao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime>("End")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("PoolWars");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolWarResultDao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("PoolWarId")
                        .HasColumnType("integer");

                    b.Property<int>("WinnerPoolId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PoolWarId")
                        .IsUnique();

                    b.HasIndex("WinnerPoolId")
                        .IsUnique();

                    b.ToTable("PoolWarsResults");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PrismaUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AuthCode")
                        .HasColumnType("text")
                        .HasColumnName("auth_code");

                    b.Property<string>("AuthToken")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("auth_token");

                    b.Property<DateTime>("AuthTokenCreated")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("auth_token_created");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("DiscordAuthToken")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("discord_auth_token");

                    b.Property<string>("TwitterNickname")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("twitter_nickname");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<string>("WalletAddress")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("wallet_address");

                    b.HasKey("Id");

                    b.HasIndex("AuthToken")
                        .IsUnique();

                    b.HasIndex("WalletAddress")
                        .IsUnique();

                    b.ToTable("User");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.ResultUserLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ResultId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ResultId");

                    b.HasIndex("UserId", "ResultId")
                        .IsUnique();

                    b.ToTable("ResultUserLinks");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.SolanaAddress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Address")
                        .IsUnique();

                    b.ToTable("Addresses");

                    b.HasDiscriminator<string>("Discriminator").HasValue("SolanaAddress");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.UserEvent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Time")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserEvents");

                    b.HasDiscriminator<string>("Discriminator").HasValue("UserEvent");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.UserResultCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CardId")
                        .HasColumnType("integer");

                    b.Property<bool>("Given")
                        .HasColumnType("boolean");

                    b.Property<int>("LinkId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CardId");

                    b.HasIndex("LinkId", "CardId")
                        .IsUnique();

                    b.ToTable("UserResultCards");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.AllowedCreatorAddress", b =>
                {
                    b.HasBaseType("PoolWarsV0.Data.Models.SolanaAddress");

                    b.HasDiscriminator().HasValue("AllowedCreatorAddress");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.CardMintAddress", b =>
                {
                    b.HasBaseType("PoolWarsV0.Data.Models.SolanaAddress");

                    b.HasDiscriminator().HasValue("CardMintAddress");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolUserDao", b =>
                {
                    b.HasBaseType("PoolWarsV0.Data.Models.SolanaAddress");

                    b.HasDiscriminator().HasValue("PoolUserDao");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolWarEventDao", b =>
                {
                    b.HasBaseType("PoolWarsV0.Data.Models.UserEvent");

                    b.Property<string>("Cards")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PoolAddress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Result")
                        .HasColumnType("integer");

                    b.Property<string>("TakenCards")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasDiscriminator().HasValue("PoolWarEventDao");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.SwapEventDao", b =>
                {
                    b.HasBaseType("PoolWarsV0.Data.Models.UserEvent");

                    b.Property<string>("InputCards")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("OutputCard")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasDiscriminator().HasValue("SwapEventDao");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.CardMetadataDao", b =>
                {
                    b.HasOne("PoolWarsV0.Data.Models.CardMintAddress", "CardMint")
                        .WithMany()
                        .HasForeignKey("CardMintId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CardMint");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolDao", b =>
                {
                    b.HasOne("PoolWarsV0.Data.Models.PoolWarDao", "PoolWar")
                        .WithMany("Pools")
                        .HasForeignKey("PoolWarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PoolWar");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolDepositDao", b =>
                {
                    b.HasOne("PoolWarsV0.Data.Models.CardMetadataDao", "CardMetadata")
                        .WithMany()
                        .HasForeignKey("CardMetadataId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PoolWarsV0.Data.Models.PoolDao", "Pool")
                        .WithMany("Deposits")
                        .HasForeignKey("PoolId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PoolWarsV0.Data.Models.PoolUserDao", "User")
                        .WithMany("Deposits")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CardMetadata");

                    b.Navigation("Pool");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolWarResultDao", b =>
                {
                    b.HasOne("PoolWarsV0.Data.Models.PoolWarDao", "PoolWar")
                        .WithOne("Result")
                        .HasForeignKey("PoolWarsV0.Data.Models.PoolWarResultDao", "PoolWarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PoolWarsV0.Data.Models.PoolDao", "WinnerPool")
                        .WithMany()
                        .HasForeignKey("WinnerPoolId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PoolWar");

                    b.Navigation("WinnerPool");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.ResultUserLink", b =>
                {
                    b.HasOne("PoolWarsV0.Data.Models.PoolWarResultDao", "Result")
                        .WithMany("Users")
                        .HasForeignKey("ResultId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PoolWarsV0.Data.Models.PoolUserDao", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Result");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.UserEvent", b =>
                {
                    b.HasOne("PoolWarsV0.Data.Models.PoolUserDao", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.UserResultCard", b =>
                {
                    b.HasOne("PoolWarsV0.Data.Models.CardMetadataDao", "Card")
                        .WithMany()
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PoolWarsV0.Data.Models.ResultUserLink", "Link")
                        .WithMany("Cards")
                        .HasForeignKey("LinkId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Card");

                    b.Navigation("Link");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolDao", b =>
                {
                    b.Navigation("Deposits");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolWarDao", b =>
                {
                    b.Navigation("Pools");

                    b.Navigation("Result");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolWarResultDao", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.ResultUserLink", b =>
                {
                    b.Navigation("Cards");
                });

            modelBuilder.Entity("PoolWarsV0.Data.Models.PoolUserDao", b =>
                {
                    b.Navigation("Deposits");
                });
#pragma warning restore 612, 618
        }
    }
}
