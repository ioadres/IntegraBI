using System;
namespace Common
{
	public class UserDto
	{

			public string Role
		{
			get;
			set;
		}

		public string UserId
		{
			get;
			set;
		}

		public string Username
		{
			get;
			set;
		}

		public string Password
		{
			get;
			set;
		}

		public DateTime? DateCreated { get; set; }
        public bool? Lock { get; set; }

		public RolDto Rol
		{
			get;
			set;
		}
			
		public string Email { get; set; }
	}
}
