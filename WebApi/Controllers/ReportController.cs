using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using System.Linq;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;

namespace WebApi.Controllers
{
    [Authorize(Policy = "Base")]
    [Route("api/[controller]")]
    public class ReportController : Controller
    {
        private IReportService _report;
        public ReportController(IReportService _report)
        {
            this._report = _report;
        }

        // GET api/values   
        [HttpPost("Add")]
        public async Task<ReportDto> Add([FromBody]ReportDto model)
        {
            var userId = User.Claims.Where(c => c.Type == "UserId").FirstOrDefault().Value;
            model.UserId = int.Parse(userId);
            var result = await this._report.Add(model);
            if(result != null) {
                return new ReportDto() {
                    UserId = result.UserId,
                    Json = result.Json,
                    Name = result.Name,
                    ReportId = result.Id
                };
            }

            return null;
        }

        // GET api/values   
        [HttpPost("GetReports")]
        public async Task<IEnumerable<ReportDto>> GetReports()
        {
            var userId = User.Claims.Where(c => c.Type == "UserId").FirstOrDefault().Value;            
            var result = await this._report.GetReports(int.Parse(userId));
            return result.OrderByDescending(x=>x.DateCreated);
        }

        // GET api/values   
        [HttpPost("Get")]
        public async Task<ReportDto> Get([FromBody] int reportId)
        {
            var userId = User.Claims.Where(c => c.Type == "UserId").FirstOrDefault().Value;            
            var result = await this._report.Get(reportId);
            return result;
        }

        // GET api/values   
        [HttpPost("SendReport")]
        public async Task<bool> SendReport([FromBody] SendReportDto report)
        {
            var userId = User.Claims.Where(c => c.Type == "UserId").FirstOrDefault().Value;  
            var result = await this._report.SendReport(report.ReportId,report.Emails, report.DateStart.AddDays(1), report.DateEnd.AddDays(1));
            return result;
        }

        // GET api/values   
        [HttpPost("Update")]
        public async Task<ReportDto> Update([FromBody]ReportDto model)
        {
            var userId = User.Claims.Where(c => c.Type == "UserId").FirstOrDefault().Value;
            model.UserId = int.Parse(userId);
            var result = await this._report.Update(model);
            if(result != null) {
                return new ReportDto() {
                    UserId = result.UserId,
                    Json = result.Json,
                    Name = result.Name,
                    ReportId = result.Id
                };
            }

            return null;
        }

        // GET api/values   
        [HttpPost("Remove")]
        public async Task<bool> Remove([FromBody] int reportId)
        {
            var userId = User.Claims.Where(c => c.Type == "UserId").FirstOrDefault().Value;            
            var result = await this._report.Remove(reportId, int.Parse(userId));
            return result;
        }
    }
}
