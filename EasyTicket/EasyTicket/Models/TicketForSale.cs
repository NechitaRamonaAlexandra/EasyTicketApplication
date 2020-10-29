using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EasyTicket.Models
{
    public class TicketForSale
    {
        [Key]
        public int Id { get; set; }
        public int userId { get; set; }
        public string ticketName { get; set; }
        public int Price { get; set; }
        public User Owner { get; set; }
    }
}
