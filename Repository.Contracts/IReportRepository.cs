using Model.Entities;
using Repository.Contracts.Helper;
using System.Threading.Tasks;
using Common;

namespace Repository.Contracts
{
    public abstract class IReportRepository : EntityFrameworkRepository<AppDbContext, Report>
    {
        public IReportRepository(AppDbContext context) : base(context)
        {
        }

        public abstract Task<Report> Add(ReportDto model);

        public abstract Task<Report> Update(ReportDto model);
    }
}
