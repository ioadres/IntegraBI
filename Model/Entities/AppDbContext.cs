using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Model.Entities
{
    public partial class AppDbContext : DbContext
    {
        public virtual DbSet<Chart> Chart { get; set; }
        public virtual DbSet<Profile> Profile { get; set; }
        public virtual DbSet<Report> Report { get; set; }
        public virtual DbSet<Rol> Rol { get; set; }
        public virtual DbSet<User> User { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Chart>(entity =>
            {
                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.Description).HasColumnType("varchar(max)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Url).HasColumnType("varchar(max)");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Chart)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__Chart__UserId__4E88ABD4");
            });

            modelBuilder.Entity<Profile>(entity =>
            {
                entity.Property(e => e.Avatar)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Birthday).HasColumnType("date");

                entity.Property(e => e.FacebookUrl)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Surname1)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Surname2)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.TwitterUrl)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Profile)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Profile__UserId__3D5E1FD2");
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.Json)
                    .HasColumnName("JSON")
                    .HasColumnType("varchar(max)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Report)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__Report__UserId__4AB81AF0");
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(255)");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.HasOne(d => d.ProfileNavigation)
                    .WithMany(p => p.UserNavigation)
                    .HasForeignKey(d => d.ProfileId)
                    .HasConstraintName("FK_Profile_User");

                entity.HasOne(d => d.Rol)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.RolId)
                    .HasConstraintName("FK__User__RolId__4316F928");
            });
        }
    }
}