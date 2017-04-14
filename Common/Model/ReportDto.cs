using System;

namespace Common
{
	public class ReportDto
	{
		public int UserId {get;set;}
		public int ReportId {get;set;}
		public DateTime? DateCreated {get;set;}
		public string Name
		{
			get;
			set;
		}

		public string Json
		{
			get;
			set;
		}
	}
}
