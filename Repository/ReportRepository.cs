using Model.Entities;
using Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class ReportRepository : IReportRepository
    {
        public ReportRepository(AppDbContext context) : base(context)
        {
        }

        public override async Task<Report> Add(string name, int userId, string json)
        {
            return await Task.Run(() => {
                var report = this.Create();
                report.DateCreated = DateTime.Now;
                report.Name = name;
                report.Json = json;
                report.UserId = userId;
                this.Save(report);
                return report;
            });
        }
        
    }
}
