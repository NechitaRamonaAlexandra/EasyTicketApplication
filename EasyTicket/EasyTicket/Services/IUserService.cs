using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyTicket.Models;

namespace EasyTicket.Services
{
    interface IUserService
    {
        List<User> GetUsers();

        User GetUser(Int32 id);

        void UpdateUser(Int32 id, User updatedUser);

        void DeleteUser(Int32 id);
    }
}
