using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myApi.Contexts;
using myApi.Helpers;
using myApi.Models;

namespace myApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class GaleryController : Controller
    {
        private readonly AppDbContext context;
        public GaleryController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Galery>>> get([FromQuery] int id_user, [FromQuery] int pagina, [FromQuery] int cantidadMostrar)
        {
            var queryable = context.galery.Where(p => p.id_user == id_user).AsQueryable();
            await HttpContext.InsertarParametrosPaginacionEnRespuesta(queryable, cantidadMostrar);

            return await queryable.Paginar(pagina, cantidadMostrar).ToListAsync();

      

            //return context.galery.Where(p => p.id_user == id_user).ToList();

            // public async IEnumerable<Galery> get([FromQuery] int id_user, [FromQuery] Paginacion paginacion)
        }

        [HttpGet("{id}")]
        public Galery Get(int id)
        {
            var galery = context.galery.FirstOrDefault(p => p.id == id);
            return galery;
        }

        [HttpPost]
        public ActionResult Post([FromBody]Galery galery)
        {
            try
            {
                context.galery.Add(galery);
                context.SaveChanges();
                return Ok(new { id= galery.id, status= true });
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody]Galery galery)
        {
            if (galery.id == id)
            {
                context.Entry(galery).State = EntityState.Modified;
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var galery = context.galery.FirstOrDefault(p => p.id == id);
            if (galery != null)
            {
                context.galery.Remove(galery);
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