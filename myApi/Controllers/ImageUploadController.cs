using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace myApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        private static IWebHostEnvironment _enviroment;

        public ImageUploadController(IWebHostEnvironment enviroment)
        {
            _enviroment = enviroment;
        }

      /*  public class FileUPloadAPI
        {
            public IFormFile files { get; set; }
        }*/

        [HttpPost]
        public async Task<IActionResult> Post(IFormFile file)
        {
            bool isSaveSuccess = false;
            string error = null;
            string fileName = null;
            try
            {
                if (file.Length > 0)
                {

                    if(CheckIfExcelFile(file))
                    {
                        if (!Directory.Exists(_enviroment.WebRootPath + "\\Upload\\"))
                        {
                            Directory.CreateDirectory(_enviroment.WebRootPath + "\\Upload\\");
                        }

                        var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                        fileName = DateTime.Now.Ticks + extension; //Create a new Name for the file due to security reasons.

                        await using (FileStream fileStram = System.IO.File.Create(_enviroment.WebRootPath + "\\Upload\\" + fileName))
                        {
                            file.CopyTo(fileStram);
                            fileStram.Flush();

                            isSaveSuccess = true;
                            error = null;
                     //       return "\\Upload\\" + fileName;
                        }
                    }
                    else
                    {
                        isSaveSuccess = false;
                        error = "Incorrect Exctension";
                    }
                    
                }
                else
                {
                    isSaveSuccess = false;
                    error = "Failed"; 
               //     return "Failed";
                }
            }
            catch (Exception ex)
            {
                isSaveSuccess = false;
                error = ex.Message.ToString();
           //     return ex.Message.ToString();
            }

            return Ok(new { state = isSaveSuccess, err = error, fileName = fileName });
        }

        private bool CheckIfExcelFile(IFormFile file)
        {
            var xx = file.FileName;
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            return (extension == ".jpg" || extension == ".img" || extension == ".gif" || extension == ".png"
                || extension == ".JPG" || extension == ".IMG" || extension == ".GIF" || extension == ".PNG"); // Change the extension based on your need
        }

    }

}