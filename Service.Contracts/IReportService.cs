using Model.Entities;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;
using System;

namespace Service.Contracts
{
    public interface IReportService
    {
        Task<Report> Add(ReportDto model);
        Task<Report> Update(ReportDto model);
        Task<IEnumerable<ReportDto>> GetReports(int userId);
        Task<ReportDto> Get(int reportId);
        Task<bool> SendReport(int reportId, string emails, DateTime dateStart, DateTime dateEnd);
        Task<bool> Remove(int reportId, int userId);        
    }
}
