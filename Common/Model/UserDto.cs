using System;
namespace Common
{
	public class UserDto
	{

			public int Id
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

		public RolDto Rol
		{
			get;
			set;
		}
			
	}
}
