using Model.Entities;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;

namespace Service.Contracts
{
    public interface IChartService
    {
        Task<IEnumerable<ChartDto>> GetCharts(int userId);        
    }
}
