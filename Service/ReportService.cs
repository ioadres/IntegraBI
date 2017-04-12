using Model.Entities;
using Repository.Contracts;
using Service.Contracts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class ReportService : IReportService
    {
        private IReportRepository _report;

        public ReportService(IReportRepository report)
        {
            this._report = report;
        }

        public async Task<Report> Add(string name, int userId, string json)
        {
            var result = await _report.Add(name, userId, json);
            return result;
        }

    }
}
