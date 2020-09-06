using myApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace myApi.Helpers
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> Paginar<T>(this IQueryable<T> queryable, int pagina, int cantidadMostrar)
        {
            return queryable
                .Skip((pagina - 1) * cantidadMostrar)
                .Take(cantidadMostrar);
        }
    }
}
