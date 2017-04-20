using Model.Entities;
using Repository.Contracts;
using System;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;
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

    }
}
