using Model.Entities;
using Repository.Contracts;
using System;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Repository
{
    public class ChartRepository : IChartRepository
    {
        public ChartRepository(AppDbContext context) : base(context)
        {
        }
        
        public override async Task<IEnumerable<ChartDto>> GetCharts(int userId) {
            return await Task.Run(() => {                
                return this.Context.Chart.Where(x=>x.UserId == userId).Select(x=> new ChartDto() {
                    ChartId = x.Id,
                    UserId = userId,
                    DateCreated = x.DateCreated,
                    Name = x.Name,
                    Description = x.Description,
                    Url = x.Url,
                });
            });        
        }

        public override async Task<ChartDto> Add(ChartDto model)
        {
             return await Task.Run(() => {
                var chart = this.Create();
                chart.DateCreated = DateTime.Now;
                chart.Name = model.Name;
                chart.Url = model.Url;
				chart.UserId =model.UserId;
				chart.Description =  model.Description;
                if(this.Save(chart)) {
                    return model;
                }                
                return null;
            });
        }

        public override async Task<IEnumerable<ChartDto>> GetAll()
        {
             return await Task.Run(() => {                
                return this.Context.Chart.Include(x=>x.User).Select(x=> new ChartDto() {
                    DateCreated = x.DateCreated,
                    Name = x.Name,
                    ChartId = x.Id,
                    Url = x.Url,
                    UserId =x.UserId,
                    Description =  x.Description,
                    NombreUsuario = x.User.Username
                });
            });        
        }

	 
        public override async Task<bool> Remove(int id)
        {
            return await Task.Run(() => {             
                var entity = this.Context.Chart.Where(x=> x.Id == id).FirstOrDefault();
                return this.Delete(entity, true);
            }); 
        }

        public override bool RemoveList(ICollection<Chart> list)
        {           
          return this.DeleteList(list, true);          
        }

        public override async Task<Chart> Get(int id) {
            return await Task.Run(()=> {
                return this.Context.Chart.FirstOrDefault(x=> x.Id == id);
            });
        }
        
        public override async Task<ChartDto> Update(ChartDto model)
        {
            var chart = this.Context.Chart.Where(x=> x.Id == model.ChartId).FirstOrDefault();
            return await Task.Run(() => {       
                chart.DateCreated = DateTime.Now;
                chart.Name = model.Name;
                chart.Url = model.Url;
				chart.UserId =model.UserId;
				chart.Description =  model.Description;
                if(this.Save(chart)) {
                    return model;
                }                
                return null;
            });
        }

    }
}
