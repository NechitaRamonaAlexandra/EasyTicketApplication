using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EasyTicket.Models
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }
        public int Price { get; set; }
        
        public Event Event { get; set; }

        public virtual List<UserToTicket> TicketUsers { get; set; }
    }
}
