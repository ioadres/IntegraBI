using System;
using Common;
using Model.Entities;

namespace Service
{
	public static class UserMapper
	{

		public static ChartDto Map(Chart chart) {
			return new ChartDto() {
				ChartId = chart.Id,
				DateCreated = chart.DateCreated,
				Description = chart.Description,
				Name = chart.Name,
				Url = chart.Url,
				UserId = chart.UserId
			};
		}
		
		public static UserDto Map(User user)
		{
			return new UserDto()
			{
				UserId = user.Id.ToString(),
				Password = user.Password,
				Username = user.Username,
				Rol = new RolDto()
				{
					Id = user.Rol.Id,
					Name = user.Rol.Name
				},
				DateCreated = user.DateCreated,
                Lock = user.Lock,
                Role = user.Rol.Id.ToString(),
				Email = user.Email
			};
		}
		
	}
}
