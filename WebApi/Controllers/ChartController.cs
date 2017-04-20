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
    public class ChartController : Controller
    {
        private IChartService _charts;
        public ChartController(IChartService charts)
        {
            this._charts = charts;
        }

       
        // GET api/values   
        [HttpPost("GetCharts")]
        public async Task<IEnumerable<ChartDto>> GetCharts()
        {
            var userId = User.Claims.Where(c => c.Type == "UserId").FirstOrDefault().Value;            
            var result = await this._charts.GetCharts(int.Parse(userId));
            return result.OrderByDescending(x=>x.DateCreated);
        }        
    }
}
