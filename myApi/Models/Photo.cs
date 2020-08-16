using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace myApi.Models
{
    public class Photo
    {
        public string name { get; set; }
        public IFormFile photo { get; set; }
    }
}
