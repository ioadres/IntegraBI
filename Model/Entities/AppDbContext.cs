using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Model.Entities
{
    public partial class AppDbContext : DbContext
    {
        public virtual DbSet<Profile> Profile { get; set; }
        public virtual DbSet<Rol> Rol { get; set; }
        public virtual DbSet<User> User { get; set; }

		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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
                    .HasConstraintName("FK__Profile__UserId__5BE2A6F2");
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
                    .HasConstraintName("FK__User__RolId__5EBF139D");
            });
        }
    }
}