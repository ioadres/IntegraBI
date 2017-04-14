using Model.Entities;
using Repository.Contracts;
using Service.Contracts;
using System.Threading.Tasks;
using Common;

namespace Service
{
    public class ReportService : IReportService
    {
        private IReportRepository _report;

        public ReportService(IReportRepository report)
        {
            this._report = report;
        }

        public async Task<Report> Add(ReportDto model)
        {
            var result = await _report.Add(model);
            return result;
        }

        public async Task<Report> Update(ReportDto model)
        {
            var result = await _report.Update(model);
            return result;
        }

    }
}
