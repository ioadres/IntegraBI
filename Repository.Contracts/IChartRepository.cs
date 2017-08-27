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
        public abstract Task<Chart> Get(int userid);
		public abstract Task<ChartDto> Add(ChartDto model);

        public abstract Task<ChartDto> Update(ChartDto model);
        public abstract Task<IEnumerable<ChartDto>> GetAll();
        public abstract Task<bool> Remove(int userId);
        public abstract bool RemoveList(ICollection<Chart> list);
    }
}
