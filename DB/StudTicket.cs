namespace StudScanner.DB;

public partial class StudTicket
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public string University { get; set; } = null!;

    public string Faculty { get; set; } = null!;

    public string Group { get; set; } = null!;

    public string Number { get; set; } = null!;
}
