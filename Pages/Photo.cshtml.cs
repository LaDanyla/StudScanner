using IronOcr;
using IronSoftware.Drawing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Drawing;

namespace StudScanner.Pages
{
    [IgnoreAntiforgeryToken]
	public class PhotoModel : PageModel
    {
		public IActionResult OnPost()
        {
            var image = Request.Form.Files["image"];

			if (image != null)
            {
                try
                {
                    if (!Directory.Exists("Photos"))
                        Directory.CreateDirectory("Photos");

					string path = $@"Photos\{image.FileName}";

					using (var stream = new FileStream(path, FileMode.Create))
                    { 
                        image.CopyTo(stream);
					}
                     
                    var ocr = new IronTesseract();
					ocr.Language = OcrLanguage.Ukrainian; 
					string[] scannedText = new string[5];

                    using var wholeCard = new Bitmap(path); 
					int globalWidth = wholeCard.Width;
					int globalHeight = wholeCard.Height; 

					var contentAreas = new List<CropRectangle>
                    {
                        new CropRectangle(x: (int)(globalWidth * 0.001), y: (int)(globalHeight * 0.001), width: globalWidth * 1, height: (int)(globalHeight * 0.15)), // University
						new CropRectangle(x: (int)(globalWidth * 0.02), y: (int)(globalHeight * 0.175), width: (int)(globalWidth * 0.38), height: (int)(globalHeight * 0.075)), // Number
						new CropRectangle(x: (int)(globalWidth * 0.02), y: (int)(globalHeight * 0.487), width: (int)(globalWidth * 0.78), height: (int)(globalHeight * 0.08)), // Name
						new CropRectangle(x: (int)(globalWidth * 0.02), y: (int)(globalHeight * 0.61), width: (int)(globalWidth * 0.78), height: (int)(globalHeight * 0.125)), // Faculty
						new CropRectangle(x: (int)(globalWidth * 0.02), y: (int)(globalHeight * 0.76), width: (int)(globalWidth * 0.5), height: (int)(globalHeight * 0.075)) // Group
					}; 

					for (int i = 0; i < contentAreas.Count; i++)
                    {
                        OcrInput ocrInput = new(); 
						ocrInput.Add(path, contentAreas[i]);
						ocrInput.ToGrayScale(); 
						var page = ocr.Read(ocrInput); 
						scannedText[i] = string.IsNullOrEmpty(page.Text) ? "Текста нет" : page.Text;
						ocrInput.Dispose();
					}


                    TempData["ScannedText"] = scannedText; 

					return Page();

                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = "Ошибка123", error = ex.Message }); 
				}
            }

            return BadRequest("Ошибка");
        }
    }
}