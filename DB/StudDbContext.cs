    using System;
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;

    namespace StudScanner.DB;

    public partial class StudDbContext : DbContext
    {
        public StudDbContext()
        {
        }

        public StudDbContext(DbContextOptions<StudDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<StudTicket> StudTickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudTicket>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC07BA3CED4A");

                entity.Property(e => e.Faculty).HasMaxLength(250);
                entity.Property(e => e.FullName).HasMaxLength(250);
                entity.Property(e => e.Group).HasMaxLength(250);
                entity.Property(e => e.Number).HasMaxLength(50);
                entity.Property(e => e.University).HasMaxLength(250);
            });
        }
    }
