using EasyTicket.Models;
using EasyTicket.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyTicket.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController: ControllerBase
    {
        public readonly AppDbContext context;

        public UserController(AppDbContext con)
        {
            context = con;
        }
        [HttpPost]
        public IActionResult AddUser(User user)
        {
            if(ModelState.IsValid)
            {
                context.Add(user);
                context.SaveChanges();
                return Ok(user);
            }
            return BadRequest("Something went wrong");
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            List<User> users = context.Users.ToList();
            if (users != null)
            {
                return Ok(users);
            }

            return NotFound("No users were found!");
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            User theUser = context.Users.Find(id);
            if(theUser != null)
            {
                return Ok(theUser);
            }
            return NotFound("No user found with the given id");
        }

        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            if(id <= 0)
            {
                return BadRequest("Invalid input");
            }

            context.Remove(context.Users.Single(u => u.Id == id));
            context.SaveChanges();
            return Ok("Deleted user at id " + id);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id,[FromBody]User user)
        {
            //User theUser = context.Users.Find(user.Id);
            context.Users.Find(id).FirstName = user.FirstName;
            context.Users.Find(id).LastName = user.LastName;
            context.Users.Find(id).Address = user.Address;
            context.Users.Find(id).Username = user.Username;
            context.Users.Find(id).Password = user.Password;
            context.Users.Find(id).Email = user.Email;
            context.Users.Find(id).UserTickets = user.UserTickets;
            context.SaveChanges();
            return Ok(user + " was updated succesfully ");
        }
    }
}
