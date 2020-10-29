using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EasyTicket.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }
        public int AdminId { get; set; }
        public string Organization { get; set; }
        public Admin Admin { get; set; }
        public string Name { get; set; }
        public string Venue { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime StopTime { get; set; }
        public int TicketNo { get; set; }
        public List<Ticket> Tickets { get; set; }
        public int TicketPrice { get; set; }
    }
}
