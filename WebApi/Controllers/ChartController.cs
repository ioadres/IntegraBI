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

        // GET api/values   
        [HttpPost("Add")]
        public async Task<ChartDto> Add([FromBody]ChartDto model)
        {
			if (model.ChartId != 0 && model.UserId != 0) {
				var result = await this._charts.Update(model);
				if(result != null) {
					return new ChartDto() {
						UserId = result.UserId,
						Name = result.Name,
                        ChartId = result.ChartId		
					};
				}
			} else {
				var result = await this._charts.Add(model);
				if(result != null) {
					return new ChartDto() {
						UserId = result.UserId,
						Name = result.Name	,
                        ChartId = result.ChartId			
					};
				}
			}            

            return null;
        }

        // GET api/values   
        [HttpPost("GetAll")]
        public async Task<IEnumerable<ChartDto>> GetAll()
        {            
            var result = await this._charts.GetAll();
            return result.OrderByDescending(x=>x.DateCreated);
        }

        // GET api/values   
        [HttpPost("Get")]
        public async Task<ChartDto> Get([FromBody] int id)
        {           
            var result = await this._charts.Get(id);
            return result;
        }  

		// GET api/values   
        [HttpPost("Remove")]
        public async Task<bool> Remove([FromBody] int id)
        {           
            return await this._charts.Remove(id);
        }  
    }
}
