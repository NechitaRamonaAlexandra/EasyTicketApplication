using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyTicket.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EasyTicket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        public readonly AppDbContext context;

        public EventController(AppDbContext con)
        {
            context = con;
        }

        [HttpPost]
        public IActionResult AddEvent(Event myevent)
        {
            if (ModelState.IsValid)
            {
                context.Add(myevent);
                context.SaveChanges();
                return Ok(myevent);
            }
            return BadRequest("Something went wrong");
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            List<Event> events = context.Events.ToList();
            if (events != null)
            {
                return Ok(events);
            }

            return NotFound("No events were found!");
        }

        /*[HttpGet("{id}")]
        public IActionResult GetEvent(int id)
        {
            Event theEvent = context.Events.Find(id);
            if (theEvent != null)
            {
                return Ok(theEvent);
            }
            return NotFound("No event found with the given id");
        }*/

        [HttpGet("{adminId}")]
        public IActionResult GetEventForAdmin(int? adminId)
        {
            List<Event> theEvents = context.Events.Where(e => e.AdminId == adminId).ToList();
                //FromSqlRaw("Select * From dbo.Events where AdminId='{0}'", adminId).ToList();
            if (theEvents != null)
            {
                return Ok(theEvents);
            }
            return NotFound("No events found with the given admin id");
        }

        [HttpDelete]
        public IActionResult DeleteEvent(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid input");
            }

            context.Remove(context.Events.Single(u => u.Id == id));
            context.SaveChanges();
            return Ok("Deleted event at id " + id);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEvent(int id, [FromBody]Event myevent)
        {
            context.Events.Find(id).Name = myevent.Name;
            context.Events.Find(id).Tickets = myevent.Tickets;
            context.Events.Find(id).TicketNo = myevent.TicketNo;
            context.Events.Find(id).StartTime = myevent.StartTime;
            context.Events.Find(id).StopTime = myevent.StopTime;
            context.Events.Find(id).Admin = myevent.Admin;
            context.Events.Find(id).AdminId = myevent.AdminId;
            context.Events.Find(id).TicketPrice = myevent.TicketPrice;
            context.SaveChanges();
            return Ok(myevent + " was updated succesfully ");
        }
    }
}