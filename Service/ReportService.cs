using Model.Entities;
using Repository.Contracts;
using Service.Contracts;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;

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

        public async Task<IEnumerable<ReportDto>> GetReports(int userId) {
            var result = await _report.GetReports(userId);
            return result;
        }

        public async Task<ReportDto> Get(int reportId) {
            var result = await _report.Load(reportId);
            return new ReportDto() {
                UserId = result.UserId,
                Name = result.Name,
                Json = result.Json,
                ReportId = result.Id,
                DateCreated = result.DateCreated
            };
        }

        public async Task<bool> Remove(int reportId) {
            return await _report.Remove(reportId);
        }

    }
}
