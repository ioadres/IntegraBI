using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using System.Linq;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;

namespace WebApi.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class ReportBotController : Controller
    {
        private IReportService _report;
        public ReportBotController(IReportService _report)
        {
            this._report = _report;
        }

        [HttpGet("GetReports")]
        public async Task<IEnumerable<ReportDto>> GetReports(int userId)
        {           
            var result = await this._report.GetReports(userId);
            return result.OrderByDescending(x=>x.DateCreated);
        }        
    }
}
