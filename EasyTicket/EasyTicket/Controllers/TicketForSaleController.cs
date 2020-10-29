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
    public class TicketForSaleController : ControllerBase
    {
        public readonly AppDbContext context;

        public TicketForSaleController(AppDbContext con)
        {
            context = con;
        }

        [HttpPost]
        public IActionResult AddTicketForSale(TicketForSale myticket)
        {
            if (ModelState.IsValid)
            {
                context.Add(myticket);
                context.SaveChanges();
                return Ok(myticket);
            }
            return BadRequest("Something went wrong");
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            List<TicketForSale> tickets = context.ForSales.ToList();
            if (tickets != null) { 
                return Ok(tickets);
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

        [HttpGet("{id}")]
        public IActionResult GetEventForAdmin(int? id)
        {
            TicketForSale theTicket = context.ForSales.Find(id);
            //FromSqlRaw("Select * From dbo.Events where AdminId='{0}'", adminId).ToList();
            if (theTicket != null)
            {
                return Ok(theTicket);
            }
            return NotFound("No ticket for sale found with the given id");
        }

        [HttpDelete]
        public IActionResult DeleteEvent(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid input");
            }

            context.Remove(context.ForSales.Find(id));
            context.SaveChanges();
            return Ok("Deleted ticket for sale at id " + id);
        }

       /* [HttpPut("{id}")]
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
        }*/
    }
}