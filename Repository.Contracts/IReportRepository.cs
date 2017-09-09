using Model.Entities;
using Repository.Contracts.Helper;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;

namespace Repository.Contracts
{
    public abstract class IReportRepository : EntityFrameworkRepository<AppDbContext, Report>
    {
        public IReportRepository(AppDbContext context) : base(context)
        {
        }

        public abstract Task<Report> Add(ReportDto model);

        public abstract Task<Report> Update(ReportDto model);
        public abstract Task<IEnumerable<ReportDto>> GetReports(int userId);
        public abstract Task<bool> Remove(int reportId, int userId);
        public abstract bool RemoveList(ICollection<Report> list);

    }
}
