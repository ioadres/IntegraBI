using System;
namespace Common
{
	public class SendReportDto
	{
		public int ReportId
		{
			get;
			set;
		}

		public string Emails
		{
			get;
			set;
		}

        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
    }
}
