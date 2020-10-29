using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyTicket.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyTicket.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        public readonly AppDbContext context;

        public TicketController(AppDbContext con)
        {
            context = con;
        }

        [HttpPost]
        public IActionResult AddTicket(Ticket ticket)
        {
            if (ModelState.IsValid)
            {
                context.Add(ticket);
                context.SaveChanges();
                return Ok(ticket);
            }
            return BadRequest("Something went wrong");
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            List<Ticket> tickets = context.Tickets.ToList();
            if (tickets != null)
            {
                return Ok(tickets);
            }

            return NotFound("No tickets were found!");
        }

        [HttpGet("{id}")]
        public IActionResult GetTicketById(int id)
        {
            Ticket theTicket = context.Tickets.Find(id);
            if (theTicket != null)
            {
                return Ok(theTicket);
            }
            return NotFound("No ticket found with the given id");
        }

        [HttpDelete]
        public IActionResult DeleteTicket(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid input");
            }

            context.Remove(context.Tickets.Single(u => u.Id == id));
            context.SaveChanges();
            return Ok("Deleted ticket at id " + id);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTicket(int id, [FromBody]Ticket ticket)
        {
            context.Tickets.Find(id).Price = ticket.Price;
            context.Tickets.Find(id).Event = ticket.Event;
            context.Tickets.Find(id).TicketUsers = ticket.TicketUsers;
            context.SaveChanges();
            return Ok(ticket + " was updated succesfully ");
        }
    }
}