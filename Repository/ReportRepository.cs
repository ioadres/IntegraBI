using Model.Entities;
using Repository.Contracts;
using System;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    public class ReportRepository : IReportRepository
    {
        public ITokenReportRepository _tokenReport
        {
            get;
            set;
        }

        public ReportRepository(AppDbContext context, ITokenReportRepository tokenReport) : base(context)
        {
            _tokenReport = tokenReport;
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

        public override async Task<IEnumerable<ReportDto>> GetReports(int userId) {
            return await Task.Run(() => {                
                return this.Context.Report.Where(x=>x.UserId == userId).Select(x=> new ReportDto() {
                    ReportId = x.Id,
                    UserId = userId,
                    DateCreated = x.DateCreated,
                    Name = x.Name,
                    Json = x.Json
                });
            });        
        }

        public override bool RemoveList(ICollection<Report> list)
        {                   
          return this.DeleteList(list, true);           
        }

        public override async Task<bool> Remove(int reportId, int userId)
        {
            return await Task.Run(async () => {   
                var entity = this.Context.Report.Where(x=> x.UserId.Equals(userId) && x.Id.Equals(reportId)).FirstOrDefault();
                if(entity != null) {
                    await _tokenReport.Remove(reportId);
                    return this.Delete(entity, true);        
                    
                }
                return false;
            });        
        }       
    }
}
