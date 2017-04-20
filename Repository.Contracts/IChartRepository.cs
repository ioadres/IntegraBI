using Model.Entities;
using Repository.Contracts.Helper;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;

namespace Repository.Contracts
{
    public abstract class IChartRepository : EntityFrameworkRepository<AppDbContext, Chart>
    {
        public IChartRepository(AppDbContext context) : base(context)
        {
        }

        public abstract Task<IEnumerable<ChartDto>> GetCharts(int userId);
    }
}
