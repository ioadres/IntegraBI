using System;

namespace Common
{
    public class TokenReportDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public int ReportId { get; set; }

        public ReportDto Report { get; set; }
    }
}