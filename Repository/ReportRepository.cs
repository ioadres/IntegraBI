using Model.Entities;
using Repository.Contracts;
using System;
using System.Threading.Tasks;
using Common;

namespace Repository
{
    public class ReportRepository : IReportRepository
    {
        public ReportRepository(AppDbContext context) : base(context)
        {
        }

        public override async Task<Report> Add(ReportDto model)
        {
            return await Task.Run(() => {
                var report = this.Create();
                report.DateCreated = DateTime.Now;
                report.Name = model.Name;
                report.Json = model.Json;
                report.UserId = model.UserId;
                if(this.Save(report)) {
                    return report;
                }                
                return null;
            });
        }

        public override async Task<Report> Update(ReportDto model)
        {
            var report = await this.Load(model.ReportId);
            return await Task.Run(() => {                
                report.Name = model.Name;
                report.Json = model.Json;
                if(this.Save(report)) {
                    return report;
                }                
                return null;
            });
        }
        
    }
}
