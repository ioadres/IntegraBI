using Model.Entities;
using Repository.Contracts;
using Service.Contracts;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;

namespace Service
{
    public class ChartService : IChartService
    {
        private IChartRepository _chart;

        public ChartService(IChartRepository chart)
        {
            this._chart = chart;
        }

        public async Task<IEnumerable<ChartDto>> GetCharts(int userId) {
            var result = await _chart.GetCharts(userId);
            return result;
        }
    }
}
