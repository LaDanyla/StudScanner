using Microsoft.AspNetCore.Mvc.RazorPages;

namespace StudScanner.Pages
{
    public class ScreenFormModel : PageModel
    {
		public string[] ScannedText { get; set; }

		public void OnGet()
        {
			if (TempData.ContainsKey("ScannedText"))
            {
				ScannedText = TempData["ScannedText"] as string[];

				for (int i = 0; i < ScannedText.Length; i++)
                {
                    ScannedText[i] = ScannedText[i].Trim();
                }

				TempData.Remove("ScannedText");
            }
        }
    }
}
