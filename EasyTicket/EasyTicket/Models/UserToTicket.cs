using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyTicket.Models
{
    public class UserToTicket
    {
        public int UserId {get; set;}
        public int TicketId { get; set; }

        public virtual User User { get; set; }

        public virtual Ticket Ticket { get; set; }


    }
}
