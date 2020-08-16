using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myApi.Contexts;
using myApi.Models;
using myApi.Functions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace myApi.Controllers
{
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly AppDbContext context;

        public UsersController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Users> Get()
        {
            return context.users.ToList();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Users Get(int id)
        {
            var user = context.users.FirstOrDefault(p => p.id == id);
            return user;
        }

        // POST api/<controller>
        [HttpPost]
        public ActionResult Post([FromBody]Users user)
        {
            try
            {
                user.password = Functions.Functions.GetSHA256(user.password);
                context.users.Add(user);
                context.SaveChanges();
                return Ok();
            }catch(Exception e)
            {
                return BadRequest();
            }
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody]Users user)
        {
            if(user.id==id)
            {
                user.password = Functions.Functions.GetSHA256(user.password);
                context.Entry(user).State = EntityState.Modified;
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var user = context.users.FirstOrDefault(p => p.id == id);
            if(user!=null)
            {
                context.users.Remove(user);
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


    }
}
