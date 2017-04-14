using Model.Entities;
using System.Threading.Tasks;
using Common;

namespace Service.Contracts
{
    public interface IReportService
    {
        Task<Report> Add(ReportDto model);
        Task<Report> Update(ReportDto model);
        
    }
}
