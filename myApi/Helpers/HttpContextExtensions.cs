using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace myApi.Helpers
{
    public static class HttpContextExtensions
    {
        public static async Task InsertarParametrosPaginacionEnRespuesta<T>(this HttpContext context,
            IQueryable<T> queryable, int cantidadRegistrosMostrar)
        {
            if(context==null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            double conteo = await queryable.CountAsync();
            double totalPaginas = Math.Ceiling(conteo / cantidadRegistrosMostrar);
            context.Response.Headers.Add("totalPaginas", totalPaginas.ToString());
            context.Response.Headers.Add("cantRegistros", conteo.ToString());

           /* HttpContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Headers", "*");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
            HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:4200"); */
            context.Response.Headers.Add("Access-Control-Expose-Headers", "totalPaginas, cantRegistros");
           // context.Response.Headers.Add("Access-Control-Expose-Headers", "cantRegistros");

        }
    }
}
