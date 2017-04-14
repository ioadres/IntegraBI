using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using System.Linq;
using System.Threading.Tasks;
using Common;

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
    }
}
