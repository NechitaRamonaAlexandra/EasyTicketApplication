using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyTicket.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyTicket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserToTicketController : ControllerBase
    {
        public readonly AppDbContext context;

        public UserToTicketController(AppDbContext con)
        {
            context = con;
        }

        [HttpPost]
        public IActionResult AddUserTicket(int TicketId, int UserId)
        {
            UserToTicket userTicket = new UserToTicket();
            userTicket.TicketId = TicketId;
            userTicket.UserId = UserId;
            if (ModelState.IsValid)
            {
                context.Add(userTicket);
                context.SaveChanges();
                return Ok(userTicket);
            }
            return BadRequest("Something went wrong");
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            List<UserToTicket> usertickets = context.UserTickets.ToList();
            if (usertickets != null)
            {
                return Ok(usertickets);
            }

            return NotFound("No tickets were found!");
        }

        [HttpGet("{userId}")]
        public IActionResult GetTicketById(int userId)
        {
            List<UserToTicket> theTickets = context.UserTickets.Where(e => e.UserId == userId).ToList();
            if (theTickets != null)
            {
                return Ok(theTickets);
            }
            return NotFound("No tickets found with the given id");
        }

        [HttpDelete]
        public IActionResult DeleteTicket([FromQuery] int id, [FromQuery]int userId)
        {
            if (id <= 0 || userId < 0)
            {
                return BadRequest("Invalid input");
            }

            context.Remove(context.UserTickets.Single(u => u.TicketId == id && u.UserId == userId));
            context.SaveChanges();
            return Ok("Deleted ticket at id " + id);
        }

        /*[HttpPut("{id}")]
        public IActionResult UpdateUserTicket(int id, [FromBody]UserToTicket userticket)
        {
            context.UserTickets.Find(id).Price = ticket.Price;
            context.Tickets.Find(id).Event = ticket.Event;
            context.Tickets.Find(id).TicketUsers = ticket.TicketUsers;
            context.SaveChanges();
            return Ok(ticket + " was updated succesfully ");
        }*/
    }
}