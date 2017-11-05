using Model.Entities;
using Repository.Contracts;
using System;
using System.Globalization;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    public class TokenReportRepository : ITokenReportRepository
    {
        public TokenReportRepository(AppDbContext context) : base(context)
        {
        }

        public override async Task<TokenReport> Add(TokenReportDto model)
        {
            return await Task.Run(() => {
                var tokenReport = this.Create();
                tokenReport.Email = model.Email;
                tokenReport.DateStart = model.DateStart;
                tokenReport.DateEnd = model.DateEnd;
                tokenReport.ReportId = model.ReportId;
                if(this.Save(tokenReport)) {
                    return tokenReport;
                }                
                return null;
            });
        }        

        public override async Task<bool> Remove(string email, int reportId)
        {
            return await Task.Run(() => {             
                var entity = this.Context.TokenReport.Where(x=> x.Email.Equals(email) && x.ReportId.Equals(reportId)).FirstOrDefault();
                return this.Delete(entity, true);
            });        
        }    

        public override async Task<bool> Remove(int reportId)
        {
            return await Task.Run(() => {             
                var entity = this.Context.TokenReport.Where(x=> x.ReportId.Equals(reportId)).ToList();
                return this.DeleteList(entity, true);
            });        
        }    

        public override async Task<bool> Valid(string email, int reportId, DateTime  dateStart, DateTime dateEnd) {
            return await Task.Run(() => {
                var date = DateTime.Now;
                var entity = this.Context.TokenReport.Where(x=> x.Email.Equals(email) && x.ReportId.Equals(reportId)).FirstOrDefault();
                if (entity.DateStart.Date <= date.Date && entity.DateEnd.Date >= date.Date) {
                    return true;
                }
                return false;
            });   
        }
    }
}
