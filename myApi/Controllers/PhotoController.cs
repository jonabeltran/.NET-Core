using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using myApi.Models;
using Newtonsoft.Json;

namespace myApi.Controllers
{

    public class PhotoController : Controller
    {
       [HttpPost("upload")]
       [ProducesResponseType(StatusCodes.Status200OK)]
       [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
       public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (CheckIfExcelFile(file))
            {
                IActionResult dataFile = await WriteFile(file);
                return dataFile;
            }
            else
            {
                return BadRequest(new { message = "Invalid file extension" });
            }



          //  return Ok();
           
        }

        /// <summary>
        /// Method to check if file is excel file
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        private bool CheckIfExcelFile(IFormFile file)
        {
            var xx = file.FileName;
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            return (extension == ".jpg" || extension == ".img" || extension == ".gif" || extension == ".png"
                || extension == ".JPG" || extension == ".IMG" || extension == ".GIF" || extension == ".PNG"); // Change the extension based on your need
        }

        private async Task<IActionResult> WriteFile(IFormFile file)
        {
            bool isSaveSuccess = false;
            string fileName = null;
            string error;
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                fileName = DateTime.Now.Ticks + extension; //Create a new Name for the file due to security reasons.

                var pathBuilt = Path.Combine(Directory.GetCurrentDirectory(), "Images");

               /* if (!Directory.Exists(pathBuilt))
                {
                    Directory.CreateDirectory(pathBuilt);
                }*/

                var path = Path.Combine(Directory.GetCurrentDirectory(), "Images",
                   fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                isSaveSuccess = true;
                error = null;
            }
            catch (Exception e)
            {
                //log error
                isSaveSuccess = false;
                error = e.Message;
            }

            // return isSaveSuccess;
           /* Result r = new Result;
            r.state = isSaveSuccess;
            r.err = error;
            r.fileName = fileName;*/

            return Ok(new { state = isSaveSuccess, err = error, fileName = fileName });
        }


        public class Result
        {
            public bool state { get; set; }
            public string err { get; set; }
            public string fileName { get; set; }
        }


    }
}