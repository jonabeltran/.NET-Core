using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using myApi.Contexts;
using myApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace myApi.Controllers
{
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CountryController : Controller
    {
        private readonly AppDbContext context;

        public CountryController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Country> Get()
        {
            return context.country.ToList();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Country Get(int id)
        {
            var pais = context.country.FirstOrDefault(p => p.id == id);
            return pais;
        }

        // POST api/<controller>
        [HttpPost]
        public ActionResult Post([FromBody]Country pais)
        {
            try
            {
                context.country.Add(pais);
                context.SaveChanges();
                return Ok();
            }catch(Exception e)
            {
                return BadRequest();
            }
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody]Country pais)
        {
            if(pais.id == id)
            {
                context.Entry(pais).State = EntityState.Modified;
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
            var pais = context.country.FirstOrDefault(p => p.id == id);
            if(pais!=null)
            {
                context.country.Remove(pais);
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
