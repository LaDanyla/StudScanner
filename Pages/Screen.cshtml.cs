using IronOcr;
using IronSoftware.Drawing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Drawing;
using System.Text.RegularExpressions;

namespace StudScanner.Pages
{
    [IgnoreAntiforgeryToken] 
	public class ScreenModel : PageModel
	{ 
		public IActionResult OnPost() 
        {
            var image = Request.Form.Files["image"];  

			if (image != null)
            {
                try
                {
                    if (!Directory.Exists("Screenshots"))
                        Directory.CreateDirectory("Screenshots");

                    string path = $@"Screenshots\{image.FileName}"; 

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        image.CopyTo(stream); 
					}
                    

                    var ocr = new IronTesseract(); 
					ocr.Language = OcrLanguage.Ukrainian; 
					string[] scannedText = new string[5];

                    using Bitmap wholeCard = new(path); 
					int globalWidth = wholeCard.Width; 
					int globalHeight = wholeCard.Height; 

					CropRectangle cropRectangle = new(0, (int)(globalHeight * 0.6), globalWidth, (int)(globalHeight * 0.6));

					OcrInput ocrInput = new(); 
					ocrInput.Add(wholeCard, cropRectangle);

					var result = ocr.Read(ocrInput);  

					scannedText[0] = result.Lines[4].Text + " " + result.Lines[5].Text;
                    scannedText[1] = Regex.Match(result.Lines[0].Text, "[А-Я]{2}\\s\\d+").Groups[0].Value;
                    scannedText[2] = result.Lines[1].Text + " " + result.Lines[2].Text + " " + result.Lines[3].Text;
                    scannedText[3] = result.Lines[6].Text;
                    scannedText[4] = ""; 

					TempData["ScannedText"] = scannedText; 

					return Page();
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = "Ошибка", error = ex.Message }); 
				}
            }

            return BadRequest("Ошибка: Файл не получен");
        }
    }
}
