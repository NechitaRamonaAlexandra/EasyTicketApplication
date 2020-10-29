using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyTicket.Models;
using Microsoft.AspNetCore.Mvc;


namespace EasyTicket.Controllers
{
    [Route("api/admins")]
    [ApiController]
    public class AdminController : Controller
    {
        public readonly AppDbContext context;

        public AdminController(AppDbContext con)
        {
            context = con;
        }

        [HttpGet]
        public IActionResult getAllAdmins()
        {
            List<Admin> admins = context.Admins.ToList();
            if(admins != null)
            {
                return Ok(admins);
            }

            return NotFound("There were no admins in the db");
        }

        [HttpPost]
        public IActionResult AddAdmin(Admin admin)
        {
            if(ModelState.IsValid)
            {
                context.Add(admin);
                context.SaveChanges();
                return Ok(admin);
            }
            else
            {
                return BadRequest("Invalid Data");
            }
        }


        [HttpDelete]
        public IActionResult DeleteAdmin(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid input");
            }

            context.Remove(context.Admins.Single(u => u.Id == id));
            context.SaveChanges();
            return Ok("Deleted user at id " + id);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAdmin(int id, [FromBody]Admin admin)
        {
            //User theUser = context.Users.Find(user.Id);
            context.Admins.Find(id).FirstName = admin.FirstName;
            context.Admins.Find(id).LastName = admin.LastName;
            context.Admins.Find(id).Organization = admin.Organization;
            context.Admins.Find(id).Username = admin.Username;
            context.Admins.Find(id).Password = admin.Password;
            context.Admins.Find(id).Email = admin.Email;
            context.Admins.Find(id).Events = admin.Events;
            context.SaveChanges();
            return Ok(admin + " was updated succesfully ");
        }

    }
}