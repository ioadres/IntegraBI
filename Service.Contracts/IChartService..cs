using Model.Entities;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;

namespace Service.Contracts
{
    public interface IChartService
    {
        Task<IEnumerable<ChartDto>> GetCharts(int userId);        
        Task<ChartDto> Add(ChartDto model);
        Task<ChartDto> Update(ChartDto model);
        Task<IEnumerable<ChartDto>> GetAll();
        Task<ChartDto> Get(int id);
        Task<bool> Remove(int id);
    }
}
