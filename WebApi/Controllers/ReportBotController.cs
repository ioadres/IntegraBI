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
         private IChartService _charts;
        private IReportService _report;
        public ReportBotController(IReportService _report, IChartService chartservice)
        {
            this._report = _report;
            this._charts = chartservice;
        }

        [HttpGet("GetReports")]
        public async Task<IEnumerable<ReportDto>> GetReports(int userId)
        {           
            var result = await this._report.GetReports(userId);
            return result.OrderByDescending(x=>x.DateCreated);
        }     

        [HttpGet("GetCharts")]
        public  async Task<IEnumerable<ChartDto>> GetCharts(int userId)
        {           
            var result = await this._charts.GetCharts(userId);
            return result.OrderByDescending(x=>x.DateCreated);
        }        
    }
}
