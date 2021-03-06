﻿using System;
using System.Threading.Tasks;
using Model.Entities;
using Repository.Contracts;
using Repository.Contracts.Helper;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Common;
using System.Collections.Generic;

namespace Repository
{
    public class UserRepository : IUserRepository
    {
        private IChartRepository _chartRepo;
        private IReportRepository _reportRepo;
        private ITokenReportRepository _reportTokenRepo;
        public UserRepository(AppDbContext context, IChartRepository chartRepo, IReportRepository reportRepo, ITokenReportRepository tokenReport) : base(context)
        {
            _chartRepo = chartRepo;
            _reportRepo = reportRepo;
            _reportTokenRepo = tokenReport;
        }

        public override async Task<UserDto> Add(UserDto model)
        {
            return await Task.Run(() =>
            {
                var user = this.Create();
                user.DateCreated = DateTime.Now;
                user.Username = model.Username;
                user.Email = model.Email;
                user.Lock = model.Lock;
                user.RolId = model.Rol.Id;
                user.Password = model.Password;
                if (this.Save(user))
                {
                    return model;
                }
                return null;
            });
        }

        public override async Task<IEnumerable<UserDto>> GetAll()
        {
            return await Task.Run(() =>
            {
                return this.Context.User.Select(x => new UserDto()
                {

                    UserId = x.Id.ToString(),
                    DateCreated = x.DateCreated,
                    Username = x.Username,
                    Lock = x.Lock,
                    Rol = ParseRol(x.Rol),
                    Email = x.Email
                });
            });
        }

        private RolDto ParseRol(Rol rol)
        {
            return new RolDto()
            {
                Id = rol.Id,
                Name = rol.Name
            };
        }

        public override async Task<User> Login(string username, string password)
        {
            return await Task.Run(() =>
            {
                return this.Context.User.Include(x => x.Rol).Where(x => x.Username == username && x.Password == password && x.Lock == false).FirstOrDefault();
            });
        }

        public override async Task<bool> Remove(int userId)
        {
            var entity = this.Context.User.Include(x => x.Chart).Include(x => x.Report).Where(x => x.Id == userId).FirstOrDefault();
            foreach (var item in entity.Report)
            {
                await _reportTokenRepo.Remove(item.Id);
            }
            _chartRepo.RemoveList(entity.Chart);
            _reportRepo.RemoveList(entity.Report);

            return this.Delete(entity, true);
        }

        public override async Task<User> Get(int userid)
        {
            return await Task.Run(() =>
            {
                return this.Context.User.Include(x => x.Rol).Where(x => x.Id == userid).FirstOrDefault();
            });
        }

        public override async Task<UserDto> Update(UserDto model)
        {
            var user = this.Context.User.Where(x => x.Id == int.Parse(model.UserId)).FirstOrDefault();
            return await Task.Run(() =>
            {
                user.Username = model.Username;
                user.Email = model.Email;
                user.Lock = model.Lock;
                user.RolId = model.Rol.Id;
                user.Password = model.Password;
                if (this.Save(user))
                {
                    return model;
                }
                return null;
            });
        }
    }
}
