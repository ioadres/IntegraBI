using System;
using Common;
using Model.Entities;

namespace Service
{
	public static class UserMapper
	{

		public static UserDto Map(User user)
		{
			return new UserDto()
			{
				Id = user.Id,
				Password = user.Password,
				Username = user.Username,
				Rol = new RolDto()
				{
					Id = user.Rol.Id,
					Name = user.Rol.Name
				}
			};
		}
		
	}
}
