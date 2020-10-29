using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EasyTicket.Models
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<UserToTicket> UserTickets { get; set; }
        public DbSet<TicketForSale> ForSales { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserToTicketConfiguration());
            modelBuilder.ApplyConfiguration(new TicketEventConfiguration());
            modelBuilder.ApplyConfiguration(new AdminEventConfiguration());
            modelBuilder.ApplyConfiguration(new UserSaleConfiguration());
        }

    }
    public class UserToTicketConfiguration : IEntityTypeConfiguration<UserToTicket>
    {
        public void Configure(EntityTypeBuilder<UserToTicket> userTicket)
        {
            userTicket.HasKey(t => new { t.UserId, t.TicketId });

            userTicket.HasOne(x => x.User).WithMany(x => x.UserTickets).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Restrict);
            userTicket.HasOne(x => x.Ticket).WithMany(x => x.TicketUsers).HasForeignKey(x => x.TicketId).OnDelete(DeleteBehavior.Restrict);
        }
    }

    public class AdminEventConfiguration : IEntityTypeConfiguration<Admin>
    {
        public void Configure(EntityTypeBuilder<Admin> admin)
        {
            admin.HasMany(a => a.Events).WithOne(e => e.Admin).OnDelete(DeleteBehavior.Restrict);
        }
    }

    public class TicketEventConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> myEvent)
        {
            myEvent.HasMany(a => a.Tickets).WithOne(e => e.Event).OnDelete(DeleteBehavior.Restrict);
        }
    }

    public class UserSaleConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> user)
        {
            user.HasMany(a => a.SaleTickets).WithOne(e => e.Owner).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
