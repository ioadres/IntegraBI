using Model.Entities;
using Repository.Contracts.Helper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Contracts
{
    public abstract class IReportRepository : EntityFrameworkRepository<AppDbContext, Report>
    {
        public IReportRepository(AppDbContext context) : base(context)
        {
        }

        public abstract Task<Report> Add(string name, int userId, string json);
    }
}
