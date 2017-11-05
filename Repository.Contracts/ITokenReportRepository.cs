using Model.Entities;
using Repository.Contracts.Helper;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;
using System;
using System.Globalization;

namespace Repository.Contracts
{
    public abstract class ITokenReportRepository : EntityFrameworkRepository<AppDbContext, TokenReport>
    {
        public ITokenReportRepository(AppDbContext context) : base(context)
        {
        }
        public abstract Task<TokenReport> Add(TokenReportDto model);
        public abstract Task<bool> Remove(string mail, int reportId);
        public abstract Task<bool> Remove(int reportId);
        public abstract Task<bool> Valid(string mail, int reportId, DateTime dateStart, DateTime dateEnd);

    }
}
