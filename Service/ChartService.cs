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

        public async Task<ChartDto> Add(ChartDto model)
        {
            var result = await _chart.Add(model);
            return result;
        }

        public async  Task<ChartDto> Update(ChartDto model)
        {
            var result = await _chart.Update(model);
            return result;
        }

        public async  Task<IEnumerable<ChartDto>> GetAll()
        {
            var result = await _chart.GetAll();
            return result;
        }

        public async Task<ChartDto> Get(int id)
        {
             var result = await _chart.Get(id);
            return UserMapper.Map(result);
        }

        public async  Task<bool> Remove(int id) {
            return await _chart.Remove(id);
        }
    }
}
