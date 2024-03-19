using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using StudScanner.DB;
using StudScanner.DTO;

namespace StudScanner.Pages
{
    [IgnoreAntiforgeryToken]
	public class EndModel : PageModel
    {
		private readonly StudDbContext db;
		public EndModel(StudDbContext dbContext)
        {
            db = dbContext; 
		}
		public void OnPost([FromBody] StudTicketDto data) 
        {
			db.StudTickets.Add(new()
            {
                Number = data.Number,
                Faculty = data.Faculty,
                FullName = data.FullName,
                Group = data.Group,
                University = data.University
            });

			db.SaveChanges();
        }
    }
}
