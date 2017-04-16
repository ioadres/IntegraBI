using Model.Entities;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;

namespace Service.Contracts
{
    public interface IReportService
    {
        Task<Report> Add(ReportDto model);
        Task<Report> Update(ReportDto model);
        Task<IEnumerable<ReportDto>> GetReports(int userId);
        Task<ReportDto> Get(int reportId);
        Task<bool> Remove(int reportId);
        
    }
}
