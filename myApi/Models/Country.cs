using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace myApi.Models
{
    public class Country
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public int habitans { get; set; }
    }
}
