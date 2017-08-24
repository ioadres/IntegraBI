using System;

namespace Common
{
	public class ChartDto
	{
		public string NombreUsuario { get; set; }
		public int UserId {get;set;}
		public int ChartId {get;set;}
		public DateTime? DateCreated {get;set;}
		public string Name
		{
			get;
			set;
		}

		public string Description
		{
			get;
			set;
		}

		public string Url
		{
			get;
			set;
		}
	}
}
