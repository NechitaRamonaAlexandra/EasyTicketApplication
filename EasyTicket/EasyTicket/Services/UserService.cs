using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyTicket.Models;

namespace EasyTicket.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext context;

        public UserService(AppDbContext con)
        {
            context = con;
        }

        public void DeleteUser(int id)
        {

        }

        public User GetUser(int id)
        {
            throw new NotImplementedException();
        }

        public List<User> GetUsers()
        {
            return context.Users.ToList();
        }

        public void UpdateUser(int id, User updatedUser)
        {
            throw new NotImplementedException();
        }
    }
}
